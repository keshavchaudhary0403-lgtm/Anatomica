import { useEffect, useMemo, useState } from 'react';
import { clinicalFor, REGIONS, type Region } from './content';
import { resolve } from './index-cache';
import * as Icon from './icons';
import { choicesFor, grade, itemsReady, progress, resetProgress, session, type Item, type Mode } from './quiz';
import { useStore } from './store';
import type { SystemId } from './data';

const MODES: [Mode, string][] = [['mixed', 'Mixed'], ['identify', 'Identify on model'], ['mcq', 'MCQs']];

function show(structureId: string | null) {
  const st = useStore.getState();
  if (!structureId) { st.set({ quiz: { highlight: null } }); return; }
  const sys = structureId.split('/')[0] as SystemId;
  st.set({
    quiz: { highlight: structureId }, selected: null, isolated: null,
    visible: { ...st.visible, [sys]: true },
    focusList: [structureId], focusDir: null, focusReq: st.focusReq + 1,
  });
}

export function QuizPanel() {
  const quiz = useStore((s) => s.quiz);
  const [ready, setReady] = useState(false);
  const [region, setRegion] = useState<Region | 'All'>('All');
  const [mode, setMode] = useState<Mode>('mixed');
  const [items, setItems] = useState<Item[] | null>(null);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [tall, setTall] = useState(false);
  useEffect(() => { itemsReady.then(() => setReady(true)); }, []);

  const item = items?.[i];
  const choices = useMemo(() => (item?.kind === 'identify' ? choicesFor(item) : item?.q.options ?? []), [item]);
  const answer = item ? (item.kind === 'identify' ? choices.indexOf(item.key) : item.q.answer) : -1;

  useEffect(() => {
    if (!item) return;
    if (item.kind === 'identify') show(item.structure);
    else show(null);
  }, [item]);

  if (!quiz) return null;
  const close = () => { useStore.getState().set({ quiz: null, focusList: null }); };
  const start = () => { setItems(session(region, mode)); setI(0); setPicked(null); setScore(0); };
  const choose = (k: number) => {
    if (picked !== null || !item) return;
    setPicked(k);
    const ok = k === answer;
    if (ok) setScore((v) => v + 1);
    grade(item.id, ok);
    if (item.kind === 'mcq') { const r = resolve(item.q.ref, 'right'); if (r) show(r.id); }
  };
  const next = () => { setPicked(null); setI((v) => v + 1); };

  const finished = items && i >= items.length;

  return (
    <aside className={`card quiz-panel${tall ? ' tall' : ''}`} aria-label="Revision">
      <button className="grip" onClick={() => setTall(!tall)} aria-label={tall ? 'Shrink panel' : 'Expand panel'} />
      <header className="card-head">
        <div>
          <p className="card-kicker">Revision</p>
          <h2 className="card-title">{!items ? 'Practise' : finished ? `${score} of ${items.length} correct` : `Question ${i + 1} of ${items.length}`}</h2>
        </div>
        <button className="icon-btn" onClick={close} aria-label="Close revision"><Icon.Close /></button>
      </header>

      <div className="card-body">
        {(!items || finished) && (
          <>
            <h3>Region</h3>
            <div className="chips">
              {(['All', ...REGIONS] as const).map((r) => (
                <button key={r} className={region === r ? 'on' : ''} onClick={() => setRegion(r)}>{r}</button>
              ))}
            </div>
            <h3>Type</h3>
            <div className="chips">
              {MODES.map(([m, l]) => <button key={m} className={mode === m ? 'on' : ''} onClick={() => setMode(m)}>{l}</button>)}
            </div>
            <button className="start" disabled={!ready} onClick={start}>{finished ? 'Another 10 questions' : 'Start 10 questions'}</button>
            <h3>Progress</h3>
            <ul className="progress">
              {ready && progress().map((p) => (
                <li key={p.region}>
                  <span>{p.region}</span>
                  <span className="bar-track"><span style={{ width: `${(p.done / p.total) * 100}%` }} /></span>
                  <span className="muted small">{p.done}/{p.total}{p.due ? `, ${p.due} due` : ''}</span>
                </li>
              ))}
            </ul>
            <p className="fine">A question counts as learnt after three correct answers spaced over days. Wrong answers come back sooner. <button className="link" onClick={() => { if (confirm('Clear all revision progress on this device?')) { resetProgress(); setItems(null); } }}>Reset progress</button></p>
          </>
        )}

        {item && !finished && (
          <>
            <p className="q">{item.kind === 'identify' ? 'Which structure is highlighted on the model?' : item.q.q}</p>
            <ul className="options">
              {choices.map((c, k) => {
                const state = picked === null ? '' : k === answer ? 'right' : k === picked ? 'wrong' : 'dim';
                return <li key={c}><button className={state} onClick={() => choose(k)} disabled={picked !== null}>{c}</button></li>;
              })}
            </ul>
            {picked !== null && (
              <div className="explain">
                <p>{item.kind === 'mcq' ? item.q.explain : clinicalFor(item.key)?.note.neet[0]}</p>
                <button className="start" onClick={next}>{i + 1 < items.length ? 'Next question' : 'See result'}</button>
              </div>
            )}
          </>
        )}
      </div>
    </aside>
  );
}
