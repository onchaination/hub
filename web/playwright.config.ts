import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://127.0.0.1:4321',
    channel: process.env.PLAYWRIGHT_CHROME ? 'chrome' : undefined,
  },
  webServer: {
    // Keep the preview attached even when Astro detects an agent environment.
    env: { ASTRO_PREVIEW_BACKGROUND: '1' },
    command: 'npm run build && npm run preview -- --host 127.0.0.1',
    url: 'http://127.0.0.1:4321',
    timeout: 120000,
    reuseExistingServer: false,
  },
});
