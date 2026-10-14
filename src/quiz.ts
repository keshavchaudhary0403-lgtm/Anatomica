import { clinicalFor, keyFor, REGIONS, type Region } from './content';
import { MCQS, type Mcq } from './content/questions';
import { showsIn, type Sex, type Structure } from './data';
import { ready } from './index-cache';

// ---------- spaced repetition (Leitner boxes) ----------
const KEY = 'anatomica.srs';
const DAYS = [0, 1, 3, 7, 16, 35];
const DAY = 864e5;
type Card = { box: number; due: number };
let srs: Record<string, Card> = {};
try { srs = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { srs = {}; }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(srs)); } catch { /* storage unavailable */ } };

export function grade(id: string, correct: boolean) {
  const c = srs[id] ?? { box: 0, due: 0 };
  const box = correct ? Math.min(c.box + 1, DAYS.length - 1) : 0;
  srs[id] = { box, due: Date.now() + DAYS[box] * DAY };
  save();
}
export const mastered = (id: string) => (srs[id]?.box ?? 0) >= 3;
export function resetProgress() { srs = {}; save(); }

// ---------- items ----------
export interface IdentifyItem { kind: 'identify'; id: string; region: Region; key: string; structure: string; sys: string; s: Structure }
export interface McqItem { kind: 'mcq'; id: string; region: Region; q: Mcq }
export type Item = IdentifyItem | McqItem;

let identify: IdentifyItem[] = [];
export const itemsReady = ready.then((list: Structure[]) => {
  const seen = new Map<string, Structure>();
  for (const s of list) {
    if (s.side === 'left') continue;
    const k = keyFor(s.name);
    if (k && !seen.has(`${k}|${s.sys === 'female' ? 'f' : 'm'}`)) seen.set(`${k}|${s.sys === 'female' ? 'f' : 'm'}`, s);
  }
  identify = [...seen.entries()].map(([kk, s]) => {
    const key = kk.split('|')[0];
    return { kind: 'identify', id: `id:${key}`, region: clinicalFor(key)!.region, key, structure: s.id, sys: s.layer ?? s.sys, s };
  });
});

const mcqs: McqItem[] = MCQS.map((q) => ({ kind: 'mcq', id: `mcq:${q.id}`, region: q.region, q }));

export type Mode = 'mixed' | 'identify' | 'mcq';
const shuffle = <T,>(a: T[]) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

let currentSex: Sex = 'male';
export const setQuizSex = (s: Sex) => { currentSex = s; };
const idsForSex = () => {
  // One identify item per key, using the structure visible in the current body.
  const byKey = new Map<string, IdentifyItem>();
  for (const i of identify) if (showsIn(i.s, currentSex) && (!byKey.has(i.key) || i.s.sys === 'female')) byKey.set(i.key, i);
  return [...byKey.values()];
};
export function pool(region: Region | 'All', mode: Mode): Item[] {
  const all: Item[] = [...(mode !== 'mcq' ? idsForSex() : []), ...(mode !== 'identify' ? mcqs : [])];
  return region === 'All' ? all : all.filter((i) => i.region === region);
}

/** Due cards first, then new ones, then the rest: a 10-question session. */
export function session(region: Region | 'All', mode: Mode, size = 10): Item[] {
  const now = Date.now();
  const items = pool(region, mode);
  const due = shuffle(items.filter((i) => srs[i.id] && srs[i.id].due <= now));
  const fresh = shuffle(items.filter((i) => !srs[i.id]));
  const later = shuffle(items.filter((i) => srs[i.id] && srs[i.id].due > now)).sort((a, b) => srs[a.id].due - srs[b.id].due);
  return [...due, ...fresh, ...later].slice(0, size);
}

/** Four answer choices for an identify question; distractors from the same layer when possible. */
export function choicesFor(item: IdentifyItem): string[] {
  const ids = idsForSex();
  const same = ids.filter((i) => i.key !== item.key && i.sys === item.sys && i.region === item.region);
  const near = ids.filter((i) => i.key !== item.key && i.region === item.region);
  const rest = ids.filter((i) => i.key !== item.key);
  const picks: string[] = [];
  for (const src of [shuffle(same), shuffle(near), shuffle(rest)]) for (const i of src) { if (picks.length < 3 && !picks.includes(i.key)) picks.push(i.key); }
  return shuffle([item.key, ...picks]);
}

export function progress() {
  return REGIONS.map((r) => {
    const items = pool(r, 'mixed');
    return { region: r, total: items.length, done: items.filter((i) => mastered(i.id)).length, due: items.filter((i) => srs[i.id] && srs[i.id].due <= Date.now()).length };
  }).filter((p) => p.total > 0);
}
