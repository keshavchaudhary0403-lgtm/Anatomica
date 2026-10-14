import { Component, useMemo, useRef, useState, type ReactNode } from 'react';
import * as Icon from './icons';
import { byName, nameOf, resolve } from './index-cache';
import { exportBook, importFile, useNotebook } from './notebook';
import { useStore } from './store';

type Tab = 'cases' | 'notes' | 'pins';
const date = (t: number) => new Date(t).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

/** Notebook: case log, notes and pins. Opens from the top bar. */
export function NotebookPanel({ onClose }: { onClose: () => void }) {
  const book = useNotebook();
  const selected = useStore((s) => s.selected);
  const [tab, setTab] = useState<Tab>('cases');
  const [draft, setDraft] = useState<{ title: string; text: string; link: boolean } | null>(null);
  const [msg, setMsg] = useState('');
  const file = useRef<HTMLInputElement>(null);
  const go = (sid: string) => { onClose(); useStore.getState().select(sid, true); };
  const goName = (name: string) => { const s = resolve(name, 'right', useStore.getState().sex); if (s) go(s.id); };

  return (
    <div className="scrim" onPointerDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="palette notebook" role="dialog" aria-label="My notebook">
        <div className="pick-head">
          <h2>My notebook</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><Icon.Close /></button>
        </div>
        <nav className="tabs" role="tablist">
          {([['cases', `Case log ${book.cases.length || ''}`], ['notes', `Notes ${Object.keys(book.notes).length || ''}`], ['pins', `Pins ${book.pins.length || ''}`]] as [Tab, string][]).map(([k, l]) => (
            <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{l.trim()}</button>
          ))}
        </nav>

        <div className="card-body nb-body">
          {tab === 'cases' && (
            <>
              {!draft && <button className="start" onClick={() => setDraft({ title: '', text: '', link: !!selected })}>New case entry</button>}
              {draft && (
                <form className="nb-form" onSubmit={(e) => {
                  e.preventDefault();
                  if (!draft.title.trim()) return;
                  book.addCase({ title: draft.title.trim(), text: draft.text.trim(), sids: draft.link && selected ? [selected] : [] });
                  setDraft(null);
                }}>
                  <input autoFocus value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="What did you see? e.g. Wrist drop after humerus fracture" />
                  <textarea rows={4} value={draft.text} onChange={(e) => setDraft({ ...draft, text: e.target.value })} placeholder="Findings, management, what you learnt" />
                  {selected && (
                    <label className="check"><input type="checkbox" checked={draft.link} onChange={(e) => setDraft({ ...draft, link: e.target.checked })} /> Link to {nameOf(selected)}</label>
                  )}
                  <div className="row">
                    <button type="button" onClick={() => setDraft(null)}>Cancel</button>
                    <button type="submit" className="primary" disabled={!draft.title.trim()}>Save entry</button>
                  </div>
                </form>
              )}
              {book.cases.length === 0 && !draft && <p className="muted">Log patients and findings from the ward, linked to the structures involved. Nothing is shared; it stays on this device.</p>}
              <ul className="nb-list">
                {book.cases.map((c) => (
                  <li key={c.id}>
                    <div className="nb-head"><strong>{c.title}</strong><span className="muted small">{date(c.at)}</span></div>
                    {c.text && <p>{c.text}</p>}
                    <div className="nb-actions">
                      {c.sids.map((sid) => <button key={sid} className="chip-btn" onClick={() => go(sid)}><Icon.Target /> {nameOf(sid)}</button>)}
                      <button className="chip-btn" onClick={() => { if (confirm('Delete this entry?')) book.removeCase(c.id); }}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {tab === 'notes' && (
            <>
              {Object.keys(book.notes).length === 0 && <p className="muted">Open any structure and use the My notes tab on its card. Your notes appear here.</p>}
              <ul className="nb-list">
                {Object.entries(book.notes).sort((a, b) => b[1].at - a[1].at).map(([name, n]) => (
                  <li key={name}>
                    <div className="nb-head"><button className="nb-link" onClick={() => goName(name)} disabled={!byName.has(name)}>{name}</button><span className="muted small">{date(n.at)}</span></div>
                    <p>{n.text}</p>
                  </li>
                ))}
              </ul>
            </>
          )}

          {tab === 'pins' && (
            <>
              <label className="check"><input type="checkbox" checked={book.showPins} onChange={(e) => book.set({ showPins: e.target.checked })} /> Show pins on the model</label>
              {book.pins.length === 0 && <p className="muted">Open a structure and choose "Pin a spot", then tap the exact point on the model.</p>}
              <ul className="nb-list">
                {book.pins.map((p) => (
                  <li key={p.id}>
                    <input className="nb-pin" value={p.label} onChange={(e) => book.updatePin(p.id, e.target.value)} aria-label="Pin label" />
                    <div className="nb-actions">
                      <button className="chip-btn" onClick={() => go(p.sid)}><Icon.Target /> {nameOf(p.sid)}</button>
                      <button className="chip-btn" onClick={() => book.removePin(p.id)}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <footer className="nb-foot">
          <span className="muted small">{msg || 'Saved on this device. Back up to move notes to another device.'}</span>
          <button onClick={exportBook}>Back up</button>
          <button onClick={() => file.current?.click()}>Restore</button>
          <input ref={file} type="file" accept="application/json,.json" hidden onChange={async (e) => {
            const f = e.target.files?.[0]; if (!f) return;
            try { await importFile(f); setMsg('Notes restored.'); } catch (err) { setMsg((err as Error).message || 'Could not read that file.'); }
            e.target.value = '';
          }} />
        </footer>
      </div>
    </div>
  );
}

/** "My notes" tab body inside a structure card. */
export function MyNotes({ name, sid }: { name: string; sid: string }) {
  const note = useNotebook((s) => s.notes[name]?.text ?? '');
  const allPins = useNotebook((s) => s.pins);
  const pins = useMemo(() => allPins.filter((p) => p.sid === sid), [allPins, sid]);
  const pinMode = useNotebook((s) => s.pinMode);
  return (
    <div className="my-notes">
      <textarea rows={6} value={note} onChange={(e) => useNotebook.getState().setNote(name, e.target.value)} placeholder={`Your notes on ${name}: mnemonics, viva questions, a case you saw…`} />
      <p className="fine">Saved automatically on this device.</p>
      <button className={`chip-btn${pinMode ? ' on' : ''}`} onClick={() => useNotebook.getState().set({ pinMode: !pinMode })}>
        <Icon.Target /> {pinMode ? 'Tap the model to place the pin' : 'Pin a spot'}
      </button>
      {pins.length > 0 && (
        <ul className="nb-list compact">
          {pins.map((p) => (
            <li key={p.id}>
              <input className="nb-pin" value={p.label} onChange={(e) => useNotebook.getState().updatePin(p.id, e.target.value)} aria-label="Pin label" />
              <button className="x" onClick={() => useNotebook.getState().removePin(p.id)} aria-label="Delete pin"><Icon.Close /></button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Keeps a crash in one panel from blanking the whole app. */
export class Guard extends Component<{ children: ReactNode; onReset?: () => void }, { err: Error | null }> {
  state = { err: null as Error | null };
  static getDerivedStateFromError(err: Error) { return { err }; }
  render() {
    if (!this.state.err) return this.props.children;
    return (
      <div className="filter-bar" role="alert">
        <span>Something went wrong in this panel.</span>
        <button className="all" onClick={() => { this.setState({ err: null }); this.props.onReset?.(); }}>Close it</button>
      </div>
    );
  }
}
