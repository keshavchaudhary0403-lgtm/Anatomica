import { useEffect, useState } from 'react';
import { clinicalFor } from './content';
import { loadDescriptions, SYSTEMS, TISSUE } from './data';
import * as Icon from './icons';
import { byId } from './index-cache';
import { useStore } from './store';

type Tab = 'clinical' | 'overview' | 'landmarks';

export function Card() {
  const selected = useStore((s) => s.selected);
  const landmark = useStore((s) => s.landmark);
  const isolated = useStore((s) => s.isolated);
  const [desc, setDesc] = useState<Record<string, { t: string; u: string }>>({});
  const [tab, setTab] = useState<Tab>('overview');
  const [tall, setTall] = useState(false);
  useEffect(() => { loadDescriptions().then(setDesc); }, []);

  const s = selected ? byId.get(selected) : null;
  const found = s ? clinicalFor(s.name) : null;
  const clin = found?.note;
  useEffect(() => { setTab(clin ? 'clinical' : 'overview'); }, [selected]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!s) return null;

  const d = desc[s.dkey];
  const sys = SYSTEMS.find((x) => x.id === s.sys)!;
  const st = useStore.getState();
  const isolatedHere = !!isolated?.has(s.id);
  const tabs: [Tab, string, boolean][] = [
    ['clinical', 'Clinical', !!clin],
    ['overview', 'Overview', true],
    ['landmarks', `Landmarks${s.lm.length ? ` ${s.lm.length}` : ''}`, s.lm.length > 0],
  ];

  return (
    <aside className={`card${tall ? ' tall' : ''}`} aria-label={s.name}>
      <button className="grip" onClick={() => setTall(!tall)} aria-label={tall ? 'Shrink panel' : 'Expand panel'} />
      <header className="card-head">
        <div>
          <p className="card-kicker">
            <span className="dot" style={{ background: TISSUE[s.tissue]?.color ?? sys.color }} />
            {TISSUE[s.tissue]?.label ?? sys.label}{s.side ? `, ${s.side} side` : ''}
          </p>
          <h2 className="card-title">{s.name}</h2>
          {s.path.length > 0 && <p className="card-path">{s.path.slice(-2).join(' / ')}</p>}
        </div>
        <button className="icon-btn" onClick={() => st.select(null)} aria-label="Close"><Icon.Close /></button>
      </header>

      <div className="card-actions">
        <button className="chip-btn" onClick={() => st.set({ focusReq: st.focusReq + 1 })}><Icon.Target /> Focus</button>
        {isolatedHere
          ? <button className="chip-btn on" onClick={() => st.unisolate()}><Icon.Expand /> Exit isolate</button>
          : <button className="chip-btn" onClick={() => st.isolate(s.id)}><Icon.Expand /> Isolate</button>}
        <button className="chip-btn" onClick={() => st.hide(s.id)}><Icon.EyeOff /> Hide</button>
      </div>

      <nav className="tabs" role="tablist">
        {tabs.filter((t) => t[2]).map(([k, label]) => (
          <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{label}</button>
        ))}
      </nav>

      <div className="card-body">
        {tab === 'clinical' && clin && (
          <>
            {found && found.key !== s.name && <p className="muted small">Notes for {found.key}</p>}
            {clin.procedure && <p className="proc">Procedure site: {clin.procedure}</p>}
            {clin.supply?.map((x) => (
              <div className="kv" key={x.label}><span>{x.label}</span><p>{x.text}</p></div>
            ))}
            <h3>Clinical correlation</h3>
            <ul>{clin.clinical.map((c) => <li key={c}>{c}</li>)}</ul>
            <h3>NEET PG high-yield</h3>
            <ul className="hy">{clin.neet.map((c) => <li key={c}>{c}</li>)}</ul>
            {clin.imaging && (<><h3>Imaging</h3><p>{clin.imaging}</p></>)}
            <p className="fine">Draft notes. Verify against your textbook.</p>
          </>
        )}
        {tab === 'overview' && (
          d ? (
            <>
              {d.t.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
              <p className="fine">Text from <a href={d.u} target="_blank" rel="noreferrer">Wikipedia</a>, CC BY-SA.</p>
            </>
          ) : <p className="muted">No overview for this structure yet. Clinical notes are added region by region.</p>
        )}
        {tab === 'landmarks' && (
          <ul className="lm">
            {s.lm.map((l) => (
              <li key={l.n}>
                <button className={landmark?.n === l.n ? 'on' : ''} onClick={() => st.set({ landmark: landmark?.n === l.n ? null : l })}>{l.n}</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
