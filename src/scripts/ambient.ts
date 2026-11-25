import { scroller } from './scroll';
const $$ = <T extends HTMLElement>(s: string) => [...document.querySelectorAll<T>(s)];
const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Ho_Chi_Minh', hour: '2-digit', minute: '2-digit', second: '2-digit' });
const clocks = $$('[data-clock]');
const tick = () => { const t = 'Sài Gòn ' + fmt.format(new Date()); clocks.forEach((c) => (c.textContent = t)); };
tick(); setInterval(tick, 1000);

const bar = document.querySelector<HTMLElement>('.bar')!;
let q = false;
const prog = () => { q = false; const m = document.documentElement.scrollHeight - innerHeight; bar.style.transform = `scaleX(${m > 0 ? Math.min(1, scrollY / m) : 0})`; };
addEventListener('scroll', () => { if (!q) { q = true; requestAnimationFrame(prog); } }, { passive: true }); prog();

const fine = matchMedia('(hover:hover) and (pointer:fine)').matches, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (fine && !reduce) {
  const cur = document.querySelector<HTMLElement>('#cur')!, lab = cur.querySelector('span')!;
  let mx = 0, my = 0, lx = 0, ly = 0, live = false, raf = 0;
  const loop = () => { lx += (mx - lx) * 0.28; ly += (my - ly) * 0.28; cur.style.transform = `translate(${lx - 4.5}px,${ly - 4.5}px)`; raf = Math.abs(mx - lx) + Math.abs(my - ly) > 0.1 ? requestAnimationFrame(loop) : 0; };
  addEventListener('pointermove', (e) => {
    mx = e.clientX; my = e.clientY;
    if (!live) { live = true; lx = mx; ly = my; document.documentElement.classList.add('cursor'); }
    if (!raf) raf = requestAnimationFrame(loop);
    const t = (e.target as Element).closest?.<HTMLElement>('[data-cur]');
    const text = t?.dataset.cur ?? '';
    if (lab.textContent !== text) { lab.textContent = text; cur.classList.toggle('on', !!text); }
  });
  document.documentElement.addEventListener('pointerleave', () => document.documentElement.classList.remove('cursor'));
  document.documentElement.addEventListener('pointerenter', () => live && document.documentElement.classList.add('cursor'));
  import('lenis').then(({ default: Lenis }) => scroller.use(new Lenis({ lerp: 0.1, autoRaf: true })));
}
