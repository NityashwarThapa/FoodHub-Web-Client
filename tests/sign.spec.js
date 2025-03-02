import { expect, test } from '@playwright/test';

test.describe('Signup Page UI Tests', () => {


  test('should have a name input field', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.locator('input[name="name"]')).toBeVisible();
  });

  test('should have an email input field', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toHaveAttribute('type', 'email');
  });

  test('should have a mobile number input field', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.locator('input[name="mobile_no"]')).toBeVisible();
  });

  test('should have a password input field', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toHaveAttribute('type', 'password');
  });

  test('should have a confirm password input field', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.locator('input[name="confirmpassword"]')).toBeVisible();
    await expect(page.locator('input[name="confirmpassword"]')).toHaveAttribute('type', 'password');
  });

  test('should have a Register button', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.locator('button:has-text("Register")')).toBeVisible();
    await expect(page.locator('button:has-text("Register")')).toBeEnabled();
  });

  test('should have a working Login link', async ({ page }) => {
    await page.goto('/signup');

    // Check if "Login Now" link is present
    const loginLink = page.locator('a:has-text("Login Now")');
    await expect(loginLink).toBeVisible();

    // Click the login link and check if it redirects
    await loginLink.click();
    await expect(page).toHaveURL('/login'); // Ensure it goes to the login page
  });

});
