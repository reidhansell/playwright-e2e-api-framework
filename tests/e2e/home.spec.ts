import { test, expect } from '@playwright/test';

/**
 * Smoke test for the Automation Exercise home page.
 *
 * This is the "worked example" — deliberately small and selector-resilient so it's a stable
 * first green test across all three browsers. Real user-journey coverage (signup/login,
 * cart, checkout) gets built out from here, page-object-backed.
 */
test.describe('Home page', () => {
  test('loads and exposes the primary navigation', async ({ page }) => {
    await page.goto('/');

    // Web-first assertions (auto-waiting) — no hard waits anywhere in this suite.
    await expect(page).toHaveTitle(/Automation Exercise/i);
    await expect(page.getByRole('link', { name: /signup \/ login/i })).toBeVisible();
    // Prefer a stable href locator over an accessible-name regex here: the nav "Products" link's
    // computed name carries icon/whitespace noise that broke /^products$/. `.first()` guards against
    // the home page's "View Product" cards also matching an href to /products.
    await expect(page.locator('a[href="/products"]').first()).toBeVisible();
  });
});
