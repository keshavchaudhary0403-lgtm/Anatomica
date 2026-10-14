import { PROCEDURES, type Procedure, type Ref, type Role } from './content/procedures';
import type { SystemId } from './data';
import { resolve } from './index-cache';
import { useStore } from './store';

// Patient faces +z; the patient's right side is -x.
const DIRS: Record<Procedure['view'], [number, number, number]> = {
  front: [0, 0.18, 1],
  back: [0, 0.18, -1],
  right: [-1, 0.18, 0.15],
  left: [1, 0.18, 0.15],
  'front-right': [-0.7, 0.2, 0.75],
  'back-right': [-0.7, 0.2, -0.7],
};

export const idOf = (r: Ref) => resolve(r.n, r.s)?.id ?? null;

function frame(ids: string[], view: Procedure['view']) {
  const st = useStore.getState();
  st.set({ focusList: ids, focusDir: DIRS[view], focusReq: st.focusReq + 1 });
}

export function startProcedure(id: string) {
  const p = PROCEDURES.find((x) => x.id === id);
  if (!p) return;
  const st = useStore.getState();
  const roles = new Map<string, Role>();
  const faint = new Set<string>();
  const systems = new Set<SystemId>(p.context);
  for (const { ref, role, faint: f } of p.roles) {
    const sid = idOf(ref);
    if (!sid) continue;
    roles.set(sid, role);
    if (f) faint.add(sid);
    systems.add(sid.split('/')[0] as SystemId);
  }
  const before = st.proc?.before ?? st.visible;
  const visible = Object.fromEntries(Object.keys(st.visible).map((k) => [k, systems.has(k as SystemId)])) as typeof st.visible;
  st.set({
    proc: { id, step: 0, roles, faint, context: new Set(p.context), before },
    visible, selected: null, isolated: null, hidden: new Set(), hideLog: [], xray: false,
    section: { ...st.section, on: false }, quiz: null, spin: false,
  });
  frame(framing(roles, faint), p.view);
}

// Frame the targets; landmarks, risks and faint sheets give context around them.
function framing(roles: Map<string, Role>, faint: Set<string>) {
  const pick = (want: Role[]) => [...roles].filter(([k, r]) => want.includes(r) && !faint.has(k)).map(([k]) => k);
  const t = pick(['target']);
  if (t.length) return t;
  const tr = pick(['target', 'risk']);
  return tr.length ? tr : [...roles.keys()];
}

export function goToStep(i: number) {
  const st = useStore.getState();
  if (!st.proc) return;
  const p = PROCEDURES.find((x) => x.id === st.proc!.id)!;
  const step = Math.max(0, Math.min(p.steps.length - 1, i));
  st.set({ proc: { ...st.proc, step }, selected: null });
  const f = p.steps[step].focus;
  const fid = f ? idOf(f) : null;
  frame(fid ? [fid] : framing(st.proc.roles, st.proc.faint), p.view);
}

export function endProcedure() {
  const st = useStore.getState();
  if (!st.proc) return;
  st.set({ visible: st.proc.before, proc: null, focusList: null, focusDir: null });
  st.set({ resetReq: st.resetReq + 1 });
}

export { PROCEDURES };
