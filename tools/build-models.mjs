// Converts Z-Anatomy glTF exports (from FBX2glTF) into compact, web-ready models.
// Usage: node build-models.mjs <dir-with-raw-glb> <out-public-dir>
// Outputs: <out>/models/<system>.glb and <out>/data/structures.json
import { NodeIO, PropertyType } from '@gltf-transform/core';
import { EXTMeshoptCompression, KHRMeshQuantization } from '@gltf-transform/extensions';
import { dedup, flatten, prune, weld, simplify, quantize, meshopt } from '@gltf-transform/functions';
import { MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer';
import fs from 'node:fs';
import path from 'node:path';

const [rawDir, outDir] = process.argv.slice(2);
if (!rawDir || !outDir) throw new Error('usage: build-models.mjs <rawDir> <outDir>');

// system id -> raw file, simplify ratio
const SYSTEMS = [
  { id: 'skin', file: 'Regionsofhumanbody100.glb', ratio: 0.6 },
  { id: 'skeleton', file: 'skeletal.glb', ratio: 0.45 },
  { id: 'joints', file: 'Joints100.glb', ratio: 0.5 },
  { id: 'muscles', file: 'MuscularSystem100.glb', ratio: 0.4 },
  { id: 'vessels', file: 'CardioVascular41.glb', ratio: 0.3 },
  { id: 'nerves', file: 'NervousSystem100.glb', ratio: 0.3 },
  { id: 'organs', file: 'VisceralSystem100.glb', ratio: 0.5 },
  { id: 'lymph', file: 'LymphoidOrgans100.glb', ratio: 0.6 },
];

// Nodes that are labels, leader lines or muscle-attachment overlays, not anatomy.
const LABEL = /\.(j|t|s|i)$/;
const ATTACH = /\.(o|e)\d*[lr]?$/;
const GROUP = /\.g$/;

const MUSCLE = /^(External rotation|Abductor|Adductor|Flexion|Levator|Internal rotator|Extension|Superficial|Orbicularis\/Constrictor|Depressor|Ingestion|Biarticular|Masticator|Phonation|Diaphragm|Flexion hand\/foot|Flexion fingers|Extensor extremities|Trapezius|Extension hand\/foot|Origin|End)/;
function tissueOf(mat, sys) {
  const m = (mat || '').replace(/(\.\d+)+$/, '').replace(/-\d+'*$/, '').replace(/'+$/, '');
  if (/^(Bone|Suture)/.test(m)) return 'bone';
  if (m === 'Cartilage') return 'cartilage';
  if (m === 'Ligament' || m === 'Articular capsule') return 'ligament';
  if (m === 'Tendon') return 'tendon';
  if (m === 'Fascia' || m === 'Bursa' || m === 'Peritoneum') return 'fascia';
  if (m === 'Fat') return 'fat';
  if (m === 'Artery' || m === 'Pulmonary vein') return 'artery';
  if (m === 'Vein' || m === 'Pulmonary artery') return 'vein';
  if (m === 'Nerve') return 'nerve';
  if (/lobe$|^Brain|^Insula|^Cerebellum|^Interlobar|^White matter/.test(m)) return 'brain';
  if (/^Nucleus/.test(m)) return 'nucleus';
  if (m === 'LCR') return 'csf';
  if (/^(Eye|Iris|Cornea)$/.test(m)) return 'eye';
  if (/^(Lung|Bronchi)/.test(m)) return 'lung';
  if (m === 'Intestine' || m === 'Ductus' || m === 'Mucosa' || m === 'Gallbladder') return 'gut';
  if (m === 'Organ') return 'organ';
  if (m === 'Gland') return 'gland';
  if (m === 'Lymph') return 'lymph';
  if (/^Skin/.test(m)) return 'skin';
  if (m === 'Nail') return 'nail';
  if (MUSCLE.test(m)) return 'muscle';
  return { skin: 'skin', skeleton: 'bone', joints: 'ligament', muscles: 'muscle', vessels: 'artery',
    nerves: 'nerve', organs: 'organ', lymph: 'lymph' }[sys];
}

const clean = (n) => n.replace(/\.(g|r|l)$/, '').replace(/^\(|\)$/g, '');
const sideOf = (n) => (/\.r$/.test(n) ? 'right' : /\.l$/.test(n) ? 'left' : null);

await MeshoptEncoder.ready;
await MeshoptSimplifier.ready;
const io = new NodeIO().registerExtensions([EXTMeshoptCompression, KHRMeshQuantization])
  .registerDependencies({ 'meshopt.encoder': MeshoptEncoder });

fs.mkdirSync(path.join(outDir, 'models'), { recursive: true });
fs.mkdirSync(path.join(outDir, 'data'), { recursive: true });
const index = [];
const used = new Set();

for (const sys of SYSTEMS) {
  const doc = await io.read(path.join(rawDir, sys.file));
  const root = doc.getRoot();
  const parentOf = new Map();
  for (const n of root.listNodes()) for (const c of n.listChildren()) parentOf.set(c, n);
  const meshAncestor = (n) => { let p = parentOf.get(n); while (p && !(p.getMesh() && !LABEL.test(p.getName()))) p = parentOf.get(p); return p; };
  const groupPath = (n) => { const out = []; let p = parentOf.get(n); while (p) { if (GROUP.test(p.getName())) out.unshift(clean(p.getName())); p = parentOf.get(p); } return out; };

  // 1. Collect landmarks (.t / .s anchors) for each structure.
  const landmarks = new Map();
  for (const n of root.listNodes()) {
    if (!/\.(t|s)$/.test(n.getName())) continue;
    const owner = meshAncestor(n);
    if (!owner) continue;
    const p = n.getWorldTranslation();
    const name = n.getName().replace(/\.(t|s)$/, '').replace(/^\(|\)$/g, '');
    if (!landmarks.has(owner)) landmarks.set(owner, []);
    landmarks.get(owner).push({ n: name, p: p.map((v) => +v.toFixed(4)) });
  }

  // 2. Tag every anatomical mesh with id, tissue and group path.
  const tissueMats = new Map();
  const matFor = (t) => {
    if (!tissueMats.has(t)) tissueMats.set(t, doc.createMaterial(t).setBaseColorFactor([0.8, 0.8, 0.8, 1]));
    return tissueMats.get(t);
  };
  const keep = [];
  for (const n of root.listNodes()) {
    const nm = n.getName();
    if (!n.getMesh() || LABEL.test(nm) || ATTACH.test(nm)) continue;
    // Each primitive keeps its own tissue (e.g. bone + articular cartilage);
    // the structure's tissue is the one covering the most vertices.
    const weight = {};
    for (const p of n.getMesh().listPrimitives()) {
      const t = tissueOf(p.getMaterial()?.getName(), sys.id);
      p.setMaterial(matFor(t));
      weight[t] = (weight[t] || 0) + p.getAttribute('POSITION').getCount();
    }
    const tissue = Object.entries(weight).sort((a, b) => b[1] - a[1])[0][0];
    let id = `${sys.id}/${nm}`;
    let k = 2; while (used.has(id)) id = `${sys.id}/${nm}~${k++}`;
    used.add(id);
    const lm = (landmarks.get(n) || []).sort((a, b) => a.n.localeCompare(b.n));
    n.setExtras({ id, t: tissue });
    keep.push(n);
    index.push({ id, name: clean(nm), side: sideOf(nm), sys: sys.id, tissue, path: groupPath(n), lm });
  }

  // 3. Remove everything that isn't kept anatomy.
  const keepSet = new Set(keep);
  for (const n of root.listNodes()) {
    const nm = n.getName();
    if (n.getMesh() && !keepSet.has(n)) n.setMesh(null);
    if (LABEL.test(nm) || ATTACH.test(nm)) { if (!n.listChildren().some((c) => keepSet.has(c))) n.dispose(); }
  }
  for (const m of root.listMaterials()) if (![...tissueMats.values()].includes(m)) m.dispose();
  for (const n of keep) n.setName(n.getExtras().id);

  await doc.transform(
    flatten(),
    prune({ keepExtras: true }),
    // Keep materials out of dedup: every tissue material is identical until the app colours it.
    dedup({ propertyTypes: [PropertyType.ACCESSOR, PropertyType.MESH, PropertyType.TEXTURE] }),
    weld(),
    simplify({ simplifier: MeshoptSimplifier, ratio: sys.ratio, error: 0.0008, lockBorder: false }),
    prune({ keepExtras: true }),
    quantize({ quantizePosition: 14, quantizeNormal: 8 }),
    meshopt({ encoder: MeshoptEncoder, level: 'high' }),
  );
  const out = path.join(outDir, 'models', `${sys.id}.glb`);
  await io.write(out, doc);
  console.log(sys.id, keep.length, 'structures', (fs.statSync(out).size / 1e6).toFixed(1), 'MB');
}

fs.writeFileSync(path.join(outDir, 'data', 'structures.json'), JSON.stringify(index));
console.log('index', index.length, 'structures');
