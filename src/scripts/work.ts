const bs = [...document.querySelectorAll<HTMLButtonElement>('.filter button')], ps = [...document.querySelectorAll<HTMLElement>('.proj')];
bs.forEach((b) => b.addEventListener('click', () => {
  const f = b.dataset.f!; bs.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  ps.forEach((p) => { p.hidden = f !== 'All' && !p.dataset.tags!.split(' ').includes(f); });
  document.querySelector('.projs')!.classList.toggle('some', f !== 'All');
}));
