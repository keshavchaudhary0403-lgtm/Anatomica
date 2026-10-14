// Builds public/models/female.glb from "Bony Pelvis and Pelvic Organs from MRI" by audreybyrd
// (Sketchfab, CC BY 4.0) and appends its structures to public/data/structures.json.
// Usage: node build-female.mjs <path to scene.gltf>
import { NodeIO, PropertyType, getBounds } from '@gltf-transform/core';
import { EXTMeshoptCompression, KHRMeshQuantization } from '@gltf-transform/extensions';
import { dedup, prune, weld, simplify, quantize, meshopt, transformMesh, normals } from '@gltf-transform/functions';
import { MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer';
import fs from 'node:fs';

const src = process.argv[2];
if (!src) throw new Error('usage: build-female.mjs <scene.gltf>');

// Source part node -> our structure. `layer` is the existing layer toggle it follows.
const PARTS = {
  'pelvis_9': { name: 'Hip bone (female pelvis)', tissue: 'bone', layer: 'skeleton', path: ['Female pelvis', 'Bones'] },
  'sacrum_11': { name: 'Sacrum (female)', tissue: 'bone', layer: 'skeleton', path: ['Female pelvis', 'Bones'] },
  'L3_5': { name: 'Vertebra L3 (female)', tissue: 'bone', layer: 'skeleton', path: ['Female pelvis', 'Bones'] },
  'L4_6': { name: 'Vertebra L4 (female)', tissue: 'bone', layer: 'skeleton', path: ['Female pelvis', 'Bones'] },
  'L5_7': { name: 'Vertebra L5 (female)', tissue: 'bone', layer: 'skeleton', path: ['Female pelvis', 'Bones'] },
  'intevertebral-discs_4': { name: 'Lumbar intervertebral discs (female)', tissue: 'cartilage', layer: 'joints', path: ['Female pelvis', 'Joints'] },
  'cartilage-joints_2': { name: 'Pelvic joint cartilage (female)', tissue: 'cartilage', layer: 'joints', path: ['Female pelvis', 'Joints'] },
  'uterus-and-tubes_12': { name: 'Uterus and uterine tubes', tissue: 'uterus', layer: 'organs', path: ['Female genital system', 'Internal genital organs'] },
  'ovaries_8': { name: 'Ovary', tissue: 'ovary', layer: 'organs', path: ['Female genital system', 'Internal genital organs'] },
  'vulva_13': { name: 'Vulva', tissue: 'vulva', layer: 'organs', path: ['Female genital system', 'External genital organs'] },
  'bladder_1': { name: 'Urinary bladder (female)', tissue: 'bladder', layer: 'organs', path: ['Urinary system'] },
  'rectum_10': { name: 'Rectum', tissue: 'large-bowel', layer: 'organs', path: ['Digestive system', 'Large intestine'] },
  // femur_3 is dropped: the male femurs stay in place below the hip joint.
};

// The source is lying on its side: +x points forwards, +y up, z across the body, at about twice our scale.
// Fit its bony pelvis onto the male hip bones (centre and size) in our frame (x across, y up, +z forwards).
const SRC_C = [0.0675, 0.0225, -0.0035]; // centre of pelvis_9 in source units
const DST_C = [0, 0.9045, -0.0155]; // centre of the male hip bones
const S = 0.505;
// x' = -(z - cz)·S, y' = (y - cy)·S + Y, z' = (x - cx)·S + Z (a proper rotation, so faces keep their winding)
const M = [
  0, 0, S, 0,
  0, S, 0, 0,
  -S, 0, 0, 0,
  DST_C[0] + S * SRC_C[2], DST_C[1] - S * SRC_C[1], DST_C[2] - S * SRC_C[0], 1,
]; // column-major

await MeshoptEncoder.ready; await MeshoptSimplifier.ready;
const io = new NodeIO().registerExtensions([EXTMeshoptCompression, KHRMeshQuantization]).registerDependencies({ 'meshopt.encoder': MeshoptEncoder });
const doc = await io.read(src);
const root = doc.getRoot();
const scene = root.listScenes()[0];

// Bake world transforms into each mesh, then rebuild a flat scene of one node per structure.
const mats = new Map();
const matFor = (t) => { if (!mats.has(t)) mats.set(t, doc.createMaterial(t).setBaseColorFactor([0.8, 0.8, 0.8, 1])); return mats.get(t); };
const out = doc.createNode('female');
const entries = [];
for (const node of root.listNodes()) {
  const part = PARTS[node.getName()];
  if (!part) continue;
  const id = `female/${part.name}`;
  const group = doc.createNode(id).setExtras({ id, t: part.tissue });
  node.traverse((c) => {
    const mesh = c.getMesh();
    if (!mesh) return;
    const world = c.getWorldMatrix();
    const copy = mesh.clone();
    // The source is a triangle soup with per-face normals; drop them so vertices can merge.
    for (const p of copy.listPrimitives()) { p.setMaterial(matFor(part.tissue)); p.setAttribute('NORMAL', null); }
    // world first (source -> source world), then our fit
    transformMesh(copy, world);
    transformMesh(copy, M);
    group.addChild(doc.createNode(c.getName()).setMesh(copy));
  });
  out.addChild(group);
  entries.push({ id, name: part.name, side: null, sys: 'female', layer: part.layer, tissue: part.tissue, path: part.path, lm: [] });
}
for (const c of scene.listChildren()) scene.removeChild(c);
scene.addChild(out);
for (const m of root.listMaterials()) if (![...mats.values()].includes(m)) m.dispose();

await doc.transform(
  prune({ keepExtras: true }),
  dedup({ propertyTypes: [PropertyType.ACCESSOR, PropertyType.MESH] }),
  weld(),
  simplify({ simplifier: MeshoptSimplifier, ratio: 0.3, error: 0.0008 }),
  normals({ overwrite: true }),
  prune({ keepExtras: true }),
  quantize({ quantizePosition: 14, quantizeNormal: 8 }),
  meshopt({ encoder: MeshoptEncoder, level: 'high' }),
);
const outPath = new URL('../public/models/female.glb', import.meta.url);
await io.write(outPath.pathname, doc);

const bounds = getBounds(doc.getRoot().listScenes()[0]);
console.log('female.glb', (fs.statSync(outPath).size / 1e6).toFixed(1), 'MB; bounds', bounds.min.map((v) => v.toFixed(3)), bounds.max.map((v) => v.toFixed(3)));

const idxPath = new URL('../public/data/structures.json', import.meta.url);
const index = JSON.parse(fs.readFileSync(idxPath)).filter((s) => s.sys !== 'female');
fs.writeFileSync(idxPath, JSON.stringify([...index, ...entries]));
console.log(entries.length, 'female structures added');
