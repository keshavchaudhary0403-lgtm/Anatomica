import { displayName, loadStructures, type Structure } from './data';

export const byId = new Map<string, Structure>();
export const ready = loadStructures().then((list) => { list.forEach((s) => byId.set(s.id, s)); return list; });
export const nameOf = (id: string) => { const s = byId.get(id); return s ? displayName(s) : id.split('/')[1]; };
