import { CORE } from './core';
import { UPPER_LIMB } from './upper-limb';
import { THORAX } from './thorax';
import { ABDOMEN } from './abdomen';
import { LOWER_LIMB } from './lower-limb';
import { HEAD_NECK } from './head-neck';
import { BACK } from './back';
import { MORE } from './more';
import type { Clinical, Region } from './types';

export type { Clinical, Region };

const BY_REGION: [Region, Record<string, Clinical>][] = [
  ['Upper limb', UPPER_LIMB],
  ['Thorax', THORAX],
  ['Abdomen and pelvis', ABDOMEN],
  ['Lower limb', LOWER_LIMB],
  ['Head and neck', HEAD_NECK],
  ['Back and spine', BACK],
];

const ALL: Record<string, Clinical> = {};
const REGION_OF: Record<string, Region> = {};
for (const [region, map] of BY_REGION) for (const [k, v] of Object.entries(map)) { ALL[k] = v; REGION_OF[k] = region; }
for (const [region, map] of Object.entries(MORE) as [Region, Record<string, Clinical>][]) for (const [k, v] of Object.entries(map)) if (!ALL[k]) { ALL[k] = v; REGION_OF[k] = region; }
// Core notes were written first; region files may extend them, so core only fills gaps.
const CORE_REGION: Record<string, Region> = {
  Humerus: 'Upper limb', Clavicle: 'Upper limb', 'Radial nerve': 'Upper limb', 'Median nerve': 'Upper limb', 'Ulnar nerve': 'Upper limb',
  'Axillary nerve': 'Upper limb', 'Musculocutaneous nerve': 'Upper limb', 'Long thoracic nerve': 'Upper limb', 'Brachial artery': 'Upper limb',
  'Radial artery': 'Upper limb', 'Median cubital vein': 'Upper limb', 'Cephalic vein': 'Upper limb', 'Supraspinatus muscle': 'Upper limb',
  'Internal jugular vein': 'Head and neck', 'Thyroid gland': 'Head and neck', 'Sternocleidomastoid muscle': 'Head and neck', 'Middle meningeal artery': 'Head and neck',
  'Femoral artery': 'Lower limb', 'Femoral nerve': 'Lower limb', 'Common fibular nerve': 'Lower limb', 'Great saphenous vein': 'Lower limb', 'Sciatic nerve': 'Lower limb',
  'Vermiform appendix': 'Abdomen and pelvis', 'Vertebra L4': 'Back and spine', 'Left coronary artery': 'Thorax',
};
for (const [k, v] of Object.entries(CORE)) if (!ALL[k]) { ALL[k] = v; REGION_OF[k] = CORE_REGION[k] ?? 'Thorax'; }

// Names in the model that should share another structure's notes.
const ALIAS: Record<string, string> = {
  'Right common carotid artery': 'Common carotid artery',
  'Left common carotid artery': 'Common carotid artery',
  'Right subclavian vein': 'Subclavian vein',
  'Left subclavian vein': 'Subclavian vein',
  'Interspinous ligaments': 'Supraspinous ligament',
  'Vertebra L3': 'Vertebra L4',
  'Vertebra L5': 'Vertebra L4',
  'Superior lobe of right lung': 'Lungs',
  'Middle lobe of right lung': 'Lungs',
  'Inferior lobe of right lung': 'Lungs',
  'Superior lobe of left lung': 'Lungs',
  'Inferior lobe of left lung': 'Lungs',
  'Body of sternum': 'Manubrium of sternum',
  'Left lobe of thymus': 'Thymus',
  'Right lobe of thymus': 'Thymus',
  'Neurohypophysis': 'Adenohypophysis',
  'Iliocostalis thoracis muscle': 'Iliocostalis lumborum muscle',
  'Longissimus thoracis muscle': 'Iliocostalis lumborum muscle',
  'Anterior sacro-iliac ligament': 'Posterior sacro-iliac ligament',
  'Interosseous sacro-iliac ligament': 'Posterior sacro-iliac ligament',
  'Left renal artery': 'Right renal artery',
  'Short head of biceps femoris': 'Long head of biceps femoris',
  'Inferior vena cava (abdominal part)': 'Inferior vena cava',
  'Inferior vena cava (thoracic part)': 'Inferior vena cava',
};

// "Long head of biceps brachii" -> "Biceps brachii"; "Acromial part of deltoid muscle" -> "Deltoid muscle".
const PART = /^(?:[A-Z][\w-]*(?: [a-z][\w-]*)? )?(?:head|part|belly) of (.+)$/i;
function baseOf(name: string) {
  const m = name.match(PART);
  if (!m) return null;
  return m[1].charAt(0).toUpperCase() + m[1].slice(1);
}

export function keyFor(name: string): string | null {
  if (ALL[name]) return name;
  const f = name.replace(/ \(female( pelvis)?\)$/, '');
  if (f !== name && ALL[f]) return f;
  if (ALIAS[name] && ALL[ALIAS[name]]) return ALIAS[name];
  const b = baseOf(name);
  if (b && ALL[b]) return b;
  return null;
}
export function clinicalFor(name: string) { const k = keyFor(name); return k ? { key: k, note: ALL[k], region: REGION_OF[k] } : null; }
export const hasClinical = (name: string) => keyFor(name) !== null;
export const REGIONS: Region[] = ['Upper limb', 'Thorax', 'Abdomen and pelvis', 'Lower limb', 'Head and neck', 'Back and spine'];
export const clinicalCount = () => Object.keys(ALL).length;
export const keysInRegion = (r: Region) => Object.keys(ALL).filter((k) => REGION_OF[k] === r);
