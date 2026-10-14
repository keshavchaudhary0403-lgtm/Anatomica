import { create } from 'zustand';
import type { Landmark, SystemId } from './data';
import type { Role } from './content/procedures';

export type Axis = 'y' | 'x' | 'z';
export interface SavedView { name: string; cam: number[]; target: number[]; visible: SystemId[]; selected: string | null }

interface State {
  visible: Record<SystemId, boolean>;
  loading: Partial<Record<SystemId, boolean>>;
  selected: string | null;
  hovered: { name: string; x: number; y: number } | null;
  hidden: Set<string>;
  hideLog: string[]; // order of hides, for undo
  isolated: Set<string> | null;
  xray: boolean;
  spin: boolean;
  section: { on: boolean; axis: Axis; pos: number; flip: boolean };
  landmark: Landmark | null;
  focusReq: number; // bump to fly camera to selection
  focusList: string[] | null; // when set, frame these instead of the selection
  focusDir: [number, number, number] | null; // and look from this direction
  proc: { id: string; step: number; roles: Map<string, Role>; faint: Set<string>; context: Set<SystemId>; before: Record<SystemId, boolean> } | null;
  quiz: { highlight: string | null } | null;
  partsV: number; // bumps when a system's meshes finish loading
  resetReq: number;
  searchOpen: boolean;
  views: SavedView[];
  toggleSystem: (id: SystemId) => void;
  soloSystem: (id: SystemId) => void;
  setLoading: (id: SystemId, v: boolean) => void;
  select: (id: string | null, fly?: boolean) => void;
  hide: (id: string) => void;
  isolate: (id: string) => void;
  unisolate: () => void;
  undoHide: () => void;
  showAll: () => void;
  set: (p: Partial<State>) => void;
}

const loadViews = (): SavedView[] => {
  try { return JSON.parse(localStorage.getItem('anatomica.views') || '[]'); } catch { return []; }
};
export const saveViews = (v: SavedView[]) => { try { localStorage.setItem('anatomica.views', JSON.stringify(v)); } catch { /* storage unavailable */ } };

export const useStore = create<State>((set, get) => ({
  visible: { skin: false, skeleton: true, joints: false, muscles: false, vessels: false, nerves: false, organs: true, lymph: false },
  loading: {},
  selected: null,
  hovered: null,
  hidden: new Set(),
  hideLog: [],
  isolated: null,
  xray: false,
  spin: false,
  section: { on: false, axis: 'y', pos: 0.5, flip: false },
  landmark: null,
  focusReq: 0,
  focusList: null,
  focusDir: null,
  proc: null,
  quiz: null,
  partsV: 0,
  resetReq: 0,
  searchOpen: false,
  views: loadViews(),
  toggleSystem: (id) => set((s) => ({ visible: { ...s.visible, [id]: !s.visible[id] } })),
  soloSystem: (id) => set((s) => ({ visible: Object.fromEntries(Object.keys(s.visible).map((k) => [k, k === id])) as State['visible'] })),
  setLoading: (id, v) => set((s) => ({ loading: { ...s.loading, [id]: v } })),
  select: (id, fly = false) => {
    if (id) {
      const sys = id.split('/')[0] as SystemId;
      const hidden = new Set(get().hidden); hidden.delete(id);
      set((s) => ({ selected: id, landmark: null, hidden, visible: { ...s.visible, [sys]: true }, focusList: fly ? null : s.focusList, focusDir: fly ? null : s.focusDir, focusReq: fly ? s.focusReq + 1 : s.focusReq }));
    } else set({ selected: null, landmark: null });
  },
  hide: (id) => set((s) => { const h = new Set(s.hidden); h.add(id); return { hidden: h, hideLog: [...s.hideLog, id], selected: s.selected === id ? null : s.selected, landmark: null }; }),
  isolate: (id) => set((s) => ({ isolated: new Set([id]), selected: id, focusList: null, focusDir: null, focusReq: s.focusReq + 1 })),
  unisolate: () => set({ isolated: null }),
  undoHide: () => set((s) => {
    const log = s.hideLog.slice(); const last = log.pop();
    if (!last) return {};
    const h = new Set(s.hidden); h.delete(last);
    return { hidden: h, hideLog: log };
  }),
  showAll: () => set({ hidden: new Set(), hideLog: [], isolated: null }),
  set: (p) => set(p),
}));
