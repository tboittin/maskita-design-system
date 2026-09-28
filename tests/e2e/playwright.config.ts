import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: '.',
  timeout: 30_000,
  retries: 1,
  use: {
    baseURL: 'http://localhost:6006',
    viewport: { width: 1280, height: 720 },
  },
  webServer: {
    command: 'pnpm storybook --no-open',
    port: 6006,
    timeout: 60_000,
    reuseExistingServer: true,
  },
})
