import type { Clinical } from './types';

export const BACK: Record<string, Clinical> = {
  'Vertebra L4': {
    clinical: [
      'The line joining the iliac crests (Tuffier line) crosses the L4 spine or the L4–L5 space.',
      'L4–L5 and L5–S1 are the commonest levels for disc prolapse; L5–S1 prolapse compresses the S1 root (ankle jerk lost).',
    ],
    neet: ['In adults the spinal cord ends at L1–L2; lumbar puncture is done at L3–L4 or L4–L5.'],
    procedure: 'Lumbar puncture',
  },
  'Supraspinous ligament': {
    clinical: [
      'First ligament the lumbar puncture needle passes, followed by the interspinous ligament and then the ligamentum flavum ("pop").',
      'Midline approach goes through it; the paramedian approach avoids it in elderly patients with a calcified ligament.',
    ],
    neet: ['Layers in LP: skin, subcutaneous tissue, supraspinous, interspinous, ligamentum flavum, epidural space, dura, arachnoid.'],
    procedure: 'Lumbar puncture',
  },
  'Spinal dura': {
    clinical: [
      'Post-dural-puncture headache is worse on sitting up; smaller, pencil-point needles reduce it.',
      'Epidural anaesthesia is placed outside the dura; spinal anaesthesia goes through it into CSF.',
    ],
    neet: ['Dural sac ends at S2; the subarachnoid space ends there too.'],
  },
  'Cauda equina': {
    clinical: [
      'Cauda equina syndrome: saddle anaesthesia, bladder or bowel dysfunction, bilateral sciatica: a surgical emergency.',
      'LP needles at L3–L4 push the floating nerve roots aside rather than injure them.',
    ],
    neet: ['Lower motor neuron signs (flaccid, areflexic) unlike conus medullaris lesions.'],
  },
  Sacrum: {
    clinical: ['Caudal epidural block is given through the sacral hiatus, especially in children.'],
    neet: ['Sacral hiatus is located by the sacral cornua, at about the level of S4–S5.'],
  },
};
