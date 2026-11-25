import { scroller } from './scroll';
import { BASE } from '../lib/base.mjs';
const home = location.pathname === BASE;
const links = [...document.querySelectorAll<HTMLAnchorElement>('header nav a')];
if (home) {
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest?.('a'); if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const u = new URL(a.href, location.href); if (u.origin !== location.origin || u.pathname !== BASE) return;
    if (u.hash && !document.getElementById(u.hash.slice(1))) return;
    if (a.classList.contains('skip')) return;
    e.preventDefault(); if (u.href !== location.href) history.pushState(null, '', BASE + u.hash);
    if (a.dataset.project) document.dispatchEvent(new CustomEvent('pick-project', { detail: a.dataset.project }));
    if (u.hash) scroller.section(u.hash.slice(1)); else scroller.to(0);
  });
  let hash = location.hash;
  addEventListener('popstate', () => { if (location.pathname === BASE && location.hash !== hash) { hash = location.hash; if (hash && !document.querySelector('dialog[open]')) scroller.section(hash.slice(1)); } });
  const secs = links.map((l) => document.getElementById(new URL(l.href).hash.slice(1))!);
  let q = false;
  const mark = () => { q = false; let on = -1; secs.forEach((s, i) => { if (s.getBoundingClientRect().top < innerHeight * 0.4) on = i; }); if (scrollY + innerHeight > document.documentElement.scrollHeight - 8) on = secs.length - 1; links.forEach((l, i) => (i === on ? l.setAttribute('aria-current', 'true') : l.removeAttribute('aria-current'))); };
  addEventListener('scroll', () => { if (!q) { q = true; requestAnimationFrame(mark); } }, { passive: true }); mark();
}
