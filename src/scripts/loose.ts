/* Loose things: they drift at their own pace while you scroll, and a mouse can toss them. */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
const drift = [...document.querySelectorAll<HTMLElement>('[data-par]')];
if (!reduce && drift.length) {
  const seen = new Set<HTMLElement>(), now = new WeakMap<HTMLElement, number>(); let raf = 0;
  const step = () => { raf = 0; const lim = innerWidth > 900 ? 70 : 18; const boxes = [...seen].map((e) => [e, e.getBoundingClientRect()] as const); for (const [e, r] of boxes) { const c = r.top + r.height / 2 - (now.get(e) ?? 0), y = Math.max(-lim, Math.min(lim, (c - innerHeight / 2) * Number(e.dataset.par))); now.set(e, y); e.style.translate = `0 ${y.toFixed(1)}px`; } };
  const ask = () => { raf ||= requestAnimationFrame(step); };
  const io = new IntersectionObserver((l) => { l.forEach((x) => (x.isIntersecting ? seen.add(x.target as HTMLElement) : seen.delete(x.target as HTMLElement))); ask(); }, { rootMargin: '160px 0px' });
  drift.forEach((e) => io.observe(e)); addEventListener('scroll', ask, { passive: true });
}
export function toss(root: ParentNode = document) {
  if (!fine || reduce) return;
  let top = 30;
  root.querySelectorAll<HTMLElement>('[data-toss]').forEach((el) => {
    if (el.dataset.tossed) return; el.dataset.tossed = '1';
    let on = false, moved = false, x = 0, y = 0, sx = 0, sy = 0, vx = 0, vy = 0, px = 0, py = 0, pt = 0, raf = 0;
    const put = () => { el.style.transition = 'rotate .5s'; el.style.transform = `translate(${x}px,${y}px)`; };
    el.addEventListener('dragstart', (e) => e.preventDefault());
    el.addEventListener('pointerdown', (e) => { if (e.button || (e.target as Element).closest('.go')) return; moved = false; on = true; cancelAnimationFrame(raf); sx = e.clientX - x; sy = e.clientY - y; px = e.clientX; py = e.clientY; pt = e.timeStamp; vx = vy = 0; });
    el.addEventListener('pointermove', (e) => {
      if (!on) return; const nx = e.clientX - sx, ny = e.clientY - sy;
      if (!moved) { if (Math.hypot(nx - x, ny - y) < 7) return; moved = true; el.setPointerCapture(e.pointerId); el.style.zIndex = String(++top); }
      const dt = Math.max(1, e.timeStamp - pt); vx = vx * 0.6 + ((e.clientX - px) / dt) * 0.4; vy = vy * 0.6 + ((e.clientY - py) / dt) * 0.4; px = e.clientX; py = e.clientY; pt = e.timeStamp; x = nx; y = ny; put();
    });
    const up = (e: PointerEvent) => {
      if (!on) return; on = false; if (!moved || e.timeStamp - pt > 90) return; let last = performance.now();
      const glide = (t: number) => { const dt = Math.min(32, t - last); last = t; x += vx * dt; y += vy * dt; vx *= Math.pow(0.994, dt); vy *= Math.pow(0.994, dt); const r = el.getBoundingClientRect(); if ((r.left < 4 && vx < 0) || (r.right > innerWidth - 4 && vx > 0)) vx *= -0.35; put(); if (Math.hypot(vx, vy) > 0.02) raf = requestAnimationFrame(glide); };
      vx = Math.max(-1.6, Math.min(1.6, vx)); vy = Math.max(-1.6, Math.min(1.6, vy)); raf = requestAnimationFrame(glide);
    };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', () => { on = false; });
    el.addEventListener('click', (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
  });
}
toss();
