/* Arms [data-rv] blocks once they enter the view. CSS holds the motion; without JS or with reduced motion nothing is hidden. */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const seen = new WeakMap<object, IntersectionObserver>();
export function reveal(root: ParentNode = document) {
  const els = [...root.querySelectorAll<HTMLElement>('[data-rv]:not(.in)')];
  if (reduce) { els.forEach((e) => e.classList.add('in')); return; }
  let io = seen.get(root);
  if (!io) {
    /* The tall top margin counts anything already scrolled past as seen. */
    io = new IntersectionObserver((list, me) => list.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('in'); me.unobserve(x.target); } }), { root: root instanceof Element ? root : null, rootMargin: '100000px 0px -6% 0px' });
    seen.set(root, io);
  }
  els.forEach((e) => io.observe(e));
}
/* Wrap each word so a headline can rise from behind its own line. */
export function words(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-rv=text]').forEach((h) => {
    if (h.dataset.split) return; h.dataset.split = '1'; let n = 0;
    const walk = (node: Node) => [...node.childNodes].forEach((c) => {
      if (c.nodeType !== 3) { walk(c); return; }
      const f = document.createDocumentFragment();
      (c.textContent ?? '').split(/(\s+)/).forEach((w) => { if (!w.trim()) { f.append(w); return; } const o = document.createElement('span'), i = document.createElement('span'); o.className = 'rvw'; i.className = 'rvc'; i.textContent = w; i.style.setProperty('--i', String(n++)); o.append(i); f.append(o); });
      c.replaceWith(f);
    });
    walk(h);
  });
}
