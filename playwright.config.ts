import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: 'tests/e2e', fullyParallel: true, workers: 4, reporter: 'line',
  use: { baseURL: 'http://localhost:4401/Portfolio.Design.Damon/' },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } },
  ],
  webServer: { command: 'npm run build && node scripts/serve.mjs 4401 ::', url: 'http://localhost:4401/Portfolio.Design.Damon/', reuseExistingServer: false, timeout: 120000 },
});
