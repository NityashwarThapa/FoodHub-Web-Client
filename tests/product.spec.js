import { expect, test } from '@playwright/test';

test.describe('All Products Page UI Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/product'); // Ensure the page loads before every test
  });

  test('should load the products page successfully', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Products');
  });
});