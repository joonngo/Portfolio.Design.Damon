import { test, expect } from './util';
import AxeBuilder from '@axe-core/playwright';
const pages = ['', 'work/milano-coffee/', 'work/shinsho-ramen/', '404.html'];
for (const p of pages) test(`page ${p || 'home'}`, async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(p); await page.waitForTimeout(300);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  for (const n of ['Work', 'About', 'Contact']) {
    const b = (await page.locator('header').getByRole('link', { name: n, exact: true }).boundingBox())!;
    expect(b.height).toBeGreaterThanOrEqual(44);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
  expect(await page.locator('h1').count()).toBe(1);
  for (const scheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
    const r = await new AxeBuilder({ page }).analyze();
    expect(r.violations.filter((v) => ['serious', 'critical'].includes(v.impact!)).map((v) => `${scheme} ${v.id}: ${v.nodes.map((n) => n.target).join(' | ')}`)).toEqual([]);
  }
});
test('Saigon clock runs', async ({ page }) => {
  await page.goto(''); const c = page.locator('[data-clock]').last();
  await expect(c).toHaveText(/Sài Gòn \d\d:\d\d:\d\d/);
  const a = await c.textContent(); await page.waitForTimeout(1300); expect(await c.textContent()).not.toBe(a);
});
test('no js: hero and work readable', async ({ browser }) => {
  const c = await browser.newContext({ javaScriptEnabled: false }); const page = await c.newPage();
  await page.goto('http://localhost:4401/Portfolio.Design.Damon/');
  await expect(page.locator('#intro')).toBeVisible(); await expect(page.locator('.row')).toHaveCount(5);
  await page.goto('http://localhost:4401/Portfolio.Design.Damon/');
  await expect(page.getByText('ngothong777@gmail.com').first()).toBeVisible(); await c.close();
});
test('404 for unknown path', async ({ page, errors }) => { const r = await page.goto('nope/'); expect(r!.status()).toBe(404); errors.length = 0; });
test('sections are loose but never spill sideways', async ({ page }) => {
  await page.goto(''); await page.waitForSelector('#desk[data-ready]'); await page.evaluate(() => scrollTo(0, 1e6)); await page.waitForTimeout(800);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
  for (const s of ['#about', '#contact', 'footer']) expect(await page.locator(`${s} [data-loose]`).count()).toBeGreaterThan(2);
  for (const b of await page.locator('#contact .opts button:visible').all()) { const r = (await b.boundingBox())!; expect(r.height).toBeGreaterThanOrEqual(44); expect(r.x).toBeGreaterThanOrEqual(0); expect(r.x + r.width).toBeLessThanOrEqual(page.viewportSize()!.width); }
});
