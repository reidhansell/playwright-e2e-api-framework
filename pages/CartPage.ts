import { Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/view_cart');
  }

  getProductRow(productId: string) {
    return this.page.locator(`#product-${productId}`);
  }
}
