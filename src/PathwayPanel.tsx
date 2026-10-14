import { useState } from 'react';
import * as Icon from './icons';
import { nameOf } from './index-cache';
import { PATHWAYS, setLevel, startPathway } from './pathway';
import { endProcedure, idOf } from './procedure';
import { useStore } from './store';
import { ROLE_COLOR } from './Viewer';

export function PathwayPicker({ onClose }: { onClose: () => void }) {
  const groups = [['nerve', 'Nerves'], ['artery', 'Arteries']] as const;
  return (
    <div className="scrim" onPointerDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="palette proc-pick" role="dialog" aria-label="Pathways">
        <div className="pick-head">
          <h2>Pathways</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><Icon.Close /></button>
        </div>
        <ul className="results">
          {groups.map(([kind, label]) => (
            <li key={kind} className="group">
              <p className="palette-hint">{label}</p>
              <ul>
                {PATHWAYS.filter((p) => p.kind === kind).map((p) => (
                  <li key={p.id}>
                    <button onClick={() => { onClose(); startPathway(p.id); }}>
                      <span className="r-name"><strong>{p.title}</strong><small>{p.summary}</small></span>
                      <span className="r-sys">{p.levels.length} {p.levels.length === 1 ? 'level' : 'levels'}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const clean = (id: string) => nameOf(id).replace(/ \((right|left)\)$/, '');

export function PathwayPanel() {
  const proc = useStore((s) => s.proc);
  const [tall, setTall] = useState(false);
  if (!proc || proc.kind !== 'pathway') return null;
  const p = PATHWAYS.find((x) => x.id === proc.id)!;
  const lv = p.levels[proc.step];
  const ids = (refs: { n: string; s?: 'right' | 'left' }[]) => refs.map(idOf).filter((x): x is string => !!x);
  const affected = ids(lv.affected);
  const collaterals = ids(lv.collaterals ?? []);
  const pick = (id: string) => useStore.getState().select(id, true);

  return (
    <aside className={`card proc-panel${tall ? ' tall' : ''}`} aria-label={p.title}>
      <button className="grip" onClick={() => setTall(!tall)} aria-label={tall ? 'Shrink panel' : 'Expand panel'} />
      <header className="card-head">
        <div>
          <p className="card-kicker">{p.kind === 'nerve' ? 'Nerve pathway' : 'Arterial pathway'}{p.roots ? `, ${p.roots}` : ''}</p>
          <h2 className="card-title">{p.title}</h2>
          <p className="card-path">{p.summary}</p>
        </div>
        <button className="icon-btn" onClick={endProcedure} aria-label="Exit pathway"><Icon.Close /></button>
      </header>

      <div className="levels" role="tablist" aria-label="Level of lesion">
        {p.levels.map((l, i) => (
          <button key={l.title} role="tab" aria-selected={i === proc.step} className={i === proc.step ? 'on' : ''} onClick={() => setLevel(i)}>
            <span className="lv-dot" />{l.title}
          </button>
        ))}
      </div>

      <div className="card-body">
        <h3>{p.kind === 'nerve' ? `Lesion at the ${lv.title.toLowerCase()}` : `Blocked at the ${lv.title.toLowerCase()}`}</h3>
        <ul>{lv.signs.map((x) => <li key={x}>{x}</li>)}</ul>
        <h3>Causes</h3>
        <ul>{lv.causes.map((x) => <li key={x}>{x}</li>)}</ul>

        <div className="legend inline">
          <div className="legend-row">
            <span className="legend-key"><span className="dot" style={{ background: ROLE_COLOR.target }} />{p.kind === 'nerve' ? 'Nerve' : 'Artery'}</span>
            <span className="legend-items">{ids(p.course).map((id) => <button key={id} onClick={() => pick(id)}>{clean(id)}</button>)}</span>
          </div>
          {affected.length > 0 && (
            <div className="legend-row">
              <span className="legend-key"><span className="dot" style={{ background: ROLE_COLOR.risk }} />{p.kind === 'nerve' ? 'Paralysed' : 'At risk'}</span>
              <span className="legend-items">{affected.map((id) => <button key={id} onClick={() => pick(id)}>{clean(id)}</button>)}</span>
            </div>
          )}
          {collaterals.length > 0 && (
            <div className="legend-row">
              <span className="legend-key"><span className="dot" style={{ background: ROLE_COLOR.landmark }} />Collaterals</span>
              <span className="legend-items">{collaterals.map((id) => <button key={id} onClick={() => pick(id)}>{clean(id)}</button>)}</span>
            </div>
          )}
          {affected.length === 0 && p.kind === 'nerve' && <p className="muted small">No muscles paralysed at this level.</p>}
        </div>
        <p className="fine">The amber pin marks the level. Draft notes; check against your textbook.</p>
      </div>

      <footer className="step-nav">
        <button disabled={proc.step === 0} onClick={() => setLevel(proc.step - 1)}>Higher</button>
        <span>Level {proc.step + 1} of {p.levels.length}</span>
        <button className="primary" disabled={proc.step === p.levels.length - 1} onClick={() => setLevel(proc.step + 1)}>Lower</button>
      </footer>
    </aside>
  );
}
