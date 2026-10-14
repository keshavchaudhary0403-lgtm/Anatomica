import { create } from 'zustand';

export interface Pin { id: string; sid: string; p: [number, number, number]; label: string; at: number }
export interface Case { id: string; at: number; title: string; text: string; sids: string[] }
interface Book {
  notes: Record<string, { text: string; at: number }>; // keyed by structure name, shared by both sides
  cases: Case[];
  pins: Pin[];
}
interface NotebookState extends Book {
  showPins: boolean;
  pinMode: boolean;
  setNote: (key: string, text: string) => void;
  addCase: (c: Omit<Case, 'id' | 'at'>) => void;
  updateCase: (id: string, patch: Partial<Case>) => void;
  removeCase: (id: string) => void;
  addPin: (sid: string, p: [number, number, number], label: string) => void;
  updatePin: (id: string, label: string) => void;
  removePin: (id: string) => void;
  set: (p: Partial<NotebookState>) => void;
  importBook: (b: Partial<Book>) => void;
}

const KEY = 'anatomica.notebook';
const load = (): Book => {
  try { const b = JSON.parse(localStorage.getItem(KEY) || '{}'); return { notes: b.notes ?? {}, cases: b.cases ?? [], pins: b.pins ?? [] }; }
  catch { return { notes: {}, cases: [], pins: [] }; }
};
const uid = () => Math.random().toString(36).slice(2, 10);

export const useNotebook = create<NotebookState>((set) => ({
  ...load(),
  showPins: true,
  pinMode: false,
  setNote: (key, text) => set((s) => {
    const notes = { ...s.notes };
    if (text.trim()) notes[key] = { text, at: Date.now() }; else delete notes[key];
    return { notes };
  }),
  addCase: (c) => set((s) => ({ cases: [{ ...c, id: uid(), at: Date.now() }, ...s.cases] })),
  updateCase: (id, patch) => set((s) => ({ cases: s.cases.map((c) => (c.id === id ? { ...c, ...patch } : c)) })),
  removeCase: (id) => set((s) => ({ cases: s.cases.filter((c) => c.id !== id) })),
  addPin: (sid, p, label) => set((s) => ({ pins: [...s.pins, { id: uid(), sid, p, label, at: Date.now() }], pinMode: false, showPins: true })),
  updatePin: (id, label) => set((s) => ({ pins: s.pins.map((x) => (x.id === id ? { ...x, label } : x)) })),
  removePin: (id) => set((s) => ({ pins: s.pins.filter((x) => x.id !== id) })),
  set: (p) => set(p),
  importBook: (b) => set((s) => ({
    notes: { ...s.notes, ...(b.notes ?? {}) },
    cases: [...(b.cases ?? []).filter((c) => !s.cases.some((x) => x.id === c.id)), ...s.cases].sort((a, b2) => b2.at - a.at),
    pins: [...s.pins, ...(b.pins ?? []).filter((p) => !s.pins.some((x) => x.id === p.id))],
  })),
}));

// Persist on every change.
useNotebook.subscribe((s) => {
  try { localStorage.setItem(KEY, JSON.stringify({ notes: s.notes, cases: s.cases, pins: s.pins })); } catch { /* storage unavailable */ }
});

export function exportBook() {
  const { notes, cases, pins } = useNotebook.getState();
  const blob = new Blob([JSON.stringify({ app: 'anatomica', version: 1, notes, cases, pins }, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `anatomica-notes-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export async function importFile(file: File) {
  const b = JSON.parse(await file.text());
  if (b.app !== 'anatomica') throw new Error('This is not an Anatomica notes file.');
  useNotebook.getState().importBook(b);
}

export const noteCount = (s: Book) => Object.keys(s.notes).length + s.cases.length + s.pins.length;
