import { PATHWAYS, type Pathway } from './content/pathways';
import type { Role } from './content/procedures';
import type { SystemId } from './data';
import { byId, layerOf } from './index-cache';
import { DIRS, idOf } from './procedure';
import { useStore } from './store';

function rolesFor(p: Pathway, level: number) {
  const roles = new Map<string, Role>();
  const add = (refs: { n: string; s?: 'right' | 'left' }[], role: Role) => { for (const r of refs) { const id = idOf(r); if (id && !roles.has(id)) roles.set(id, role); } };
  const lv = p.levels[level];
  add(lv.affected, 'risk');
  add(lv.collaterals ?? [], 'landmark');
  add(p.course, 'target');
  return roles;
}

function pinFor(p: Pathway, level: number) {
  const lv = p.levels[level];
  const sid = idOf(lv.pin.on);
  const lm = sid ? byId.get(sid)?.lm.find((l) => l.n === lv.pin.lm) : null;
  return { sid, lm: lm ?? null };
}

function apply(p: Pathway, level: number, fresh: boolean) {
  const st = useStore.getState();
  const roles = rolesFor(p, level);
  const systems = new Set<SystemId>(['skeleton']);
  for (const id of roles.keys()) systems.add(layerOf(id));
  const before = st.proc?.before ?? st.visible;
  const visible = Object.fromEntries(Object.keys(st.visible).map((k) => [k, systems.has(k as SystemId)])) as typeof st.visible;
  const { sid, lm } = pinFor(p, level);
  st.set({
    proc: { kind: 'pathway', id: p.id, step: level, roles, faint: new Set(), context: new Set(['skeleton']), before },
    visible, selected: null, landmark: lm,
    ...(fresh ? { isolated: null, hidden: new Set(), hideLog: [], xray: false, section: { ...st.section, on: false }, quiz: null, spin: false } : {}),
  });
  // Frame the lesion point with the structures it affects.
  const affected = [...roles].filter(([, r]) => r === 'risk').map(([k]) => k);
  const frame = [...(sid ? [sid] : []), ...affected.slice(0, 12)];
  st.set({ focusList: frame.length ? frame : [...roles.keys()], focusDir: DIRS[p.view], focusReq: useStore.getState().focusReq + 1 });
}

export function startPathway(id: string) { const p = PATHWAYS.find((x) => x.id === id); if (p) apply(p, 0, true); }
export function setLevel(i: number) {
  const st = useStore.getState();
  if (st.proc?.kind !== 'pathway') return;
  const p = PATHWAYS.find((x) => x.id === st.proc!.id)!;
  apply(p, Math.max(0, Math.min(p.levels.length - 1, i)), false);
}
export { PATHWAYS };
