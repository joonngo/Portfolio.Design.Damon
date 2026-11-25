import { test, expect } from './util';
test('five rows in order', async ({ page }) => {
  await page.goto('');
  await expect(page.locator('.row .c')).toHaveText(['Milano Coffee', 'Shinsho Ramen', 'Gong Cha', 'MOVE', 'Chạm kem bơ']);
  await expect(page.locator('.arch li')).toHaveCount(4);
  for (const r of await page.locator('.row').all()) expect((await r.boundingBox())!.height).toBeGreaterThanOrEqual(44);
});
test('Vietnamese name whole and linked', async ({ page }) => {
  await page.goto(''); const c = page.locator('.row').last();
  expect(await c.getAttribute('href')).toMatch(/\/work\/cham-kem-bo\/$/);
  const f = await page.evaluate(async () => { await document.fonts.ready; const e = document.querySelectorAll('.proj')[4].querySelector('[lang=vi]')!; const s = getComputedStyle(e); return [s.fontFamily, [...document.fonts].some((x) => x.family.includes('Hanken') && x.status === 'loaded')]; });
  expect(String(f[0])).toContain('Hanken'); expect(f[1]).toBe(true);
});
test('no proof sheets left', async ({ page }) => { await page.goto(''); await expect(page.locator('.row .face img')).toHaveCount(5); await expect(page.locator('#wall .sw .fpo')).toHaveCount(0); });
test('every project has a face', async ({ page }) => {
  await page.goto(''); const n = await page.locator('.row .face').evaluateAll((l) => l.filter((e) => e.getBoundingClientRect().height > 100).length); expect(n).toBe(5);
});
test('availability visible on the first screen', async ({ page }) => { await page.goto(''); await page.waitForSelector('#desk[data-ready]'); expect(await page.getByText('Available for freelance').evaluateAll((l) => l.filter((e) => { const r = e.getBoundingClientRect(); return r.width && r.bottom < innerHeight; }).length)).toBe(1); });
test('Milano cover is a real, uncropped image', async ({ page }) => {
  await page.goto('work/milano-coffee/'); const i = page.locator('.cover img'); await expect(i).toBeVisible();
  const r = await i.evaluate((e: HTMLImageElement) => { const b = e.getBoundingClientRect(); return [b.width / b.height, e.naturalWidth / e.naturalHeight]; }); expect(Math.abs(r[0] - r[1])).toBeLessThan(0.02);
});
test('hero cover keeps its ratio', async ({ page }) => { await page.goto(''); await page.waitForSelector('#desk[data-ready]'); const r = await page.locator('.big img').evaluate((e: HTMLElement) => e.offsetWidth / e.offsetHeight); expect(Math.abs(r - 2000 / 1125)).toBeLessThan(0.03); });
test('portrait in About', async ({ page }) => { await page.goto('#about'); await expect(page.locator('#about img')).toHaveAttribute('alt', /Damon Ngo/); });
