import { test, expect, ready } from './util';
import type { Page } from '@playwright/test';
const hidden = (p: Page) => p.evaluate(() => [...document.querySelectorAll('[data-rv]')].filter((e) => e.checkVisibility() && !e.classList.contains('in')).length);
test('reveals arm, then everything ends visible', async ({ page }) => {
  await page.goto(''); await ready(page); expect(await page.locator('[data-rv]').count()).toBeGreaterThan(5); expect(await hidden(page)).toBeGreaterThan(0);
  for (let y = 0; y < 9000; y += 500) { await page.evaluate((v) => scrollTo({ top: v, behavior: 'instant' }), y); await page.waitForTimeout(160); }
  expect(await hidden(page)).toBe(0); await expect(page.locator('#about img')).toBeVisible(); await expect(page.locator('#about h2')).toContainText('I run media at MOVE');
});
test('reduced motion: nothing waits for a reveal', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' }); await page.goto(''); await ready(page);
  expect(await page.evaluate(() => [...document.querySelectorAll('[data-rv] .rvc, [data-rv] img')].filter((e) => getComputedStyle(e).clipPath !== 'none').length)).toBe(0);
});
test('lining up the marks stamps the cover', async ({ page, isMobile }) => {
  test.skip(!!isMobile); await page.goto(''); await ready(page); await page.waitForTimeout(2200);
  const c = async (s: string) => { const b = (await page.locator(s).boundingBox())!; return [b.x + b.width / 2, b.y + b.height / 2]; };
  const [bx, by] = await c('[data-reg=b] svg'), [kx, ky] = await c('[data-reg=k] svg');
  await page.mouse.move(bx, by); await page.mouse.down(); await page.mouse.move((bx + kx) / 2, (by + ky) / 2, { steps: 6 }); await page.mouse.move(kx + 8, ky + 5, { steps: 8 }); await page.waitForTimeout(250); await page.mouse.up();
  await expect(page.locator('#desk')).toHaveAttribute('data-registered', ''); await page.waitForTimeout(1500);
  const [x, y] = await c('[data-reg=b] svg'), [k2, k3] = await c('[data-reg=k] svg'); expect(Math.hypot(x - k2, y - k3)).toBeLessThan(5);
  const s = (await page.locator('.stamp').boundingBox())!, v = (await page.locator('.big img').boundingBox())!; expect(s.x + s.width > v.x && s.x < v.x + v.width && s.y < v.y + v.height + 60 && s.y + s.height > v.y).toBe(true);
});
test('case closes cleanly when reopened at once', async ({ page }) => {
  await page.goto(''); await ready(page); await page.locator('.row').nth(1).click(); const d = page.locator('dialog#case'); await expect(d.locator('h1')).toHaveText('Shinsho Ramen'); await page.waitForTimeout(900);
  await page.goBack(); await page.goForward(); await page.waitForTimeout(1500); await expect(d).toBeVisible(); await expect(d.locator('h1')).toHaveText('Shinsho Ramen');
});
test('case images end visible in the overlay', async ({ page }) => {
  await page.goto(''); await ready(page); await page.locator('.row').first().click(); const d = page.locator('#caseBody'); await expect(d.locator('h1')).toBeVisible();
  for (let y = 0; y < 8000; y += 500) { await d.evaluate((e, v) => e.scrollTo(0, v), y); await page.waitForTimeout(130); }
  expect(await d.evaluate((e) => e.querySelectorAll('[data-rv]:not(.in)').length)).toBe(0);
});
