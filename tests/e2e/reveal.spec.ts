import { test, expect } from './util';
test('long case: every picture appears when reached by wheel', async ({ page, isMobile }) => {
  test.skip(!!isMobile); test.setTimeout(90000); await page.goto('work/milano-coffee/'); await page.mouse.move(600, 500);
  for (let i = 0; i < 70; i++) { await page.mouse.wheel(0, 300); await page.waitForTimeout(110); }
  await page.waitForTimeout(1800);
  expect(await page.evaluate(() => [...document.querySelectorAll('[data-rv]')].filter((e) => !e.classList.contains('in')).length)).toBe(0);
  expect(await page.evaluate(() => [...document.images].filter((i) => i.checkVisibility() && (!i.complete || !i.naturalWidth)).length)).toBe(0);
});
