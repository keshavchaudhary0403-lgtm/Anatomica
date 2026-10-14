import { displayName, FEMALE_SWAP, loadStructures, type Sex, type Structure } from './data';

export const byId = new Map<string, Structure>();
export const ready = loadStructures().then((list) => { list.forEach((s) => byId.set(s.id, s)); return list; });
export const nameOf = (id: string) => { const s = byId.get(id); return s ? displayName(s) : id.split('/')[1]; };

export const byName = new Map<string, Structure[]>();
ready.then((list) => { for (const s of list) { const a = byName.get(s.name) ?? []; a.push(s); byName.set(s.name, a); } });
/** A structure by name; `side` picks right or left when the model has both. */
export function resolve(name: string, side?: 'right' | 'left', sex: Sex = 'male') {
  if (sex === 'female' && FEMALE_SWAP[name]) name = FEMALE_SWAP[name];
  const all = byName.get(name) ?? [];
  return (side && all.find((s) => s.side === side)) || all.find((s) => !s.side) || all[0] || null;
}
/** The layer toggle a structure follows. */
export const layerOf = (id: string) => { const s = byId.get(id); return (s?.layer ?? s?.sys ?? id.split('/')[0]) as import('./data').SystemId; };
