import { test, expect } from './util';
import type { Page } from '@playwright/test';
const fill = async (p: Page) => {
  await p.goto(''); await p.waitForSelector('#flow[data-ready]');
  await p.getByRole('button', { name: 'Packaging' }).click(); await p.getByRole('button', { name: '20–50M VND' }).click(); await p.getByRole('button', { name: '1–3 months' }).click();
  await p.getByLabel('Message').fill('Hi'); await p.getByLabel('Message').press('Enter'); await p.getByLabel('Message').pressSequentially('there');
  await p.getByLabel('Name', { exact: true }).fill('Ly'); await p.getByLabel('Email', { exact: true }).fill('a@b.co');
};
const endpoint = (p: Page) => p.locator('#flow').evaluate((e: HTMLElement) => { e.dataset.endpoint = 'https://form.test/x'; });
test('steps, back, newline, mail draft', async ({ page }) => {
  await page.goto(''); await page.waitForSelector('#flow[data-ready]');
  for (const o of ['Brand', 'Packaging', 'Campaign', 'Other']) await expect(page.getByRole('button', { name: o, exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Brand', exact: true }).focus(); await page.keyboard.press('Enter');
  for (const o of ['Under 20M VND', '20–50M VND', 'Over 50M VND', 'Not sure yet']) await expect(page.getByRole('button', { name: o })).toBeVisible();
  await page.getByRole('button', { name: 'Back' }).click(); await expect(page.getByRole('button', { name: 'Brand', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await fill(page); await expect(page.getByLabel('Message')).toHaveValue('Hi\nthere');
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.getByRole('link', { name: 'Open the email draft' })).toHaveAttribute('href', /^mailto:.*Packaging/);
});
test('bad email is explained', async ({ page }) => { await fill(page); await page.getByLabel('Email', { exact: true }).fill('nope'); await page.getByRole('button', { name: 'Send' }).click(); await expect(page.getByText('Add an email like')).toBeVisible(); });
test('double submit sends once', async ({ page }) => {
  let n = 0; await page.route('https://form.test/x', async (r) => { if (r.request().method() === 'POST') n++; await new Promise((z) => setTimeout(z, 300)); await r.fulfill({ status: 200, headers: { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*' }, body: '{}' }); });
  await fill(page); await endpoint(page); await page.getByRole('button', { name: 'Send' }).dblclick(); await expect(page.getByText('Got it')).toBeVisible(); expect(n).toBe(1);
});
test('server error keeps answers', async ({ page, errors }) => {
  await page.route('https://form.test/x', (r) => r.fulfill({ status: 500, headers: { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*' } }));
  await fill(page); await endpoint(page); await page.getByRole('button', { name: 'Send' }).click(); await expect(page.getByText('did not go through')).toBeVisible(); await expect(page.getByLabel('Message')).toHaveValue('Hi\nthere'); errors.length = 0;
});
test('honeypot sends nothing', async ({ page }) => {
  let n = 0; await page.route('https://form.test/x', (r) => { n++; return r.abort(); });
  await fill(page); await endpoint(page); await page.locator('[name=_gotcha]').evaluate((e: HTMLInputElement) => { e.value = 'bot'; }); await page.getByRole('button', { name: 'Send' }).click(); await page.waitForTimeout(300); expect(n).toBe(0);
});
test('Vietnamese line; About has employers, no years', async ({ page }) => {
  await page.goto(''); await expect(page.locator('[lang=vi]', { hasText: 'Nhắn tiếng Việt cũng được' })).toBeVisible();
  await page.goto(''); const t = await page.locator('#about').innerText(); for (const c of ['MOVE', 'Milano Coffee Vietnam', 'Gong Cha Vietnam']) expect(t).toContain(c); expect(t).not.toMatch(/\b20[12]\d\b/);
});
test('double click answers one question only', async ({ page }) => { await page.goto(''); await page.waitForSelector('#flow[data-ready]'); await page.getByRole('button', { name: 'Campaign', exact: true }).dblclick(); await expect(page.getByText('Rough budget?').first()).toBeVisible(); await expect(page.getByRole('button', { name: 'Under 1 month' })).toBeHidden(); });
test('answers can be copied; use of details is stated', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']); await fill(page); await expect(page.getByText('I only use this to reply to you.')).toBeVisible();
  await page.getByRole('button', { name: 'Send' }).click(); await page.getByRole('button', { name: 'Copy answers' }).click(); await expect(page.getByRole('button', { name: 'Copied' })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('Hi\nthere');
});
