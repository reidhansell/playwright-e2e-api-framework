import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginForm: Locator;
  readonly loginFormEmail: Locator;
  readonly loginFormPassword: Locator;
  readonly loginFormSubmit: Locator;
  readonly loginError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginForm = page.locator('form').filter({ hasText: 'Login' });
    this.loginFormEmail = this.loginForm.getByPlaceholder('Email Address');
    this.loginFormPassword = this.loginForm.getByPlaceholder('Password');
    this.loginFormSubmit = this.loginForm.getByRole('button', { name: 'Login' });
    this.loginError = this.loginForm.getByText('Your email or password is incorrect!');
  }

  async goto() {
    await this.page.goto('/login', { waitUntil: 'domcontentloaded' });
  }

  async login(email: string, password: string) {
    await this.loginFormEmail.fill(email);
    await this.loginFormPassword.fill(password);
    await this.loginFormSubmit.click();
  }
}
