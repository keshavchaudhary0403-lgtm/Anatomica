import Fuse from 'fuse.js';
import { useEffect, useMemo, useRef, useState } from 'react';
import { hasClinical } from './content';
import { showsIn, SYSTEMS, TISSUE, type Structure } from './data';
import { useStore } from './store';

export function Search({ list: all }: { list: Structure[] }) {
  const open = useStore((s) => s.searchOpen);
  const sex = useStore((s) => s.sex);
  const list = useMemo(() => all.filter((s) => showsIn(s, sex)), [all, sex]);
  const [q, setQ] = useState('');
  const [i, setI] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const fuse = useMemo(() => new Fuse(list, { keys: [{ name: 'name', weight: 3 }, { name: 'path', weight: 1 }], threshold: 0.32, ignoreLocation: true }), [list]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !(e.target instanceof HTMLInputElement))) {
        e.preventDefault(); useStore.getState().set({ searchOpen: true });
      }
      if (e.key === 'Escape') useStore.getState().set({ searchOpen: false });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  useEffect(() => { if (open) { setQ(''); setI(0); setTimeout(() => input.current?.focus(), 30); } }, [open]);

  const results = useMemo(() => {
    if (!q.trim()) return list.filter((s) => hasClinical(s.name) && s.side !== 'left').slice(0, 60);
    return fuse.search(q, { limit: 40 }).map((r) => r.item);
  }, [q, fuse, list]);

  if (!open) return null;
  const choose = (s: Structure) => { useStore.getState().set({ searchOpen: false }); useStore.getState().select(s.id, true); };

  return (
    <div className="scrim" onPointerDown={(e) => { if (e.target === e.currentTarget) useStore.getState().set({ searchOpen: false }); }}>
      <div className="palette" role="dialog" aria-label="Search structures">
        <input
          ref={input}
          value={q}
          placeholder={`Search ${list.length.toLocaleString('en-IN')} structures`}
          onChange={(e) => { setQ(e.target.value); setI(0); }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') { e.preventDefault(); setI((v) => Math.min(v + 1, results.length - 1)); }
            if (e.key === 'ArrowUp') { e.preventDefault(); setI((v) => Math.max(v - 1, 0)); }
            if (e.key === 'Enter' && results[i]) choose(results[i]);
          }}
        />
        <p className="palette-hint">{q.trim() ? `${results.length} matches` : 'Structures with clinical notes'}</p>
        <ul className="results">
          {results.map((s, k) => (
            <li key={s.id}>
              <button className={k === i ? 'on' : ''} onMouseEnter={() => setI(k)} onClick={() => choose(s)}>
                <span className="dot" style={{ background: TISSUE[s.tissue]?.color }} />
                <span className="r-name">{s.name}{s.side ? <em> {s.side}</em> : null}</span>
                {hasClinical(s.name) && <span className="tag">Notes</span>}
                <span className="r-sys">{SYSTEMS.find((x) => x.id === (s.layer ?? s.sys))?.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
