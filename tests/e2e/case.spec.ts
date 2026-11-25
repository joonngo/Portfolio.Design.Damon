import { test, expect } from './util';
const slugs = ['milano-coffee', 'shinsho-ramen', 'gong-cha', 'move', 'cham-kem-bo'];
test('all case studies complete, unique meta, real OG', async ({ page, request }) => {
  const titles = new Set<string>();
  for (const s of slugs) {
    expect((await page.goto(`work/${s}/`))!.status()).toBe(200);
    expect(await page.locator('main').innerText()).not.toMatch(/to be updated|TBC/i);
    titles.add(await page.title());
    expect(await page.locator('link[rel=canonical]').getAttribute('href')).toBe(`https://joonngo.github.io/Portfolio.Design.Damon/work/${s}/`);
    const og = (await page.locator('meta[property="og:image"]').getAttribute('content'))!;
    const r = await request.get(og.replace('https://joonngo.github.io', 'http://localhost:4401')); expect(r.status()).toBe(200);
    const b = await r.body(); expect([b.readUInt32BE(16), b.readUInt32BE(20)]).toEqual([1200, 630]);
  }
  expect(titles.size).toBe(5);
});
test('empty project: no empty sections, still a way to write', async ({ page }) => {
  await page.goto('work/shinsho-ramen/');
  for (const id of ['brief', 'approach', 'deliverables', 'result']) await expect(page.locator(`#${id}`)).toHaveCount(0);
  await expect(page.getByText('Case study in progress')).toBeVisible();
  await page.locator('#cta a').click(); await page.waitForSelector('#flow[data-ready]');
  await expect(page.locator('#log')).toContainText('Brand'); await expect(page.locator('legend', { hasText: 'Rough budget?' })).toBeVisible();
});
test('overlay CTA closes, lands on the form, preselects', async ({ page }) => {
  await page.goto(''); await page.waitForSelector('#desk[data-ready]'); await page.locator('.row').nth(2).click(); await page.locator('dialog #cta a').click();
  await expect(page.locator('dialog#case')).toBeHidden(); await expect(page.locator('#log')).toContainText('Campaign');
  await expect.poll(() => page.evaluate(() => Math.abs(document.getElementById('contact')!.getBoundingClientRect().top)), { timeout: 6000 }).toBeLessThan(110);
});
test('Milano result; last wraps to first', async ({ page }) => {
  await page.goto('work/milano-coffee/'); await expect(page.locator('#result')).toContainText('1B+ VND in holiday-season revenue');
  await page.goto('work/cham-kem-bo/'); await expect(page.locator('#next')).toHaveAttribute('href', /milano-coffee\/$/);
});
test('Milano: gallery split, captions, credits', async ({ page }) => {
  await page.goto('work/milano-coffee/'); await expect(page.locator('#approach img')).toHaveCount(3); await expect(page.locator('#deliverables img')).toHaveCount(3); await expect(page.locator('#brief')).toContainText('paper cup');
  for (const n of ['Quoc Vuong', 'Jahuy', 'Thong Ngo']) await expect(page.locator('#credits')).toContainText(n);
  expect(await page.locator('figcaption').count()).toBe(6);
});
