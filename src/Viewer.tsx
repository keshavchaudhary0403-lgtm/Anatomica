import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { acceleratedRaycast, computeBoundsTree } from 'three-mesh-bvh';
import type { OrbitControls as OrbitImpl } from 'three-stdlib';
import { colorKey, SYSTEMS, TISSUE, type SystemId } from './data';
import { useStore } from './store';
import { byId, nameOf } from './index-cache';

THREE.Mesh.prototype.raycast = acceleratedRaycast;
(THREE.BufferGeometry.prototype as any).computeBoundsTree = computeBoundsTree;

const HOME = { target: new THREE.Vector3(0, 0.86, 0), cam: new THREE.Vector3(0.7, 1.05, 4.6) };
const SELECT = new THREE.Color('#f2a65a');

// ---------- shared materials ----------
const clipPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 1);
const clipList: THREE.Plane[] = [];
const base = new Map<string, THREE.MeshStandardMaterial>();
const glow = new Map<string, THREE.MeshStandardMaterial>();
const ghost = new Map<string, THREE.MeshStandardMaterial>();
function mat(kind: 'base' | 'glow' | 'ghost', tissue: string) {
  const map = kind === 'base' ? base : kind === 'glow' ? glow : ghost;
  let m = map.get(tissue);
  if (!m) {
    const t = TISSUE[tissue] ?? TISSUE.organ;
    m = new THREE.MeshStandardMaterial({ color: t.color, roughness: t.rough, metalness: 0, side: THREE.DoubleSide, clippingPlanes: clipList });
    if (kind === 'glow') { m.emissive = SELECT.clone(); m.emissiveIntensity = 0.38; m.color.lerp(SELECT, 0.78); }
    if (kind === 'ghost') { m.transparent = true; m.opacity = 0.1; m.depthWrite = false; }
    if (tissue === 'skin' && kind === 'base') { m.transparent = true; m.opacity = 0.92; }
    if (tissue === 'fascia' && kind === 'base') { m.transparent = true; m.opacity = 0.18; m.depthWrite = false; }
    map.set(tissue, m);
  }
  return m;
}

// ---------- registry of loaded meshes ----------
interface Part { mesh: THREE.Mesh; id: string; tissue: string; sys: SystemId }
const parts = new Map<SystemId, Part[]>();
const allParts = () => [...parts.values()].flat();
if (import.meta.env.DEV) Object.assign(window, { __parts: parts });
const bodyBox = new THREE.Box3(new THREE.Vector3(-0.34, 0, -0.15), new THREE.Vector3(0.34, 1.75, 0.15));

// Procedure roles: target (amber), landmark (teal), at risk (red).
export const ROLE_COLOR = { target: '#f2a65a', landmark: '#3fc6c0', risk: '#ff4d5e' } as const;
const roleMats = new Map<string, THREE.MeshStandardMaterial>();
function roleMat(role: keyof typeof ROLE_COLOR, tissue: string, faint = false) {
  const k = role + '|' + tissue + (faint ? '|f' : '');
  let m = roleMats.get(k);
  if (!m) {
    const c = new THREE.Color(ROLE_COLOR[role]);
    m = mat('base', tissue).clone();
    m.transparent = false; m.opacity = 1; m.depthWrite = true;
    m.color.lerp(c, 0.8); m.emissive = c; m.emissiveIntensity = 0.32;
    if (faint) { m.transparent = true; m.opacity = 0.16; m.depthWrite = false; m.emissiveIntensity = 0.15; }
    m.clippingPlanes = clipList;
    roleMats.set(k, m);
  }
  return m;
}
const roleOverlay = Object.fromEntries(Object.entries(ROLE_COLOR).map(([k, c]) => [k,
  new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.2, depthTest: false, depthWrite: false, clippingPlanes: clipList })])) as Record<keyof typeof ROLE_COLOR, THREE.MeshBasicMaterial>;

// A faint amber copy of the selection drawn on top of everything, so it can be found even when covered.
const overlayMat = new THREE.MeshBasicMaterial({ color: SELECT, transparent: true, opacity: 0.28, depthTest: false, depthWrite: false, clippingPlanes: clipList });
const overlays: THREE.Mesh[] = [];

function applyState() {
  const s = useStore.getState();
  overlays.splice(0).forEach((o) => o.removeFromParent());
  for (const p of allParts()) {
    const sysOn = s.visible[p.sys];
    const role = s.proc?.roles.get(p.id);
    const inProc = !s.proc || role || s.proc.context.has(p.sys);
    const quizHit = s.quiz?.highlight === p.id;
    const show = sysOn && !s.hidden.has(p.id) && (!s.isolated || s.isolated.has(p.id)) && !!inProc;
    p.mesh.visible = show;
    if (!show) continue;
    const t = p.mesh.userData.t as string;
    const sel = p.id === s.selected || quizHit;
    const faint = !!s.proc?.faint.has(p.id);
    p.mesh.material = sel ? mat('glow', t) : role ? roleMat(role, t, faint) : s.xray ? mat('ghost', t) : mat('base', t);
    p.mesh.renderOrder = sel ? 2 : role ? (faint ? 3 : 1.5) : s.xray ? 1 : 0;
    if (sel || (role && !faint)) {
      const o = new THREE.Mesh(p.mesh.geometry, sel ? overlayMat : roleOverlay[role!]);
      o.renderOrder = 10; o.raycast = () => {};
      p.mesh.add(o); overlays.push(o);
    }
  }
  const { on, axis, pos, flip } = s.section;
  clipList.length = 0;
  if (on) {
    const lo = bodyBox.min[axis], hi = bodyBox.max[axis];
    const v = lo + (hi - lo) * pos;
    const n = new THREE.Vector3(axis === 'x' ? -1 : 0, axis === 'y' ? -1 : 0, axis === 'z' ? -1 : 0);
    if (flip) n.negate();
    clipPlane.set(n, flip ? -v : v);
    clipList.push(clipPlane);
  }
}

function SystemModel({ id }: { id: SystemId }) {
  const gltf = useGLTF(`/models/${id}.glb`, false, true);
  const invalidate = useThree((t) => t.invalidate);
  const scene = useMemo(() => {
    const list: Part[] = [];
    gltf.scene.traverse((o) => {
      const sid = o.userData.id as string | undefined;
      if (!sid) return;
      o.traverse((c) => {
        if (!(c as THREE.Mesh).isMesh) return;
        const m = c as THREE.Mesh;
        // Read the tissue from the file's material only once: after that the mesh carries
        // our shared materials, and re-reading them (when a layer is shown again) loses it.
        if (m.userData.t === undefined) {
          let t = (Array.isArray(m.material) ? m.material[0] : m.material).name || 'organ';
          const info = byId.get(sid);
          if (info && t === info.tissue) t = colorKey(info);
          m.userData.t = t;
        }
        const tissue = m.userData.t as string;
        m.userData.sid = sid;
        list.push({ mesh: m, id: sid, tissue, sys: id });
      });
    });
    return { root: gltf.scene, list };
  }, [gltf, id]);

  useEffect(() => {
    parts.set(id, scene.list);
    applyState(); invalidate();
    useStore.setState((st) => ({ partsV: st.partsV + 1 }));
    useStore.getState().setLoading(id, false);
    return () => { parts.delete(id); };
  }, [scene, id, invalidate]);
  return <primitive object={scene.root} />;
}

function Loader({ id }: { id: SystemId }) {
  useEffect(() => { useStore.getState().setLoading(id, true); }, [id]);
  return null;
}

// Re-apply materials and visibility whenever relevant state changes.
function StateSync() {
  const invalidate = useThree((t) => t.invalidate);
  useEffect(() => useStore.subscribe((s, p) => {
    if (s.visible !== p.visible || s.selected !== p.selected || s.hidden !== p.hidden || s.isolated !== p.isolated || s.xray !== p.xray || s.section !== p.section || s.proc !== p.proc || s.quiz !== p.quiz) {
      applyState(); invalidate();
    }
  }), [invalidate]);
  return null;
}

// ---------- picking ----------
const raycaster = new THREE.Raycaster();
function pick(x: number, y: number, el: HTMLElement, camera: THREE.Camera) {
  return pickHit(x, y, el, camera)?.id ?? null;
}
function pickHit(x: number, y: number, el: HTMLElement, camera: THREE.Camera): { id: string; point: THREE.Vector3 } | null {
  const r = el.getBoundingClientRect();
  raycaster.setFromCamera(new THREE.Vector2(((x - r.left) / r.width) * 2 - 1, -((y - r.top) / r.height) * 2 + 1), camera);
  const cands = allParts().filter((p) => p.mesh.visible);
  const hits: THREE.Intersection[] = [];
  const sphere = new THREE.Sphere();
  for (const p of cands) {
    const g = p.mesh.geometry as THREE.BufferGeometry & { boundsTree?: unknown; computeBoundsTree?: () => void };
    if (!g.boundingSphere) g.computeBoundingSphere();
    sphere.copy(g.boundingSphere!).applyMatrix4(p.mesh.matrixWorld);
    if (!raycaster.ray.intersectsSphere(sphere)) continue;
    if (!g.boundsTree) g.computeBoundsTree?.();
    p.mesh.raycast(raycaster, hits);
  }
  hits.sort((a, b) => a.distance - b.distance);
  const clip = clipList[0];
  for (const h of hits) {
    if (clip && clip.distanceToPoint(h.point) < 0) continue;
    return { id: h.object.userData.sid as string, point: h.point.clone() };
  }
  return null;
}

function Interaction() {
  const { gl, camera } = useThree();
  useEffect(() => {
    const el = gl.domElement;
    let down: { x: number; y: number; t: number } | null = null;
    let fingers = 0; let multi = false;
    let lastTap: { x: number; y: number; t: number } | null = null;
    let hoverTimer = 0;
    const onDown = (e: PointerEvent) => {
      fingers++; if (fingers > 1) multi = true;
      if (!e.isPrimary) return;
      down = { x: e.clientX, y: e.clientY, t: performance.now() }; clearTimeout(hoverTimer); useStore.getState().set({ hovered: null }); };
    const onUp = (e: PointerEvent) => {
      fingers = Math.max(0, fingers - 1);
      const wasMulti = multi; if (fingers === 0) multi = false;
      if (!down || wasMulti || e.button !== 0) { if (fingers === 0) down = null; return; }
      const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
      const quick = performance.now() - down.t < 450;
      down = null;
      if (moved > 6 || !quick) return;
      if (useStore.getState().quiz) return; // tapping would reveal the answer
      const id = pick(e.clientX, e.clientY, el, camera);
      // Touch screens do not reliably send dblclick, so detect a double tap here.
      const now = performance.now();
      const dbl = e.pointerType === 'touch' && lastTap && now - lastTap.t < 320 && Math.hypot(e.clientX - lastTap.x, e.clientY - lastTap.y) < 30;
      lastTap = dbl ? null : { x: e.clientX, y: e.clientY, t: now };
      useStore.getState().select(id, !!(dbl && id));
    };
    const onCancel = () => { fingers = Math.max(0, fingers - 1); if (fingers === 0) { multi = false; down = null; } };
    const onDbl = (e: MouseEvent) => {
      if (useStore.getState().quiz) return;
      const id = pick(e.clientX, e.clientY, el, camera);
      if (id) useStore.getState().select(id, true);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.buttons || useStore.getState().quiz) return;
      clearTimeout(hoverTimer);
      useStore.getState().set({ hovered: null });
      hoverTimer = window.setTimeout(() => {
        const id = pick(e.clientX, e.clientY, el, camera);
        useStore.getState().set({ hovered: id ? { name: nameOf(id), x: e.clientX, y: e.clientY } : null });
      }, 140);
    };
    const onLeave = () => { clearTimeout(hoverTimer); useStore.getState().set({ hovered: null }); };
    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onCancel);
    el.addEventListener('dblclick', onDbl);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointerdown', onDown); el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onCancel); el.removeEventListener('dblclick', onDbl); el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [gl, camera]);
  return null;
}

// ---------- navigation ----------
// Every gesture moves camera and orbit target together, anchored on the point under the
// cursor or fingers, so whatever you touch stays under your hand:
//   drag (1 finger)         turn around the point you grabbed
//   right-drag, shift-drag  move the body under the cursor (2 fingers on touch, 2-finger swipe on a trackpad)
//   wheel, pinch            zoom toward the point under the cursor / between the fingers
function Navigation() {
  const { gl, camera, invalidate } = useThree();
  const controls = useThree((t) => t.controls) as unknown as OrbitImpl | null;
  useEffect(() => {
    if (!controls) return;
    const el = gl.domElement;
    const cam = camera as THREE.PerspectiveCamera;
    const MIN = 0.035, MAX = 7;
    const up = new THREE.Vector3(0, 1, 0);

    const ndc = (x: number, y: number) => {
      const r = el.getBoundingClientRect();
      return new THREE.Vector2(((x - r.left) / r.width) * 2 - 1, -((y - r.top) / r.height) * 2 + 1);
    };
    // The 3D point under a screen point: the structure there, or else a point at the orbit target's depth.
    const pointAt = (x: number, y: number) => {
      const hit = pickHit(x, y, el, camera);
      if (hit) return { p: hit.point, hit: true };
      raycaster.setFromCamera(ndc(x, y), camera);
      const fwd = controls.target.clone().sub(camera.position).normalize();
      const depth = Math.max(0.05, controls.target.clone().sub(camera.position).dot(fwd));
      const t = depth / Math.max(0.2, raycaster.ray.direction.dot(fwd));
      return { p: raycaster.ray.at(t, new THREE.Vector3()), hit: false };
    };
    const changed = () => { controls.update(); invalidate(); };
    const stopSpin = () => { if (useStore.getState().spin) useStore.getState().set({ spin: false }); };

    const zoom = (p: THREE.Vector3, scale: number) => {
      const dist = camera.position.distanceTo(controls.target);
      const s = THREE.MathUtils.clamp(scale, MIN / dist, MAX / dist);
      camera.position.sub(p).multiplyScalar(s).add(p);
      controls.target.sub(p).multiplyScalar(s).add(p);
      changed();
    };
    // Slide camera and target so the point at depth `depthPoint` follows the pointer exactly.
    const pan = (dx: number, dy: number, depthPoint: THREE.Vector3) => {
      const fwd = new THREE.Vector3(); camera.getWorldDirection(fwd);
      const depth = Math.max(0.03, depthPoint.clone().sub(camera.position).dot(fwd));
      const perPx = (2 * depth * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2))) / el.clientHeight;
      const right = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 0);
      const camUp = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 1);
      const move = right.multiplyScalar(-dx * perPx).add(camUp.multiplyScalar(dy * perPx));
      camera.position.add(move); controls.target.add(move);
      changed();
    };
    const turn = (dx: number, dy: number, pivot: THREE.Vector3) => {
      const k = (2 * Math.PI / el.clientHeight) * 0.65;
      const right = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 0);
      const q = new THREE.Quaternion().setFromAxisAngle(up, -dx * k);
      const pitch = new THREE.Quaternion().setFromAxisAngle(right, -dy * k);
      const fwd = controls.target.clone().sub(camera.position).normalize().applyQuaternion(pitch);
      if (Math.abs(fwd.dot(up)) < 0.985) q.multiply(pitch); // stop short of straight up or down
      camera.position.sub(pivot).applyQuaternion(q).add(pivot);
      controls.target.sub(pivot).applyQuaternion(q).add(pivot);
      changed();
    };

    // ---- wheel: mouse wheel zooms; trackpad pinch zooms; trackpad two-finger swipe moves ----
    let wheel: { p: THREE.Vector3; t: number } | null = null;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault(); stopSpin();
      const now = performance.now();
      if (!wheel || now - wheel.t > 250) wheel = { p: pointAt(e.clientX, e.clientY).p, t: now };
      wheel.t = now;
      const px = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 400 : 1;
      const dx = e.deltaX * px, dy = e.deltaY * px;
      const trackpadSwipe = !e.ctrlKey && e.deltaMode === 0 && (dx !== 0 || !Number.isInteger(e.deltaY) || Math.abs(dy) < 30);
      if (trackpadSwipe) { pan(-dx, -dy, wheel.p); return; }
      // ctrl+wheel is a trackpad pinch: small deltas, so it needs a bigger factor.
      const k = e.ctrlKey ? 0.012 : 0.0028;
      zoom(wheel.p, Math.exp(THREE.MathUtils.clamp(dy, -150, 150) * k));
    };

    // ---- pointers ----
    const pts = new Map<number, { x: number; y: number }>();
    let drag: { id: number; x: number; y: number; mode: 'turn' | 'pan'; p: THREE.Vector3 } | null = null;
    let two: { dist: number; mx: number; my: number; p: THREE.Vector3 } | null = null;
    const mid = () => { const [a, b] = [...pts.values()]; return { mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2, dist: Math.hypot(a.x - b.x, a.y - b.y) }; };

    const onDown = (e: PointerEvent) => {
      stopSpin();
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      try { el.setPointerCapture(e.pointerId); } catch { /* ignore */ }
      if (pts.size === 2) {
        drag = null;
        const m = mid();
        two = { ...m, p: pointAt(m.mx, m.my).p };
        return;
      }
      if (pts.size > 2) return;
      const panning = e.button === 2 || e.button === 1 || e.shiftKey || e.ctrlKey || e.metaKey;
      drag = { id: e.pointerId, x: e.clientX, y: e.clientY, mode: panning ? 'pan' : 'turn', p: pointAt(e.clientX, e.clientY).p };
    };
    const onMove = (e: PointerEvent) => {
      if (!pts.has(e.pointerId)) return;
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (two && pts.size === 2) {
        const m = mid();
        pan(m.mx - two.mx, m.my - two.my, two.p);
        if (m.dist > 0 && two.dist > 0) zoom(two.p, two.dist / m.dist);
        two.mx = m.mx; two.my = m.my; two.dist = m.dist;
        return;
      }
      if (drag && e.pointerId === drag.id) {
        const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
        if (drag.mode === 'turn') turn(dx, dy, drag.p); else pan(dx, dy, drag.p);
        drag.x = e.clientX; drag.y = e.clientY;
      }
    };
    const onUp = (e: PointerEvent) => {
      pts.delete(e.pointerId);
      if (pts.size < 2) two = null;
      if (drag && e.pointerId === drag.id) drag = null;
      // One finger left after a two-finger gesture: carry on turning from where it is.
      if (pts.size === 1 && !drag) {
        const [[id, q]] = [...pts.entries()];
        drag = { id, x: q.x, y: q.y, mode: 'turn', p: pointAt(q.x, q.y).p };
      }
    };
    const noMenu = (e: Event) => e.preventDefault();

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    el.addEventListener('contextmenu', noMenu);
    return () => {
      el.removeEventListener('wheel', onWheel); el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove); el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp); el.removeEventListener('contextmenu', noMenu);
    };
  }, [gl, camera, controls, invalidate]);
  return null;
}

// ---------- camera ----------
function CameraRig() {
  const controls = useThree((t) => t.controls) as unknown as OrbitImpl | null;
  const { camera, invalidate } = useThree();
  const anim = useRef<{ t: number; fromT: THREE.Vector3; toT: THREE.Vector3; fromC: THREE.Vector3; toC: THREE.Vector3 } | null>(null);
  const focusReq = useStore((s) => s.focusReq);
  const resetReq = useStore((s) => s.resetReq);

  const fly = (toT: THREE.Vector3, toC: THREE.Vector3) => {
    if (!controls) return;
    anim.current = { t: 0, fromT: controls.target.clone(), toT, fromC: camera.position.clone(), toC };
    invalidate();
  };
  const pending = useRef(0);
  const partsV = useStore((s) => s.partsV);
  useEffect(() => { pending.current = focusReq; }, [focusReq]);
  useEffect(() => {
    if (!pending.current || !controls) return;
    const st = useStore.getState();
    const ids = st.focusList ?? (st.selected ? [st.selected] : []);
    const p = allParts().filter((q) => ids.includes(q.id));
    const found = new Set(p.map((q) => q.id));
    const stillLoading = Object.values(st.loading).some(Boolean);
    if (!p.length || (found.size < ids.length && stillLoading)) return; // retried when partsV bumps
    pending.current = 0;
    const box = new THREE.Box3();
    p.forEach((q) => box.expandByObject(q.mesh));
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    const dir = st.focusDir ? new THREE.Vector3(...st.focusDir).normalize() : camera.position.clone().sub(controls.target).normalize();
    const dist = THREE.MathUtils.clamp(sphere.radius * (st.focusList ? 3.6 : 4.8), 0.25, 3.2);
    fly(sphere.center.clone(), sphere.center.clone().add(dir.multiplyScalar(dist)));
  }, [focusReq, partsV, controls]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (resetReq) fly(HOME.target.clone(), HOME.cam.clone()); }, [resetReq]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    viewApi.get = () => (controls ? { cam: camera.position.toArray(), target: controls.target.toArray() } : null);
    viewApi.go = (cam, target) => fly(new THREE.Vector3(...target), new THREE.Vector3(...cam));
  });

  useFrame((_, dt) => {
    const a = anim.current;
    if (!a || !controls) return;
    a.t = Math.min(1, a.t + dt / 0.85);
    const k = 1 - Math.pow(1 - a.t, 3);
    controls.target.lerpVectors(a.fromT, a.toT, k);
    camera.position.lerpVectors(a.fromC, a.toC, k);
    controls.update();
    if (a.t >= 1) anim.current = null;
    invalidate();
  });
  return null;
}

// Pulse the selected structure for a moment so the eye finds it.
function Pulse() {
  const selected = useStore((s) => s.selected);
  const until = useRef(0);
  const invalidate = useThree((t) => t.invalidate);
  useEffect(() => { until.current = performance.now() + 1400; invalidate(); }, [selected, invalidate]);
  useFrame(() => {
    const left = until.current - performance.now();
    const v = left > 0 ? 0.38 + 0.5 * Math.sin((1400 - left) / 1400 * Math.PI * 3) ** 2 : 0.38;
    glow.forEach((m) => { m.emissiveIntensity = v; });
    if (left > 0) invalidate();
  });
  return null;
}

function Env() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pm = new THREE.PMREMGenerator(gl);
    const tex = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = tex;
    scene.environmentIntensity = 0.32;
    return () => { tex.dispose(); pm.dispose(); };
  }, [gl, scene]);
  return null;
}

function LandmarkPin() {
  const lm = useStore((s) => s.landmark);
  if (!lm) return null;
  return (
    <Html position={lm.p} center zIndexRange={[20, 0]}>
      <div className="pin"><span className="pin-dot" /><span className="pin-label">{lm.n}</span></div>
    </Html>
  );
}

// Keep the model centred in the space the structure card leaves free.
function ViewOffset() {
  const { camera, size, invalidate } = useThree();
  const selected = useStore((s) => s.selected);
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const w = size.width, h = size.height;
    if (!selected) cam.clearViewOffset();
    else if (w > 720) { const d = (w > 1100 ? 380 : 340) / 2 + 8; cam.setViewOffset(w + 2 * d, h, 2 * d, 0, w, h); }
    else { const e = h * 0.23; cam.setViewOffset(w, h + 2 * e, 0, 2 * e, w, h); }
    cam.updateProjectionMatrix(); invalidate();
  }, [selected, size, camera, invalidate]);
  return null;
}

function Spin() {
  const spin = useStore((s) => s.spin);
  const invalidate = useThree((t) => t.invalidate);
  useFrame(() => { if (spin) invalidate(); });
  useEffect(() => { invalidate(); }, [spin, invalidate]);
  return null;
}

export function Viewer() {
  const visible = useStore((s) => s.visible);
  const spin = useStore((s) => s.spin);
  return (
    <Canvas
      className="viewer"
      frameloop="demand"
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, localClippingEnabled: true, powerPreference: 'high-performance' }}
      camera={{ fov: 30, near: 0.01, far: 50, position: HOME.cam.toArray() }}
      onCreated={({ gl }) => { gl.localClippingEnabled = true; gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = 0.95; }}
    >
      <Env />
      <hemisphereLight args={['#f4fbfa', '#1a2c31', 0.45]} />
      <directionalLight position={[3, 3.5, 2.2]} intensity={1.7} />
      <directionalLight position={[-3, 2, -2.5]} intensity={0.9} color="#9fd6ff" />
      {SYSTEMS.map(({ id }) => (visible[id] ? (
        <Suspense key={id} fallback={<Loader id={id} />}><SystemModel id={id} /></Suspense>
      ) : null))}
      <LandmarkPin />
      <OrbitControls makeDefault target={HOME.target} enableDamping={false} enableZoom={false} enableRotate={false} enablePan={false} minDistance={0.03} maxDistance={7.5} autoRotate={spin} autoRotateSpeed={0.9} />
      <Navigation />
      <Spin />
      <ViewOffset />
      <CameraRig />
      <StateSync />
      <Interaction />
      <Pulse />
    </Canvas>
  );
}

export const viewApi: {
  get: () => { cam: number[]; target: number[] } | null;
  go: (cam: number[], target: number[]) => void;
} = { get: () => null, go: () => {} };
