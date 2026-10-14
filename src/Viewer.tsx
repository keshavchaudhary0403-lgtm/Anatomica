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
if (import.meta.env.DEV) (window as unknown as { __parts: typeof parts }).__parts = parts;
const bodyBox = new THREE.Box3(new THREE.Vector3(-0.34, 0, -0.15), new THREE.Vector3(0.34, 1.75, 0.15));

// A faint amber copy of the selection drawn on top of everything, so it can be found even when covered.
const overlayMat = new THREE.MeshBasicMaterial({ color: SELECT, transparent: true, opacity: 0.28, depthTest: false, depthWrite: false, clippingPlanes: clipList });
const overlays: THREE.Mesh[] = [];

function applyState() {
  const s = useStore.getState();
  overlays.splice(0).forEach((o) => o.removeFromParent());
  for (const p of allParts()) {
    const sysOn = s.visible[p.sys];
    const show = sysOn && !s.hidden.has(p.id) && (!s.isolated || s.isolated.has(p.id));
    p.mesh.visible = show;
    if (!show) continue;
    const t = p.mesh.userData.t as string;
    p.mesh.material = p.id === s.selected ? mat('glow', t) : s.xray ? mat('ghost', t) : mat('base', t);
    p.mesh.renderOrder = p.id === s.selected ? 2 : s.xray ? 1 : 0;
    if (p.id === s.selected) {
      const o = new THREE.Mesh(p.mesh.geometry, overlayMat);
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
        let tissue = (Array.isArray(m.material) ? m.material[0] : m.material).name || 'organ';
        const info = byId.get(sid);
        if (info && tissue === info.tissue) tissue = colorKey(info);
        m.userData.t = tissue;
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
    if (s.visible !== p.visible || s.selected !== p.selected || s.hidden !== p.hidden || s.isolated !== p.isolated || s.xray !== p.xray || s.section !== p.section) {
      applyState(); invalidate();
    }
  }), [invalidate]);
  return null;
}

// ---------- picking ----------
const raycaster = new THREE.Raycaster();
function pick(x: number, y: number, el: HTMLElement, camera: THREE.Camera) {
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
    return h.object.userData.sid as string;
  }
  return null;
}

function Interaction() {
  const { gl, camera } = useThree();
  useEffect(() => {
    const el = gl.domElement;
    let down: { x: number; y: number; t: number } | null = null;
    let hoverTimer = 0;
    const onDown = (e: PointerEvent) => { down = { x: e.clientX, y: e.clientY, t: performance.now() }; };
    const onUp = (e: PointerEvent) => {
      if (!down) return;
      const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
      const quick = performance.now() - down.t < 450;
      down = null;
      if (moved > 6 || !quick) return;
      const id = pick(e.clientX, e.clientY, el, camera);
      useStore.getState().select(id);
    };
    const onDbl = (e: MouseEvent) => {
      const id = pick(e.clientX, e.clientY, el, camera);
      if (id) useStore.getState().select(id, true);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.buttons) return;
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
    el.addEventListener('dblclick', onDbl);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointerdown', onDown); el.removeEventListener('pointerup', onUp);
      el.removeEventListener('dblclick', onDbl); el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [gl, camera]);
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
    const id = useStore.getState().selected;
    const p = allParts().filter((q) => q.id === id);
    if (!p.length) return; // system still loading; retried when partsV bumps
    pending.current = 0;
    const box = new THREE.Box3();
    p.forEach((q) => box.expandByObject(q.mesh));
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    const dir = camera.position.clone().sub(controls.target).normalize();
    const dist = THREE.MathUtils.clamp(sphere.radius * 4.8, 0.25, 3.2);
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
      <OrbitControls makeDefault target={HOME.target} enableDamping dampingFactor={0.12} minDistance={0.12} maxDistance={7} zoomSpeed={0.9} rotateSpeed={0.75} autoRotate={spin} autoRotateSpeed={0.9} />
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
