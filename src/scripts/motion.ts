import { reveal, words } from './reveal';
import './loose';
words(); reveal();
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
if (!reduce) {
  /* Ticker leans into the scroll: faster while you move, back to its own pace when you stop. */
  const tk = document.querySelector('.ticker div')?.getAnimations()[0];
  if (tk) { let last = scrollY, v = 0, on = 0; const step = () => { const d = scrollY - last; last = scrollY; v += (Math.min(60, Math.abs(d)) - v) * 0.12; tk.playbackRate = (d < 0 ? -1 : 1) * (1 + v * 0.22); on = v > 0.15 ? requestAnimationFrame(step) : 0; if (!on) tk.playbackRate = 1; }; addEventListener('scroll', () => { if (!on) { v = Math.max(v, 0.3); on = requestAnimationFrame(step); } }, { passive: true }); }
}
if (fine && !reduce) {
  /* Links lean towards the pointer, 6px at most. */
  addEventListener('pointermove', (e) => {
    const g = (e.target as Element).closest?.<HTMLElement>('.dclose, nav a'); if (!g) return;
    if (!g.dataset.mag) { g.dataset.mag = '1'; g.addEventListener('pointerleave', () => { g.style.translate = ''; }); }
    const r = g.getBoundingClientRect(), k = (v: number) => Math.max(-6, Math.min(6, v * 0.18));
    g.style.translate = `${k(e.clientX - r.x - r.width / 2)}px ${k(e.clientY - r.y - r.height / 2)}px`;
  });
}
