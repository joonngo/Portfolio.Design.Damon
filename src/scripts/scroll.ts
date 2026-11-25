import type Lenis from 'lenis';
/* One place that moves the page, so menu, overlay and Lenis agree. */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
let lenis: Lenis | null = null;
export const scroller = {
  use(l: Lenis) { lenis = l; },
  to(y: number, smooth = true) {
    lenis?.resize();
    if (lenis) lenis.scrollTo(y, smooth ? { duration: 1.3, easing: (t) => 1 - Math.pow(1 - t, 4) } : { immediate: true, force: true });
    else scrollTo({ top: y, behavior: smooth && !reduce ? 'smooth' : 'instant' });
  },
  section(id: string, smooth = true) { const el = document.getElementById(id); if (!el) return; this.to(Math.max(0, el.getBoundingClientRect().top + scrollY - 60), smooth); if (smooth) el.focus({ preventScroll: true }); },
  lock(on: boolean) { document.documentElement.classList.toggle('modal', on); if (on) lenis?.stop(); else lenis?.start(); },
};
