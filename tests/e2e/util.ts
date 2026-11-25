import { test as base, expect, type Page } from '@playwright/test';
export const test = base.extend<{ errors: string[] }>({
  errors: [async ({ page }, use) => {
    const e: string[] = [];
    page.on('console', (m) => m.type() === 'error' && e.push(m.text()));
    page.on('pageerror', (x) => e.push(String(x)));
    await use(e);
    expect(e).toEqual([]);
  }, { auto: true }],
});
export const ready = (p: Page) => p.waitForSelector('#desk[data-ready]', { state: 'attached' });
export { expect };
