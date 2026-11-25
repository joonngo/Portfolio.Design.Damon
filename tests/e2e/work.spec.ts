import { test, expect } from './util';
test('five rows in order', async ({ page }) => {
  await page.goto('');
  await expect(page.locator('.row .c')).toHaveText(['Milano Coffee', 'Shinsho Ramen', 'Gong Cha', 'MOVE', 'Chạm kem bơ']);
  await expect(page.locator('.arch li')).toHaveCount(4);
  for (const r of await page.locator('.row').all()) expect((await r.boundingBox())!.height).toBeGreaterThanOrEqual(44);
});
test('prints lie at different angles and sizes; hover straightens', async ({ page, isMobile }) => {
  await page.goto(''); const a = await page.locator('.row').evaluateAll((l) => l.map((e) => [getComputedStyle(e).rotate, Math.round((e as HTMLElement).offsetWidth)].join()));
  expect(new Set(a).size).toBe(5); expect(a.every((x) => !x.startsWith('none'))).toBe(true);
  if (isMobile) return; const r = page.locator('.row').nth(1); await r.scrollIntoViewIfNeeded(); await page.waitForTimeout(1600); await r.hover(); await expect(r).toHaveCSS('rotate', /^(0deg|none)$/);
});
test('no two prints hide a caption', async ({ page }) => {
  await page.goto(''); await page.locator('.row').last().scrollIntoViewIfNeeded(); await page.waitForTimeout(1500);
  const bad = await page.evaluate(() => { const rows = [...document.querySelectorAll('.row')], R = (e: Element) => e.getBoundingClientRect(); return rows.flatMap((r) => { const c = R(r.querySelector('.c')!); return rows.filter((o) => o !== r).filter((o) => { const f = R(o.querySelector('.face')!); const w = Math.min(c.right, f.right) - Math.max(c.left, f.left), h = Math.min(c.bottom, f.bottom) - Math.max(c.top, f.top); return w > c.width * 0.35 && h > c.height * 0.5; }).map(() => r.textContent!.trim().slice(0, 20)); }); });
  expect(bad).toEqual([]);
});
test('a print can be tossed without opening', async ({ page, isMobile }) => {
  test.skip(!!isMobile); await page.goto(''); const r = page.locator('.row').nth(1); await r.scrollIntoViewIfNeeded(); await page.waitForTimeout(1800);
  const b = (await r.boundingBox())!; const x = b.x + b.width / 2, y = b.y + 80; await page.mouse.move(x, y); await page.mouse.down(); await page.mouse.move(x - 120, y + 40, { steps: 8 }); await page.mouse.up(); await page.waitForTimeout(1100);
  const a = (await r.boundingBox())!; expect(b.x - a.x).toBeGreaterThan(60); expect(page.url()).not.toContain('/work/');
});
test('Vietnamese name whole and linked', async ({ page }) => {
  await page.goto(''); const c = page.locator('.row').last();
  expect(await c.getAttribute('href')).toMatch(/\/work\/cham-kem-bo\/$/);
  const f = await page.evaluate(async () => { await document.fonts.ready; const e = document.querySelectorAll('.row')[4].querySelector('[lang=vi]')!; const s = getComputedStyle(e); return [s.fontFamily, [...document.fonts].some((x) => x.family.includes('Hanken') && x.status === 'loaded')]; });
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
