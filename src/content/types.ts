// High-yield clinical notes, keyed by structure name (both sides share one entry).
// Draft content: each entry should be checked against BD Chaurasia / Gray's before relying on it.
export interface Clinical {
  supply?: { label: string; text: string }[];
  clinical: string[];
  neet: string[];
  imaging?: string;
  procedure?: string;
}

export type Region = 'Upper limb' | 'Thorax' | 'Abdomen and pelvis' | 'Lower limb' | 'Head and neck' | 'Back and spine';
