import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';

test.describe('Products', () => {
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    await productsPage.goto();
  });

  test('Add product to cart', async ({ page }) => {
    await productsPage.addToCart('1');
    const cartPage = new CartPage(page);
    await cartPage.goto();
    await expect(cartPage.getProductRow('1')).toBeVisible();
  });
});
