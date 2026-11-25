import { test, expect, ready } from './util';
import type { Page } from '@playwright/test';
const end = async (p: Page) => { await p.evaluate(() => { const d = document.querySelector('#desk')!.parentElement!; window.scrollTo(0, d.getBoundingClientRect().top + scrollY + innerHeight * 1.39); }); await p.waitForTimeout(2600); };
const strays = (p: Page) => p.evaluate(() => {
  const cells = [...document.querySelectorAll('.cell')].map((c) => c.getBoundingClientRect());
  return [...document.querySelectorAll<HTMLElement>('.frag')].filter((f) => f.offsetParent).map((f, i) => { const r = f.getBoundingClientRect(), x = r.x + r.width / 2, y = r.y + r.height / 2, c = cells[i]; return c && x > c.left && x < c.right && y > c.top && y < c.bottom ? '' : `${i}`; }).filter(Boolean);
});
test('start: cover clear of intro and header', async ({ page }) => {
  await page.goto(''); await ready(page); await page.waitForTimeout(1800);
  const bad = await page.evaluate(() => {
    const b = (s: string) => document.querySelector(s)!.getBoundingClientRect();
    const fr = [...document.querySelectorAll<HTMLElement>('.frag')].filter((f) => f.offsetParent).map((f) => f.getBoundingClientRect());
    const hit = (a: DOMRect, c: DOMRect) => a.left < c.right && a.right > c.left && a.top < c.bottom && a.bottom > c.top;
    return fr.filter((f) => hit(f, b('#intro')) || hit(f, b('header'))).length;
  });
  expect(bad).toBe(0);
});
test('end: every piece in its cell', async ({ page }) => {
  await page.goto(''); await ready(page); await page.waitForTimeout(1200); await end(page);
  expect(await strays(page)).toEqual([]);
  await expect(page.getByRole('heading', { name: 'Selected, 05' })).toBeVisible();
});
test('piece count', async ({ page, isMobile }) => {
  await page.goto(''); await ready(page);
  const n = await page.evaluate(() => [...document.querySelectorAll<HTMLElement>('.frag')].filter((f) => f.offsetParent).length);
  if (isMobile) { expect(n).toBeGreaterThanOrEqual(14); expect(n).toBeLessThanOrEqual(16); } else expect(n).toBeGreaterThanOrEqual(20);
});
test('reduced motion: sheet at once, no pin', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' }); await page.goto(''); await ready(page);
  expect(await strays(page)).toEqual([]); expect(await page.locator('.pin-spacer').count()).toBe(0);
});
test('drag moves without opening; click opens', async ({ page, isMobile }) => {
  test.skip(!!isMobile); await page.goto(''); await ready(page); await page.waitForTimeout(1800);
  const f = page.locator('a.frag:not(.big)').first(); let b = (await f.locator('.d').boundingBox())!;
  const x = b.x + b.width / 2, y = b.y + b.height / 2;
  await page.mouse.move(x, y); await page.mouse.down(); await page.mouse.move(x + 60, y + 30, { steps: 6 }); await page.mouse.up(); await page.waitForTimeout(1200);
  expect(page.url()).not.toContain('/work/');
  const a = (await f.locator('.d').boundingBox())!; expect(Math.abs(a.x - b.x) + Math.abs(a.y - b.y)).toBeGreaterThan(15);
  await page.mouse.move(a.x + a.width / 2, a.y + a.height / 2); await page.mouse.down(); await page.mouse.move(5, 5, { steps: 3 }); await page.mouse.up(); await page.waitForTimeout(1400);
  const c = (await f.locator('.d').boundingBox())!; expect(c.x).toBeGreaterThanOrEqual(-8); expect(c.y).toBeGreaterThanOrEqual(50);
  await f.locator('.d').click(); await page.waitForURL(/\/work\//);
});
test('resize mid-morph lands in cells', async ({ page, isMobile }) => {
  test.skip(!!isMobile); await page.goto(''); await ready(page); await page.evaluate(() => window.scrollTo(0, 500)); await page.waitForTimeout(700);
  await page.setViewportSize({ width: 1000, height: 800 }); await page.waitForTimeout(1200); await end(page); expect(await strays(page)).toEqual([]);
});
test('back from a case study', async ({ page }) => {
  await page.goto(''); await ready(page); await page.goto('work/move/'); await page.goBack(); await ready(page);
  await end(page); expect(await strays(page)).toEqual([]);
});
test('keyboard: focused piece is on screen', async ({ page, isMobile }) => {
  test.skip(!!isMobile); await page.goto(''); await ready(page); await page.waitForTimeout(1200);
  await page.locator('a.frag').first().focus(); await page.keyboard.press('Enter'); await page.waitForURL(/\/work\//);
});
test('drag during intro leaves the piece visible', async ({ page, isMobile }) => {
  test.skip(!!isMobile); await page.goto(''); await ready(page);
  const b = (await page.locator('.big').boundingBox())!; await page.mouse.move(b.x + 80, b.y + 80); await page.mouse.down(); await page.mouse.move(b.x + 130, b.y + 110, { steps: 4 }); await page.mouse.up(); await page.waitForTimeout(2000);
  const o = await page.evaluate(() => ['.big .d', '.big .p'].map((s) => getComputedStyle(document.querySelector(s)!).opacity)); expect(o).toEqual(['1', '1']);
});
test('wheel while holding: piece returns', async ({ page, isMobile }) => {
  test.skip(!!isMobile); await page.goto(''); await ready(page); await page.waitForTimeout(1500);
  const b = (await page.locator('a.frag:not(.big) .d').first().boundingBox())!; const x = b.x + b.width / 2, y = b.y + b.height / 2;
  await page.mouse.move(x, y); await page.mouse.down(); await page.mouse.move(x + 150, y + 60, { steps: 5 }); await page.mouse.wheel(0, 700); await page.waitForTimeout(900); await page.mouse.move(x + 200, y - 40, { steps: 5 }); await page.mouse.up();
  await end(page); const d = await page.evaluate(() => { const m = new DOMMatrix(getComputedStyle(document.querySelector('a.frag:not(.big) .d')!).transform); return Math.abs(m.e) + Math.abs(m.f); }); expect(d).toBeLessThan(2);
});
test('height change relays the sheet', async ({ page, isMobile }) => {
  test.skip(!!isMobile); await page.goto(''); await ready(page); await page.setViewportSize({ width: 1440, height: 660 }); await page.waitForTimeout(1200); await end(page);
  const r = await page.evaluate(() => [Math.max(...[...document.querySelectorAll('.cell')].map((c) => c.getBoundingClientRect().bottom)), document.querySelector('.ticker')!.getBoundingClientRect().top]); expect(r[0]).toBeLessThanOrEqual(r[1] + 1);
});
test('landscape phone and reduced motion can read the intro', async ({ page }) => {
  await page.setViewportSize({ width: 844, height: 390 }); await page.goto(''); await ready(page); await page.waitForTimeout(500);
  expect(await page.locator('.pin-spacer').count()).toBe(0); await page.evaluate(() => scrollTo(0, 250)); await page.waitForTimeout(700); await expect(page.locator('#intro')).toHaveCSS('opacity', '1');
  await page.setViewportSize({ width: 1440, height: 900 }); await page.emulateMedia({ reducedMotion: 'reduce' }); await page.goto('?r'); await ready(page); await expect(page.locator('#intro')).toBeVisible();
  const hit = await page.evaluate(() => { const b = (s: string) => document.querySelector(s)!.getBoundingClientRect(), a = b('#intro'); return [b('#sheetHead'), ...[...document.querySelectorAll('.cell')].map((c) => c.getBoundingClientRect())].filter((c) => a.left < c.right && a.right > c.left && a.top < c.bottom && a.bottom > c.top).length; }); expect(hit).toBe(0);
});
test('reload keeps the scroll position', async ({ page }) => { await page.goto(''); await ready(page); await page.evaluate(() => scrollTo(0, 1700)); await page.waitForTimeout(800); const y = await page.evaluate(() => scrollY); await page.reload(); await ready(page); await page.waitForTimeout(800); expect(Math.abs((await page.evaluate(() => scrollY)) - y)).toBeLessThan(30); });
test('white ground, paper pieces keep an edge', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' }); await page.goto(''); await ready(page);
  expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe('rgb(255, 255, 255)');
  expect(await page.locator('.note').evaluateAll((l) => l.every((e) => parseFloat(getComputedStyle(e).borderTopWidth) >= 1))).toBe(true);
});
test('cover is in place before the wall script runs', async ({ page }) => {
  await page.route('**/StudioWall*.js', async (r) => { await new Promise((z) => setTimeout(z, 1500)); await r.continue(); });
  await page.goto('', { waitUntil: 'commit' }); await page.waitForSelector('.big img', { state: 'attached' }); await page.waitForTimeout(700);
  expect(await page.locator('#desk').getAttribute('data-ready')).toBeNull();
  const i = page.locator('.big img'); await expect(i).toBeVisible(); const a = (await i.boundingBox())!;
  await ready(page); await page.waitForTimeout(300); const b = (await i.boundingBox())!; expect(Math.abs(a.x - b.x) + Math.abs(a.y - b.y)).toBeLessThan(6);
});
for (const [w, h] of [[800, 600], [800, 480], [844, 390], [720, 560], [1000, 520], [1280, 620]]) test(`small window ${w}x${h}: sheet intact`, async ({ page }) => {
  await page.setViewportSize({ width: w, height: h }); await page.goto(''); await ready(page); await page.waitForTimeout(900);
  if (await page.locator('.pin-spacer').count()) await end(page);
  expect(await strays(page)).toEqual([]);
  const bad = await page.evaluate(() => { const b = (e: Element) => e.getBoundingClientRect(), head = b(document.querySelector('#sheetHead')!), tk = b(document.querySelector('.ticker')!); const cells = [...document.querySelectorAll('.cell')].map(b);
    return { small: cells.filter((c) => c.height < 50).length, under: cells.filter((c) => c.bottom > tk.top + 1).length, hit: cells.filter((c) => c.left < head.right && c.right > head.left && c.top < head.bottom && c.bottom > head.top).length, flipped: [...document.querySelectorAll<HTMLElement>('.frag')].filter((f) => f.offsetParent && new DOMMatrix(getComputedStyle(f).transform).a <= 0.05).length }; });
  expect(bad).toEqual({ small: 0, under: 0, hit: 0, flipped: 0 });
});
test('wall shows real pictures, no grey frames', async ({ page }) => { await page.goto(''); await ready(page); expect(await page.locator('.frag a .fpo, a.frag .fpo').count()).toBe(0); expect(await page.locator('a.frag img').count()).toBeGreaterThanOrEqual(8); });
test('an archive piece leads to the archive', async ({ page }) => { await page.goto(''); await ready(page); await page.waitForTimeout(1500); await page.locator('a.frag[href$="#archive"]').first().evaluate((e: HTMLElement) => e.click()); await expect.poll(() => page.evaluate(() => Math.abs(document.getElementById('archive')!.getBoundingClientRect().top)), { timeout: 6000 }).toBeLessThan(110); });
