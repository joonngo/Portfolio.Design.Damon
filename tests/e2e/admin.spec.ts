import { test, expect } from './util';
test('admin offers token sign-in', async ({ page }) => { await page.goto('admin/'); await expect(page.locator('meta[name=robots]').first()).toHaveAttribute('content', /noindex/); await expect(page.getByText(/access token/i).first()).toBeVisible({ timeout: 15000 }); });
