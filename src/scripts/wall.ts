import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scroller } from './scroll';
import { rng, scatter, sheet, type Rect } from '../lib/wall';
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });
const $ = <T extends HTMLElement>(s: string) => document.querySelector<T>(s)!;
const desk = $('#desk'), intro = $('#intro'), head = $('#sheetHead'), cells = $('#cells');
const frs = [...document.querySelectorAll<HTMLElement>('.frag')];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
type P = { el: HTMLElement; d: HTMLElement; p: HTMLElement; w: number; h: number; ax: number; ay: number; rot: number; dep: number };
let data: P[] = [], tl: gsap.core.Timeline | null = null, st: ScrollTrigger | null = null, progress = 0, dragged = false;
/* A different pinning on each visit; ?seed= fixes it. */
const seed = Number(new URLSearchParams(location.search).get('seed')) || [13, 21, 34, 55, 89, 144][(Math.random() * 6) | 0];
let flat = reduce;
const holds = new Set<() => void>();
let bounds: Rect = { x: 0, y: 0, w: 0, h: 0 };

function build() {
  flat = reduce || innerHeight < 620;
  desk.toggleAttribute('data-flat', flat);
  desk.style.height = '';
  const W = desk.clientWidth, pad = Math.max(W * 0.03, 14), wide = W > 900, top = 76;
  let H = desk.clientHeight, bot = H - 50;
  bounds = { x: pad, y: top, w: W - pad * 2, h: bot - top };
  const vis = frs.filter((f) => f.offsetParent);
  data = vis.map((el, i) => ({ el, d: el.querySelector('.d')!, p: el.querySelector('.p')!, w: el.offsetWidth, h: el.offsetHeight, ax: 0, ay: 0, rot: 0, dep: i ? 0.6 + ((i * 7) % 10) / 7 : 0.35 }));
  const big = data[0];
  big.ax = wide ? W * 0.53 - big.w / 2 : pad + 16; big.ay = wide ? H * 0.46 - big.h / 2 : top + 44;
  const reserved = [
    { x: big.ax - 26, y: big.ay - 36, w: big.w + 52, h: big.h + (wide ? 78 : 104) },
    { x: intro.offsetLeft - 12, y: intro.offsetTop - 14, w: intro.offsetWidth + 24, h: intro.offsetHeight + 28 },
  ];
  scatter(data.slice(1), bounds, reserved, wide ? 9 : 4, wide ? 5 : 9, seed).forEach((o, i) => { const d = data[i + 1]; d.ax = o.x; d.ay = o.y; d.rot = o.rot; });

  const cols = wide ? (data.length > 24 ? 8 : 6) : W > 700 ? 6 : 4, left = wide ? W * 0.36 : pad;
  gsap.set(head, { top: wide ? top + 24 : top + 8, left: pad, width: wide ? W * 0.36 - pad - 32 : W - pad * 2 });
  $('#count').textContent = String(data.length);
  if (flat) gsap.set(intro, { top: head.offsetTop + head.offsetHeight + 20, bottom: 'auto' });
  const sTop = wide ? top + 24 : top + 8 + head.offsetHeight + 12 + (flat ? intro.offsetHeight + 20 : 0);
  /* Without a pin the section may be as tall as the sheet needs. */
  const need = sTop + Math.ceil(data.length / cols) * (flat ? 104 : 56) + 58;
  if (need > H) { desk.style.height = need + 'px'; H = need; bot = H - 50; }
  const out = sheet(data.map((d, i) => (i ? d : { w: d.w + 40, h: d.h + 70 })), { x: left, y: sTop, w: W - pad - left, h: bot - sTop - 8 }, cols);
  const J = rng(seed + 1), tilt = data.map(() => [(J() - 0.5) * 11, (J() - 0.5) * 12, (J() - 0.5) * 10]);
  cells.replaceChildren(...out.map((o, i) => {
    const c = document.createElement('div'); c.className = 'cell';
    Object.assign(c.style, { left: o.cell.x + 'px', top: o.cell.y + 'px', width: o.cell.w + 'px', height: o.cell.h + 'px', rotate: ((i * 37) % 9 - 4) * 0.35 + 'deg' });
    const s = document.createElement('span'); s.className = 'm mute'; s.textContent = `${o.label} · ${data[i].el.dataset.lab}`; c.append(s); return c;
  }));
  data.forEach((d, i) => gsap.set(d.el, { x: d.ax, y: d.ay, rotation: d.rot, scale: 1, zIndex: i ? 2 + (i % 7) : 5 }));
  tl = gsap.timeline({ defaults: { ease: 'expo.inOut', duration: 1 } });
  data.forEach((d, i) => tl!.to(d.el, { x: out[i].x + (i ? 0 : 20) + tilt[i][1], y: out[i].y + (i ? 0 : 35) + tilt[i][2], rotation: tilt[i][0], scale: out[i].scale }, i * 0.016));
  if (!flat) tl.to(intro, { autoAlpha: 0, y: -12, duration: 0.3, ease: 'power2.in' }, 0);
  tl.to('.cell', { opacity: 1, duration: 0.35, stagger: 0.008, ease: 'power2.out' }, 0.6)
    .fromTo(head, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power3.out' }, 0.75);
  if (flat) { tl.progress(1); progress = 1; }
  else st = ScrollTrigger.create({ trigger: desk, start: 'top top', end: '+=140%', pin: true, scrub: 1, animation: tl, onUpdate: (s) => { progress = s.progress; if (progress > 0.02) home(); } });
  desk.dataset.ready = '';
}
/* Once the morph starts, dragged pieces go back to their pins. */
function home() { if (!dragged) return; dragged = false; desk.removeAttribute('data-registered'); holds.forEach((f) => f()); data.forEach((d) => { gsap.killTweensOf(d.d); if ('stamp' in d.el.dataset) gsap.to(d.p, { scale: 1, duration: 0.4 }); gsap.to(d.d, { scale: 1, x: 0, y: 0, duration: 0.8, ease: 'power3.out' }); }); }

/* Move a piece's inner layer by screen pixels, whatever its tilt. */
const shift = (p: P, x: number, y: number, vars: gsap.TweenVars) => { const a = -p.rot * Math.PI / 180; gsap.to(p.d, { x: x * Math.cos(a) - y * Math.sin(a), y: x * Math.sin(a) + y * Math.cos(a), overwrite: true, ...vars }); };
/* Registration: when the two marks meet, they lock and the approval stamp comes down on the cover. */
function pair() {
  if (desk.hasAttribute('data-registered')) return;
  const b = data.find((p) => p.el.dataset.reg === 'b'), k = data.find((p) => p.el.dataset.reg === 'k'), s = data.find((p) => 'stamp' in p.el.dataset), c = data[0];
  if (!b || !k || !s) return;
  const mid = (p: P) => { const r = p.d.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; };
  const [bx, by] = mid(b), [kx, ky] = mid(k); if (Math.hypot(bx - kx, by - ky) > 26) return;
  desk.dataset.registered = '';
  const base = desk.getBoundingClientRect();
  shift(b, kx - base.x - b.ax - b.w / 2, ky - base.y - b.ay - b.h / 2, { duration: 0.35, ease: 'back.out(2.4)' });
  gsap.fromTo([b.p, k.p], { scale: 1 }, { scale: 1.5, duration: 0.22, repeat: 1, yoyo: true, ease: 'power2.out' });
  gsap.set(s.el, { zIndex: 30 });
  shift(s, c.ax + c.w - s.w * 0.8 - s.ax, c.ay + c.h - s.h * 0.75 - s.ay, { duration: 0.01, delay: 0.3 });
  gsap.fromTo(s.p, { scale: 3.2, opacity: 0 }, { scale: 1.25, opacity: 1, duration: 0.38, delay: 0.32, ease: 'power4.in' });
  gsap.fromTo(c.d, { scale: 1 }, { scale: 0.985, duration: 0.09, delay: 0.69, repeat: 1, yoyo: true, ease: 'power2.out' });
}
if (fine && !reduce) for (const el of frs) {
  const d = el.querySelector<HTMLElement>('.d')!, p = el.querySelector<HTMLElement>('.p')!;
  let on = false, moved = false, sx = 0, sy = 0, ox = 0, oy = 0, vx = 0, vy = 0, px = 0, py = 0, pt = 0;
  const to = (x: number, y: number, duration: number) => {
    const me = data.find((q) => q.el === el); if (!me) return;
    /* .d lives inside the rotated piece: convert screen movement to its axes after clamping. */
    const cx = gsap.utils.clamp(bounds.x - me.ax, bounds.x + bounds.w - me.w - me.ax, x), cy = gsap.utils.clamp(bounds.y - me.ay, bounds.y + bounds.h - me.h - me.ay, y);
    const a = -me.rot * Math.PI / 180;
    gsap.to(d, { x: cx * Math.cos(a) - cy * Math.sin(a), y: cx * Math.sin(a) + cy * Math.cos(a), duration, ease: 'power3.out', overwrite: true, onUpdate: el.dataset.reg ? pair : undefined });
    ux = cx; uy = cy;
  };
  let ux = 0, uy = 0;
  holds.add(() => { if (on) { on = false; gsap.to(p, { scale: 1, duration: 0.4, ease: 'power3.out' }); } });
  el.addEventListener('dragstart', (e) => e.preventDefault());
  el.addEventListener('pointerdown', (e) => {
    moved = false; if (progress > 0.02 || e.button !== 0) return;
    el.setPointerCapture(e.pointerId); /* at once: a fast flick leaves a 20px mark before the first move */
    on = true; if (!dragged) { ux = 0; uy = 0; } sx = px = e.clientX; sy = py = e.clientY; ox = ux; oy = uy; vx = vy = 0; pt = e.timeStamp;
    if (Math.abs(+gsap.getProperty(d, 'x')) < 0.5 && Math.abs(+gsap.getProperty(d, 'y')) < 0.5) ox = oy = ux = uy = 0;
    gsap.to(p, { scale: 1.05, duration: 0.3, ease: 'power3.out' });
  });
  el.addEventListener('pointermove', (e) => {
    if (!on) return;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (!moved && Math.hypot(dx, dy) > 6) { moved = dragged = true; gsap.set(el, { zIndex: 20 }); }
    if (!moved || (desk.hasAttribute('data-registered') && el.dataset.reg)) return;
    const dt = Math.max(1, e.timeStamp - pt); vx = vx * 0.6 + ((e.clientX - px) / dt) * 0.4; vy = vy * 0.6 + ((e.clientY - py) / dt) * 0.4; px = e.clientX; py = e.clientY; pt = e.timeStamp;
    to(ox + dx, oy + dy, 0.35);
  });
  const up = (e: PointerEvent) => {
    if (!on) return; on = false; gsap.to(p, { scale: 1, duration: 0.5, ease: 'back.out(2)' });
    if (!moved || progress > 0.02) return;
    const still = e.timeStamp - pt > 90, k = still ? 0 : 160;
    if (desk.hasAttribute('data-registered') && el.dataset.reg) return;
    to(ox + e.clientX - sx + gsap.utils.clamp(-2, 2, vx) * k, oy + e.clientY - sy + gsap.utils.clamp(-2, 2, vy) * k, 0.9);
  };
  el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
  el.addEventListener('click', (e) => { if (moved) { e.preventDefault(); moved = false; } });
}
if (fine && !reduce) {
  let mx = 0, my = 0, x = 0, y = 0;
  desk.addEventListener('pointermove', (e) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; });
  gsap.ticker.add(() => {
    if (!st?.isActive && scrollY > innerHeight * 2.5) return;
    const k = 1 - Math.min(progress * 3, 1); x += (mx * k - x) * 0.08; y += (my * k - y) * 0.08;
    const t = gsap.ticker.time;
    data.forEach((d, i) => gsap.set(d.p, { x: -x * d.dep * 16, y: -y * d.dep * 11, rotation: i ? Math.sin(t * (0.7 + (i % 5) * 0.12) + i) * 1.6 * k : 0 }));
  });
}
let lw = innerWidth, lh = innerHeight, rt = 0;
addEventListener('resize', () => {
  /* Touch browsers change height when the address bar hides; that is not a relayout. */
  if (innerWidth === lw && (innerHeight === lh || !fine)) return; lw = innerWidth; lh = innerHeight; clearTimeout(rt);
  rt = window.setTimeout(() => { st?.kill(true); tl?.kill(); st = null; gsap.set(frs, { clearProps: 'transform' }); gsap.set('.d', { x: 0, y: 0 }); gsap.set([intro, head], { clearProps: 'all' }); progress = 0; dragged = false; build(); ScrollTrigger.refresh(); }, 250);
});
const KEY = 'wall-y', nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
const store = { get: () => { try { return sessionStorage.getItem(KEY); } catch { return null; } }, set: (v: string) => { try { sessionStorage.setItem(KEY, v); } catch { /* private mode */ } } };
addEventListener('pagehide', () => store.set(String(scrollY)));
document.fonts.ready.then(() => {
  build(); ScrollTrigger.refresh();
  /* The pin spacer appears only now, so put the page back where the visitor was. */
  const back = nav && nav.type !== 'navigate' ? Number(store.get()) : 0;
  if (back > 0) scroller.to(back, false); else if (location.hash) scroller.section(location.hash.slice(1), false);
  if (!flat && scrollY < 40) {
    const rest = data.slice(1); /* the cover is already painted: never fade it */
    /* Pieces get pinned one by one. */
    gsap.from(rest.map((d) => d.p), { scale: 1.7, duration: 0.6, ease: 'expo.out', stagger: { each: 0.045, from: 'random' } });
    gsap.from(rest.map((d) => d.p), { opacity: 0, duration: 0.25, ease: 'power1.out', stagger: { each: 0.045, from: 'random' }, clearProps: 'opacity' });
  }
});
