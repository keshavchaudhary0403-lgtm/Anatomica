export type SystemId = 'skin' | 'skeleton' | 'joints' | 'muscles' | 'vessels' | 'nerves' | 'organs' | 'lymph';

export interface Landmark { n: string; p: [number, number, number] }
export interface Structure {
  id: string;
  name: string;
  dkey: string; // lookup key for descriptions (the model's original name, lower case)
  side: 'left' | 'right' | null;
  sys: SystemId;
  tissue: string;
  path: string[];
  lm: Landmark[];
}

export const SYSTEMS: { id: SystemId; label: string; color: string }[] = [
  { id: 'skin', label: 'Skin', color: '#d9a98c' },
  { id: 'muscles', label: 'Muscles', color: '#c25a52' },
  { id: 'skeleton', label: 'Skeleton', color: '#e9dfca' },
  { id: 'joints', label: 'Ligaments', color: '#a9c7c2' },
  { id: 'vessels', label: 'Vessels', color: '#d8433d' },
  { id: 'nerves', label: 'Nerves & brain', color: '#f0cf55' },
  { id: 'organs', label: 'Organs', color: '#cf8e7c' },
  { id: 'lymph', label: 'Lymphatics', color: '#8fc96f' },
];

export const TISSUE: Record<string, { color: string; rough: number; label: string }> = {
  bone: { color: '#e8decb', rough: 0.72, label: 'Bone' },
  cartilage: { color: '#b9d3dc', rough: 0.45, label: 'Cartilage' },
  ligament: { color: '#b7cdc4', rough: 0.6, label: 'Ligament' },
  tendon: { color: '#e4dcc8', rough: 0.5, label: 'Tendon' },
  fascia: { color: '#d8cfc1', rough: 0.6, label: 'Fascia' },
  fat: { color: '#f0d784', rough: 0.6, label: 'Fat' },
  muscle: { color: '#a63f3a', rough: 0.48, label: 'Muscle' },
  artery: { color: '#d63c37', rough: 0.4, label: 'Artery' },
  vein: { color: '#3d6ccf', rough: 0.4, label: 'Vein' },
  nerve: { color: '#f2cf4e', rough: 0.45, label: 'Nerve' },
  brain: { color: '#e3b3ad', rough: 0.6, label: 'Brain' },
  nucleus: { color: '#c88fb6', rough: 0.6, label: 'Nucleus' },
  csf: { color: '#8fd3e8', rough: 0.3, label: 'CSF space' },
  eye: { color: '#eef2f2', rough: 0.25, label: 'Eye' },
  lung: { color: '#e7a7a1', rough: 0.65, label: 'Lung' },
  gut: { color: '#d59b7f', rough: 0.55, label: 'Gut' },
  organ: { color: '#b86a5c', rough: 0.55, label: 'Organ' },
  gland: { color: '#d9b06a', rough: 0.55, label: 'Gland' },
  lymph: { color: '#8fc96f', rough: 0.5, label: 'Lymphoid' },
  skin: { color: '#d9a98c', rough: 0.7, label: 'Skin' },
  nail: { color: '#f1ddd0', rough: 0.3, label: 'Nail' },
};

// Distinct colours for organs that would otherwise share one tissue colour.
const ORGAN_COLORS: [RegExp, string, string][] = [
  [/^(Liver|Lobe of liver|.*lobe of liver)/i, 'liver', '#8f3d34'],
  [/^Spleen/i, 'spleen', '#7d3240'],
  [/^Kidney|^Renal/i, 'kidney', '#a44c3e'],
  [/^(Heart|.*ventricle|.*atrium|.*auricle)$/i, 'heart', '#b8443d'],
  [/^Stomach/i, 'stomach', '#dd987f'],
  [/^(Duodenum|Jejunum|Ileum|Small intestine)/i, 'small-bowel', '#e6ad93'],
  [/colon|^Caecum|^Cecum|^Rectum|^Vermiform appendix|^Large intestine/i, 'large-bowel', '#c99070'],
  [/^Pancreas/i, 'pancreas', '#e2b879'],
  [/^Gallbladder|bile duct/i, 'gallbladder', '#7a9a52'],
  [/^Urinary bladder|^Ureter|^Urethra/i, 'bladder', '#d9b39a'],
  [/^(Thyroid|Parathyroid)/i, 'thyroid', '#c46a5e'],
  [/^(Greater omentum|Lesser omentum|Peritoneum|Mesentery)/i, 'omentum', '#f0d58a'],
];
export function colorKey(s: Structure) {
  if (s.sys !== 'organs') return s.tissue;
  for (const [re, key, color] of ORGAN_COLORS) {
    if (re.test(s.name)) { TISSUE[key] ??= { color, rough: 0.55, label: TISSUE[s.tissue]?.label ?? 'Organ' }; return key; }
  }
  return s.tissue;
}

let cache: Promise<Structure[]> | null = null;
export function loadStructures() {
  cache ??= fetch('/data/structures.json').then((r) => r.json()).then((list: Structure[]) => {
    for (const s of list) {
      s.dkey = s.name.toLowerCase();
      // The source drops a closing bracket: "Facial nerve (VII" -> "Facial nerve (VII)".
      if ((s.name.match(/\(/g) || []).length > (s.name.match(/\)/g) || []).length) s.name += ')';
    }
    // Z-Anatomy labels mostly the right side; mirror landmarks onto the left partner.
    const byName = new Map<string, Structure>();
    for (const s of list) if (s.side === 'right') byName.set(`${s.sys}/${s.name}`, s);
    for (const s of list) {
      if (s.side !== 'left' || s.lm.length) continue;
      const r = byName.get(`${s.sys}/${s.name}`);
      if (r) s.lm = r.lm.map((l) => ({ n: l.n, p: [-l.p[0], l.p[1], l.p[2]] }));
    }
    return list;
  });
  return cache;
}

let descCache: Promise<Record<string, { t: string; u: string }>> | null = null;
export function loadDescriptions() {
  descCache ??= fetch('/data/descriptions.json').then((r) => (r.ok ? r.json() : {})).catch(() => ({}));
  return descCache;
}

export function displayName(s: Structure) {
  return s.side ? `${s.name} (${s.side})` : s.name;
}
