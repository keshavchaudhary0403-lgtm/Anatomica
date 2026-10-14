import { useState } from 'react';
import type { Role } from './content/procedures';
import * as Icon from './icons';
import { nameOf } from './index-cache';
import { endProcedure, goToStep, idOf, PROCEDURES, startProcedure } from './procedure';
import { useStore } from './store';
import { ROLE_COLOR } from './Viewer';

const ROLE_LABEL: Record<Role, string> = { target: 'Target', landmark: 'Landmarks', risk: 'At risk' };

/** List of procedures, opened from the dock. */
export function ProcedurePicker({ onClose }: { onClose: () => void }) {
  return (
    <div className="scrim" onPointerDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="palette proc-pick" role="dialog" aria-label="Procedures">
        <div className="pick-head">
          <h2>Procedures</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><Icon.Close /></button>
        </div>
        <ul className="results">
          {PROCEDURES.map((p) => (
            <li key={p.id}>
              <button onClick={() => { onClose(); startProcedure(p.id); }}>
                <span className="r-name"><strong>{p.title}</strong><small>{p.summary}</small></span>
                <span className="r-sys">{p.steps.length} steps</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Guide for the active procedure; sits where the structure card goes. */
export function ProcedurePanel() {
  const proc = useStore((s) => s.proc);
  const [tall, setTall] = useState(false);
  if (!proc || proc.kind !== 'procedure') return null;
  const p = PROCEDURES.find((x) => x.id === proc.id)!;
  const step = p.steps[proc.step];
  const groups = (['target', 'landmark', 'risk'] as Role[]).map((role) => ({
    role, items: p.roles.filter((r) => r.role === role).map((r) => idOf(r.ref)).filter((x): x is string => !!x),
  })).filter((g) => g.items.length);

  return (
    <aside className={`card proc-panel${tall ? ' tall' : ''}`} aria-label={p.title}>
      <button className="grip" onClick={() => setTall(!tall)} aria-label={tall ? 'Shrink panel' : 'Expand panel'} />
      <header className="card-head">
        <div>
          <p className="card-kicker">Procedure</p>
          <h2 className="card-title">{p.title}</h2>
          <p className="card-path">{p.summary}</p>
        </div>
        <button className="icon-btn" onClick={endProcedure} aria-label="Exit procedure"><Icon.Close /></button>
      </header>

      <div className="legend">
        {groups.map((g) => (
          <div key={g.role} className="legend-row">
            <span className="legend-key"><span className="dot" style={{ background: ROLE_COLOR[g.role] }} />{ROLE_LABEL[g.role]}</span>
            <span className="legend-items">
              {g.items.map((id) => (
                <button key={id} onClick={() => useStore.getState().select(id, true)}>{nameOf(id).replace(/ \((right|left)\)$/, '')}</button>
              ))}
            </span>
          </div>
        ))}
      </div>

      <div className="card-body">
        <ol className="steps">
          {p.steps.map((s, i) => (
            <li key={s.title} className={i === proc.step ? 'on' : ''}>
              <button onClick={() => goToStep(i)}>
                <span className="step-n">{i + 1}</span>
                <span className="step-t">{s.title}</span>
              </button>
              {i === proc.step && <p>{s.text}</p>}
            </li>
          ))}
        </ol>
        <h3>Common mistakes</h3>
        <ul>{p.mistakes.map((m) => <li key={m}>{m}</li>)}</ul>
        <p className="fine">Draft guide. Follow your hospital protocol and supervision.</p>
      </div>

      <footer className="step-nav">
        <button disabled={proc.step === 0} onClick={() => goToStep(proc.step - 1)}>Back</button>
        <span>Step {proc.step + 1} of {p.steps.length}: {step.title}</span>
        {proc.step < p.steps.length - 1
          ? <button className="primary" onClick={() => goToStep(proc.step + 1)}>Next</button>
          : <button className="primary" onClick={endProcedure}>Finish</button>}
      </footer>
    </aside>
  );
}
