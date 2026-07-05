import { defineConfig, devices } from '@playwright/test';

/**
 * Config for the Automation Exercise E2E + API suite.
 * Docs: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  // Run tests in files in parallel.
  fullyParallel: true,
  // Fail the CI build if someone left a `test.only` in the source.
  forbidOnly: !!process.env.CI,
  // Retry on CI only — the SUT is third-party, so a transient blip shouldn't read as a real failure.
  retries: process.env.CI ? 2 : 0,
  // One worker on CI for stable, ordered output; use all cores locally.
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: 'https://automationexercise.com',
    // Collect a trace when retrying a failed test — invaluable for debugging flake.
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
