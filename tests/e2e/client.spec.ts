import { test, expect, ready } from './util';
const inView = (l: any) => l.evaluate((e: Element) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.top >= 0 && r.bottom <= innerHeight + 1; });
test('first screen answers who, what, and how to hire', async ({ page }) => {
  await page.goto(''); await ready(page); await page.waitForTimeout(800);
  const h = page.locator('h1'); await expect(h).toContainText('brand, packaging and campaigns'); expect(await inView(h)).toBe(true);
  expect(await h.evaluate((e) => parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(34);
  await expect(page.locator('#intro')).toContainText('Damon Ngo'); await expect(page.locator('#intro')).toContainText('MOVE');
  const c = page.locator('#intro').getByRole('link', { name: 'Start a project' }); expect(await inView(c)).toBe(true); expect((await c.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  expect(await page.locator('.frag').evaluateAll((l) => l.filter((e) => (e as HTMLElement).offsetParent).length)).toBeLessThanOrEqual(10);
});
test('hero text stays readable through the morph', async ({ page }) => { await page.goto(''); await ready(page); await page.evaluate(() => scrollTo(0, innerHeight * 0.45)); await page.waitForTimeout(1800); await expect(page.locator('h1')).toBeVisible(); expect(await page.locator('#intro').evaluate((e) => getComputedStyle(e).opacity)).toBe('1'); });
test('hire button follows on every screen', async ({ page }) => { await page.goto(''); await ready(page); for (const y of [1500, 3500, 6000]) { await page.evaluate((v) => scrollTo(0, v), y); await page.waitForTimeout(400); expect(await inView(page.locator('header').getByRole('link', { name: 'Start a project' }))).toBe(true); } });
test('nothing outside the hero is tilted', async ({ page }) => { await page.goto(''); await ready(page); expect(await page.evaluate(() => [...document.querySelectorAll('main > section:not(#desk) *, footer *, header *')].filter((e) => { const s = getComputedStyle(e); return s.rotate !== 'none' && s.rotate !== '0deg'; }).map((e) => e.className || e.tagName))).toEqual([]); });
test('filter work by what the client needs', async ({ page }) => {
  await page.goto(''); const shown = () => page.locator('.proj:visible .c').allTextContents();
  await page.getByRole('button', { name: 'Campaign', exact: true }).first().click(); expect((await shown()).map((x) => x.trim())).toEqual(['Milano Coffee', 'Gong Cha']);
  await page.getByRole('button', { name: 'Packaging', exact: true }).first().click(); expect((await shown()).length).toBe(3);
  await page.getByRole('button', { name: 'All', exact: true }).click(); expect((await shown()).length).toBe(5);
});
test('services lead to a prefilled form', async ({ page }) => { await page.goto(''); await ready(page); await page.locator('#services').getByRole('link', { name: 'Ask about packaging' }).click(); await expect(page.locator('#log')).toContainText('Packaging'); await expect.poll(() => page.evaluate(() => Math.abs(document.getElementById('contact')!.getBoundingClientRect().top)), { timeout: 6000 }).toBeLessThan(110); });
test('case overlay keeps the hire button in reach', async ({ page }) => { await page.goto(''); await ready(page); await page.locator('.proj a.row').nth(3).click(); const d = page.locator('dialog#case'); const b = d.locator('.dbar').getByRole('link', { name: 'Start a project' }); await expect(b).toBeVisible(); await b.click(); await expect(d).toBeHidden(); await expect(page.locator('#log')).toContainText('Brand'); });
test('two taps from landing to the form', async ({ page }) => { await page.goto(''); await ready(page); await page.locator('header').getByRole('link', { name: 'Start a project' }).click(); await expect.poll(() => page.evaluate(() => Math.abs(document.getElementById('contact')!.getBoundingClientRect().top)), { timeout: 6000 }).toBeLessThan(110); await page.locator('#flow').getByRole('button', { name: 'Brand', exact: true }).click(); await expect(page.locator('legend', { hasText: 'Rough budget?' })).toBeVisible(); });
