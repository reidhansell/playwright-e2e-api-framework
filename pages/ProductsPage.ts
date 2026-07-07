import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly search: Locator;
  readonly searchSubmit: Locator;
  readonly addedToCartModal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.search = page.getByPlaceholder('Search Product');
    this.searchSubmit = page.locator('#submit_search');
    this.addedToCartModal = page.getByText('Your product has been added to cart.');
  }

  async goto() {
    await this.page.goto('/products', { waitUntil: 'domcontentloaded' });
  }

  async addToCart(productId: string) {
    await this.page.locator('.productinfo').locator(`[data-product-id="${productId}"]`).click();
    await this.addedToCartModal.waitFor();
  }

  async filterByCategory(category: string) {
    await this.page.getByRole('link', { name: category }).click();
  }

  async filterByBrand(brand: string) {
    await this.page.getByRole('link', { name: brand }).click();
  }

  async filterBySearch(search: string) {
    await this.search.fill(search);
    await this.searchSubmit.click();
  }
}
