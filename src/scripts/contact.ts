import { mailto, plain, validate, type Answers } from '../lib/contact';
const root = document.querySelector<HTMLElement>('#flow')!, form = root.querySelector('form')!, log = root.querySelector('#log')!, status = root.querySelector<HTMLElement>('#status')!;
const sets = [...form.querySelectorAll<HTMLFieldSetElement>('fieldset')], back = form.querySelector<HTMLButtonElement>('.back')!, send = form.querySelector<HTMLButtonElement>('.send')!;
const pick: Record<string, string> = { project: '', budget: '', timeline: '' };
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
let at = 0, busy = false;
const draw = (focus = true) => {
  sets.forEach((s, i) => (s.hidden = i !== at)); back.hidden = at === 0; status.textContent = '';
  log.replaceChildren(...sets.slice(0, at).map((s) => { const li = document.createElement('li'); li.textContent = `${s.querySelector('legend')!.textContent} ${pick[s.dataset.step!]}`; return li; }));
  if (focus && !calm) sets[at].animate([{ transform: 'translateX(36px)', clipPath: 'inset(0 0 0 100%)' }, { transform: 'none', clipPath: 'inset(0)' }], { duration: 560, easing: 'cubic-bezier(.16,1,.3,1)' });
  if (focus) sets[at].querySelector<HTMLElement>('legend')!.focus();
};
sets.slice(0, 3).forEach((s) => s.addEventListener('click', (e) => {
  const b = (e.target as Element).closest('button'); if (!b || e.detail > 1) return;
  pick[s.dataset.step!] = b.value; s.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); at++; draw();
}));
back.addEventListener('click', () => { at--; draw(); });
form.addEventListener('keydown', (e) => { if (e.key === 'Enter' && (e.target as Element).matches('input')) { e.preventDefault(); form.requestSubmit(); } });
const say = (text: string, link?: string) => { status.textContent = text; if (link) { const a = document.createElement('a'); a.href = link; a.textContent = 'Open the email draft'; status.append(' ', a); } };
const copy = (text: string) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'copy m'; b.textContent = 'Copy answers'; b.addEventListener('click', async () => { try { await navigator.clipboard.writeText(text); b.textContent = 'Copied'; } catch { b.textContent = 'Copy is blocked here'; } }); status.append(' ', b); };
form.addEventListener('submit', async (e) => {
  e.preventDefault(); if (busy) return;
  const f = new FormData(form); if (f.get('_gotcha')) return;
  const a = { ...pick, message: f.get('message'), name: f.get('name'), email: f.get('email') } as Answers, err = validate(a);
  (['message', 'name', 'email'] as const).forEach((k) => { root.querySelector(`#e-${k}`)!.textContent = err[k] ?? ''; (form.elements.namedItem(k) as HTMLElement).setAttribute('aria-invalid', String(!!err[k])); });
  const first = (['message', 'name', 'email'] as const).find((k) => err[k]); if (first) { (form.elements.namedItem(first) as HTMLElement).focus(); return; }
  const url = root.dataset.endpoint, draft = mailto(a, root.dataset.to!);
  if (!url) { say(`Your answers are ready to email to ${root.dataset.to}.`, draft); copy(plain(a)); location.href = draft; return; }
  busy = true; send.disabled = true; say('Sending…');
  try {
    const r = await fetch(url, { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(a), signal: AbortSignal.timeout(15000) });
    if (!r.ok) throw new Error(String(r.status));
    form.hidden = true; say('Got it. I will reply to ' + a.email + '.');
  } catch { say('That did not go through. Your answers are still here, so try again or email me.', draft); copy(plain(a)); busy = false; send.disabled = false; }
});
const preset = (v: string) => { const b = [...sets[0].querySelectorAll('button')].find((x) => x.value === v); if (!b) return; pick.project = v; sets[0].querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); if (at === 0) at = 1; draw(false); };
document.addEventListener('pick-project', (e) => preset((e as CustomEvent<string>).detail));
root.dataset.ready = ''; draw(false); preset(new URLSearchParams(location.search).get('project') ?? '');
