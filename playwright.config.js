// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3001', // ✅ Updated to match your Vite server port
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  /* Automatically start Vite before running tests */
  webServer: {
    command: 'npm run dev', // ✅ Start your Vite development server
    url: 'http://localhost:3001', // ✅ Ensure it matches your Vite port
    timeout: 120000, // ✅ Wait up to 2 minutes for the server to start
    reuseExistingServer: true, // ✅ Don't restart if already running
  },
});
