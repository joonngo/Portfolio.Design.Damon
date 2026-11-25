import { test, expect, ready } from './util';
import type { Page } from '@playwright/test';
const near = (p: Page, id: string) => expect.poll(() => p.evaluate((i) => Math.abs(document.getElementById(i)!.getBoundingClientRect().top), id), { timeout: 6000 }).toBeLessThan(110);
for (const n of ['Work', 'About', 'Contact']) test(`menu ${n} scrolls, no page load`, async ({ page }) => {
  await page.goto(''); await ready(page); await page.evaluate(() => { (window as any).mark = 1; });
  await page.locator('header').getByRole('link', { name: n, exact: true }).click(); await near(page, n.toLowerCase());
  expect(await page.evaluate(() => (window as any).mark)).toBe(1); expect(page.url()).toMatch(new RegExp(`#${n.toLowerCase()}$`));
  await expect(page.locator('header').getByRole('link', { name: n, exact: true })).toHaveAttribute('aria-current', 'true');
});
test('name returns to top', async ({ page }) => { await page.goto('#about'); await ready(page); await page.locator('header .me').click(); await expect.poll(() => page.evaluate(() => scrollY), { timeout: 6000 }).toBeLessThan(5); });
test('deep link lands on section', async ({ page }) => { await page.goto('#contact'); await ready(page); await near(page, 'contact'); });
test('menu from a case study page', async ({ page }) => { await page.goto('work/move/'); await page.locator('header').getByRole('link', { name: 'Contact', exact: true }).click(); await ready(page); await near(page, 'contact'); });
test('case opens over the page; close returns to same spot', async ({ page }) => {
  await page.goto(''); await ready(page); await page.locator('header').getByRole('link', { name: 'Work', exact: true }).click(); await near(page, 'work'); await page.waitForTimeout(900);
  await page.locator('.row').nth(2).scrollIntoViewIfNeeded(); await page.waitForTimeout(900);
  const y = await page.evaluate(() => scrollY); await page.evaluate(() => { (window as any).mark = 1; });
  await page.locator('.row').nth(2).evaluate((e: HTMLElement) => e.click()); const d = page.locator('dialog#case');
  await expect(d.getByRole('heading', { name: 'Gong Cha' })).toBeVisible(); expect(page.url()).toMatch(/work\/gong-cha\/$/); await expect(page).toHaveTitle(/Gong Cha/);
  await d.locator('#next').click(); await expect(d.getByRole('heading', { name: 'MOVE', exact: true })).toBeVisible(); expect(page.url()).toMatch(/work\/move\/$/);
  await d.getByRole('button', { name: 'Close' }).click(); await expect(d).toBeHidden();
  expect(await page.evaluate(() => (window as any).mark)).toBe(1); expect(page.url()).not.toContain('/work/');
  expect(Math.abs((await page.evaluate(() => scrollY)) - y)).toBeLessThan(5); await expect(page).toHaveTitle('Damon Ngo, art direction');
});
test('Back and Escape close; Forward reopens', async ({ page }) => {
  await page.goto(''); await ready(page); await page.locator('.row').first().click(); const d = page.locator('dialog#case');
  await expect(d).toBeVisible(); await page.goBack(); await expect(d).toBeHidden(); await page.goForward(); await expect(d).toBeVisible();
  await page.keyboard.press('Escape'); await expect(d).toBeHidden(); expect(page.url()).not.toContain('/work/');
});
test('fetch failure falls back to the real page', async ({ page, errors }) => {
  await page.goto(''); await ready(page); let first = true;
  await page.route('**/work/move/', (r) => { if (first) { first = false; return r.abort(); } return r.continue(); });
  await page.locator('.row').nth(3).click(); await expect(page.locator('main h1')).toHaveText('MOVE'); errors.length = 0;
});
test('double click opens one case and one history step', async ({ page }) => {
  await page.goto(''); await ready(page); await page.locator('.row').first().dblclick(); const d = page.locator('dialog#case'); await expect(d).toBeVisible(); await page.goBack(); await expect(d).toBeHidden(); expect(page.url()).not.toContain('/work/');
});
