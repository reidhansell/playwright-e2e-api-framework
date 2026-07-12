import { test, expect } from '@playwright/test';

// AI-generated smoke test (free scaffold).
test.describe('Home smoke', () => {
  test('loads and exposes the primary navigation', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Automation Exercise/i);
    await expect(page.getByRole('link', { name: /signup \/ login/i })).toBeVisible();
    await expect(page.locator('a[href="/products"]').first()).toBeVisible();
  });
});

// ─── My tests ───────────────────────────────────────────────────────────────
