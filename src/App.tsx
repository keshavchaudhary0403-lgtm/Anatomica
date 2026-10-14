import { useProgress } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { Card } from './Card';
import { ProcedurePanel, ProcedurePicker } from './ProcedurePanel';
import { QuizPanel } from './QuizPanel';
import { SYSTEMS, type Structure } from './data';
import * as Icon from './icons';
import { ready } from './index-cache';
import { Search } from './Search';
import { saveViews, useStore, type Axis } from './store';
import { useTheme } from './theme';
import { setSex } from './procedure';
import { nameOf } from './index-cache';
import { Viewer, viewApi } from './Viewer';

function Splash({ done }: { done: boolean }) {
  const { progress } = useProgress();
  const [gone, setGone] = useState(false);
  useEffect(() => { if (done) { const t = setTimeout(() => setGone(true), 700); return () => clearTimeout(t); } }, [done]);
  if (gone) return null;
  return (
    <div className={`splash${done ? ' out' : ''}`}>
      <img src="/favicon.svg" alt="" width={64} height={64} />
      <h1>Anatomica</h1>
      <div className="bar"><span style={{ transform: `scaleX(${Math.max(0.04, progress / 100)})` }} /></div>
      <p>Preparing the body</p>
    </div>
  );
}

function SexSwitch() {
  const sex = useStore((s) => s.sex);
  return (
    <div className="sex" role="radiogroup" aria-label="Body">
      {(['male', 'female'] as const).map((x) => (
        <button key={x} role="radio" aria-checked={sex === x} className={sex === x ? 'on' : ''} onClick={() => setSex(x)}>
          {x === 'male' ? 'Male' : 'Female'}
        </button>
      ))}
    </div>
  );
}

function Layers() {
  const visible = useStore((s) => s.visible);
  const loading = useStore((s) => s.loading);
  const press = useRef(0);
  return (
    <nav className="layers" aria-label="Body layers">
      <SexSwitch />
      {SYSTEMS.map((sys) => (
        <button
          key={sys.id}
          className={`layer${visible[sys.id] ? ' on' : ''}`}
          aria-pressed={visible[sys.id]}
          title="Tap to toggle, hold to show only this"
          onPointerDown={() => { press.current = window.setTimeout(() => { press.current = -1; useStore.getState().soloSystem(sys.id); }, 480); }}
          onPointerUp={() => { if (press.current !== -1) { clearTimeout(press.current); useStore.getState().toggleSystem(sys.id); } press.current = 0; }}
          onPointerLeave={() => { if (press.current > 0) clearTimeout(press.current); press.current = 0; }}
          onContextMenu={(e) => e.preventDefault()}
        >
          <span className={`swatch${loading[sys.id] ? ' busy' : ''}`} style={{ '--c': sys.color } as React.CSSProperties} />
          <span className="layer-label">{sys.label}</span>
        </button>
      ))}
    </nav>
  );
}

const AXES: [Axis, string][] = [['y', 'Axial'], ['x', 'Sagittal'], ['z', 'Coronal']];
function SectionPanel() {
  const section = useStore((s) => s.section);
  if (!section.on) return null;
  const set = (p: Partial<typeof section>) => useStore.getState().set({ section: { ...section, ...p } });
  return (
    <div className="section-panel">
      <div className="seg" role="radiogroup" aria-label="Section plane">
        {AXES.map(([a, l]) => (
          <button key={a} role="radio" aria-checked={section.axis === a} className={section.axis === a ? 'on' : ''} onClick={() => set({ axis: a, pos: 0.5 })}>{l}</button>
        ))}
      </div>
      <input type="range" min={0} max={1} step={0.002} value={section.pos} aria-label="Cut position" onChange={(e) => set({ pos: +e.target.value })} />
      <button className="icon-btn" onClick={() => set({ flip: !section.flip })} aria-label="Show the other half"><Icon.Flip /></button>
    </div>
  );
}

function Views() {
  const views = useStore((s) => s.views);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const save = () => {
    const v = viewApi.get();
    if (!v || !name.trim()) return;
    const st = useStore.getState();
    const next = [...views.filter((x) => x.name !== name.trim()), { name: name.trim(), ...v, visible: SYSTEMS.map((s) => s.id).filter((id) => st.visible[id]), selected: st.selected }];
    st.set({ views: next }); saveViews(next); setName('');
  };
  const go = (i: number) => {
    const v = views[i]; const st = useStore.getState();
    st.set({ visible: Object.fromEntries(SYSTEMS.map((s) => [s.id, v.visible.includes(s.id)])) as typeof st.visible, isolated: null });
    st.select(v.selected); viewApi.go(v.cam, v.target); setOpen(false);
  };
  const remove = (i: number) => { const next = views.filter((_, k) => k !== i); useStore.getState().set({ views: next }); saveViews(next); };
  return (
    <div className="views">
      <button className="icon-btn" aria-expanded={open} onClick={() => setOpen(!open)} aria-label="Saved views"><Icon.Bookmark /></button>
      {open && (
        <div className="pop">
          <p className="pop-title">Saved views</p>
          {views.length === 0 && <p className="muted small">Save the current angle, layers and selection to reopen it in one tap.</p>}
          <ul>
            {views.map((v, i) => (
              <li key={v.name}><button onClick={() => go(i)}>{v.name}</button><button className="x" onClick={() => remove(i)} aria-label={`Delete ${v.name}`}><Icon.Close /></button></li>
            ))}
          </ul>
          <form onSubmit={(e) => { e.preventDefault(); save(); }}>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name this view" />
            <button type="submit" disabled={!name.trim()}>Save</button>
          </form>
          <p className="credits">3D models from <a href="https://github.com/LluisV/Z-Anatomy" target="_blank" rel="noreferrer">Z-Anatomy</a>, based on BodyParts3D (DBCLS), CC BY-SA 4.0. Female pelvis: "<a href="https://sketchfab.com/3d-models/bony-pelvis-and-pelvic-organs-from-mri-ad38f2971a054b4db2cd05e3efce9c59" target="_blank" rel="noreferrer">Bony Pelvis and Pelvic Organs from MRI</a>" by audreybyrd, CC BY 4.0.</p>
        </div>
      )}
    </div>
  );
}

function Dock({ onProcedures }: { onProcedures: () => void }) {
  const xray = useStore((s) => s.xray);
  const spin = useStore((s) => s.spin);
  const section = useStore((s) => s.section);
  const proc = useStore((s) => s.proc);
  const quiz = useStore((s) => s.quiz);
  const st = useStore.getState;
  return (
    <div className="dock" role="toolbar" aria-label="View tools">
      <button onClick={() => st().set({ resetReq: st().resetReq + 1 })}><Icon.Reset /><span>Reset</span></button>
      <button className={xray ? 'on' : ''} aria-pressed={xray} onClick={() => st().set({ xray: !xray })}><Icon.Xray /><span>X-ray</span></button>
      <button className={section.on ? 'on' : ''} aria-pressed={section.on} onClick={() => st().set({ section: { ...section, on: !section.on } })}><Icon.Slice /><span>Section</span></button>
      <button className={spin ? 'on' : ''} aria-pressed={spin} onClick={() => st().set({ spin: !spin })}><Icon.Rotate /><span>Turn</span></button>
      <span className="dock-sep" aria-hidden="true" />
      <button className={proc ? 'on' : ''} onClick={onProcedures}><Icon.Syringe /><span>Procedures</span></button>
      <button className={quiz ? 'on' : ''} aria-pressed={!!quiz} onClick={() => st().set(quiz ? { quiz: null, focusList: null } : { quiz: { highlight: null }, selected: null })}><Icon.Cards /><span>Revise</span></button>
    </div>
  );
}

// Always-visible way back when something is isolated or hidden.
function FilterBar() {
  const isolated = useStore((s) => s.isolated);
  const hidden = useStore((s) => s.hidden);
  const hideLog = useStore((s) => s.hideLog);
  if (!isolated && hidden.size === 0) return null;
  const st = useStore.getState();
  const iso = isolated ? [...isolated][0] : null;
  const last = hideLog.at(-1);
  return (
    <div className="filter-bar" role="status">
      <span>{iso ? `Showing only ${nameOf(iso)}` : hidden.size === 1 && last ? `${nameOf(last)} hidden` : `${hidden.size} structures hidden`}</span>
      {!iso && last && <button className="undo" onClick={() => st.undoHide()}>Undo</button>}
      <button className="all" onClick={() => st.showAll()}>Show all</button>
    </div>
  );
}

function ThemeButton() {
  const [theme, toggle] = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <button className="icon-btn" onClick={toggle} aria-label={`Switch to ${next} theme`} title={`Switch to ${next} theme`}>
      {theme === 'dark' ? <Icon.Sun /> : <Icon.Moon />}
    </button>
  );
}

function Hover() {
  const h = useStore((s) => s.hovered);
  if (!h) return null;
  return <div className="hover" style={{ left: h.x + 14, top: h.y + 12 }}>{h.name}</div>;
}

export default function App() {
  const [list, setList] = useState<Structure[]>([]);
  const skeletonLoading = useStore((s) => s.loading.skeleton);
  const selected = useStore((s) => s.selected);
  const proc = useStore((s) => s.proc);
  const quiz = useStore((s) => s.quiz);
  const [picking, setPicking] = useState(false);
  useEffect(() => { ready.then(setList); }, []);
  const panel = quiz ? 'quiz' : selected ? 'card' : proc ? 'proc' : null;
  const done = list.length > 0 && skeletonLoading === false;
  const touch = typeof matchMedia !== 'undefined' && matchMedia('(pointer: coarse)').matches;

  return (
    <div className={`app${panel ? ' has-card' : ''}`}>
      <div className="stage" aria-hidden="true" />
      {list.length > 0 && <Viewer />}
      <header className="top">
        <a className="brand" href="/" aria-label="Anatomica home"><img src="/favicon.svg" alt="" width={26} height={26} /><span>Anatomica</span></a>
        <button className="search-pill" onClick={() => useStore.getState().set({ searchOpen: true })}>
          <Icon.Search /><span>Search structures</span><kbd>⌘K</kbd>
        </button>
        <div className="top-right"><ThemeButton /><Views /></div>
      </header>
      <Layers />
      {panel === 'card' && <Card />}
      {panel === 'proc' && <ProcedurePanel />}
      {panel === 'quiz' && <QuizPanel />}
      <FilterBar />
      <SectionPanel />
      <Dock onProcedures={() => setPicking(true)} />
      {picking && <ProcedurePicker onClose={() => setPicking(false)} />}
      {!panel && done && <p className="hint">{touch ? 'Drag to turn. Pinch to zoom, two fingers to move.' : 'Drag to turn. Scroll to zoom. Right-drag or two-finger swipe to move.'}</p>}
      <Hover />
      <Search list={list} />
      <Splash done={done} />
    </div>
  );
}
