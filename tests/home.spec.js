import { expect, test } from '@playwright/test';

test.describe('Home Page UI Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/'); // Ensure the home page loads before every test
  });

  test('should have a CTA button to See Our Menu', async ({ page }) => {
    await expect(page.locator('a:has-text("See Our Menu")')).toBeVisible();
  });

  

  test('should have a Swiper carousel for testimonials', async ({ page }) => {
    await expect(page.locator('.mySwiper')).toBeVisible();
  });

  test('should display the CTA section with a See More button', async ({ page }) => {
    await expect(page.locator('button:has-text("See More")')).toBeVisible();
  });

});
