import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test('FailedLogin', async ({ page }) => {
    await page.goto('/login');
    const LOGIN_FORM = page.locator('form').filter({ hasText: 'Login' });
    await LOGIN_FORM.getByPlaceholder('Email Address').fill('notarealemail@email.com');
    await LOGIN_FORM.getByPlaceholder('Password').fill('notarealpassword');
    await expect(page.getByText('Your email or password is incorrect!')).toBeHidden();
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
  });
})