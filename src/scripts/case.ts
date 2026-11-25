import { scroller } from './scroll';
import { reveal, words } from './reveal';
import { toss } from './loose';
const dlg = document.querySelector<HTMLDialogElement>('#case')!, body = dlg.querySelector<HTMLElement>('#caseBody')!, name = dlg.querySelector<HTMLElement>('#caseName')!, cur = document.querySelector('#cur')!;
const homeTitle = document.title, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
let ticket = 0, busy = false, from = '', closing: Animation | null = null, backY = 0;
/* The page opens out of the picture that was clicked. */
const rectOf = (a: Element) => { const el = [a.querySelector('.face'), a].find((e) => e && e.getBoundingClientRect().height > 40) as Element | undefined; if (!el) return ''; const r = el.getBoundingClientRect(); return `inset(${Math.max(0, r.top)}px ${Math.max(0, innerWidth - r.right)}px ${Math.max(0, innerHeight - r.bottom)}px ${Math.max(0, r.left)}px)`; };
const isCase = (u: URL) => u.origin === location.origin && /\/work\/[^/]+\/$/.test(u.pathname);
async function show(url: string, push: 'push' | 'replace' | 'none') {
  const my = ++ticket; busy = true;
  try {
    const r = await fetch(url); if (!r.ok) throw new Error(String(r.status));
    const doc = new DOMParser().parseFromString(await r.text(), 'text/html'), art = doc.querySelector('article.case');
    if (!art) throw new Error('no article');
    if (my !== ticket) return;
    body.replaceChildren(document.importNode(art, true)); body.querySelector('.cov')?.classList.add('in'); body.scrollTop = 0; words(body); document.title = doc.title;
    name.textContent = doc.querySelector('h1')!.textContent; name.lang = doc.querySelector('h1 [lang=vi]') ? 'vi' : 'en';
    dlg.style.setProperty('--bar', doc.body.style.getPropertyValue('--bar') || 'var(--accent)');
    /* We put the page back ourselves: with a #section in the URL the browser would jump to it. */
    if (!dlg.open) { backY = scrollY; history.scrollRestoration = 'manual'; }
    if (push === 'push') history.pushState({ case: true }, '', url); else if (push === 'replace') history.replaceState({ case: true }, '', url);
    const again = !!closing; if (closing) { closing.onfinish = null; closing.cancel(); closing = null; }
    if (again) scroller.lock(true);
    if (!dlg.open) {
      dlg.showModal(); dlg.append(cur); cur.querySelector('span')!.textContent = ''; cur.classList.remove('on'); scroller.lock(true);
      if (!reduce) dlg.animate([{ clipPath: from || 'inset(100% 0 0 0)' }, { clipPath: 'inset(0)' }], { duration: 850, easing: 'cubic-bezier(.76,0,.18,1)' });
      from = '';
    } else if (!reduce) body.animate([{ clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0)' }], { duration: 600, easing: 'cubic-bezier(.16,1,.3,1)' });
    reveal(body); toss(body);
  } catch { if (my === ticket) location.href = url; } finally { if (my === ticket) busy = false; }
}
function hide() { ticket++; busy = false; document.title = homeTitle; if (!dlg.open || closing) return; scroller.lock(false); scroller.to(backY, false); const end = () => { closing = null; document.body.append(cur); const y = scrollY; dlg.close(); /* close() refocuses the opener and may scroll to it */ if (Math.abs(scrollY - y) > 1) scroller.to(y, false); history.scrollRestoration = 'auto'; body.replaceChildren(); }; if (reduce) { end(); return; } closing = dlg.animate([{ clipPath: 'inset(0)' }, { clipPath: 'inset(0 0 100% 0)' }], { duration: 420, easing: 'cubic-bezier(.7,0,.2,1)', fill: 'forwards' }); closing.onfinish = () => { const c = closing; end(); c?.cancel(); }; }
document.addEventListener('click', (e) => {
  const a = (e.target as Element).closest?.('a'); if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const u = new URL(a.href, location.href); if (!isCase(u)) return;
  e.preventDefault(); if (!busy) { from = dlg.open ? '' : rectOf(a); show(u.href, dlg.open && !closing ? 'replace' : 'push'); }
});
const leave = () => history.back();
/* CTA inside the overlay: step back to the page, then go to the form with the type picked. */
let after: (() => void) | null = null;
body.addEventListener('click', (e) => {
  const a = (e.target as Element).closest<HTMLAnchorElement>('#cta a'); if (!a || e.metaKey || e.ctrlKey) return;
  e.preventDefault(); e.stopPropagation(); const type = a.dataset.project ?? '';
  after = () => setTimeout(() => { if (type) document.dispatchEvent(new CustomEvent('pick-project', { detail: type })); history.pushState(null, '', '#contact'); scroller.section('contact'); }, 80);
  leave();
});
dlg.querySelector('.dclose')!.addEventListener('click', leave);
dlg.addEventListener('cancel', (e) => { e.preventDefault(); leave(); });
addEventListener('popstate', () => { if (isCase(new URL(location.href))) show(location.href, 'none'); else { hide(); after?.(); after = null; } });
