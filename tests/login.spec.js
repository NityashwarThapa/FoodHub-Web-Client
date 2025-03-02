import { expect, test } from '@playwright/test';

test.describe('Login Page UI Tests', () => {

  test('should load the login page successfully', async ({ page }) => {
    await page.goto('/login');  // Navigate to login page

    // Verify the page title or heading
    await expect(page.locator('h2')).toHaveText('Log in');

    // Ensure the logo is visible
    await expect(page.locator('img[alt="login img"]')).toBeVisible();
  });

  test('should have an email input field', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toHaveAttribute('type', 'email');
  });

  test('should have a password input field', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toHaveAttribute('type', 'password');
  });

  test('should have a Sign in button', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('button:has-text("Sign in")')).toBeVisible();
    await expect(page.locator('button:has-text("Sign in")')).toBeEnabled();
  });

  test('should have a working Sign up link', async ({ page }) => {
    await page.goto('/login');

    // Check if "Sign up now" link is present
    const signUpLink = page.locator('a:has-text("Sign up now")');
    await expect(signUpLink).toBeVisible();

    // Click the sign-up link and check if it redirects
    await signUpLink.click();
    await expect(page).toHaveURL('/signup'); // Ensure it goes to the signup page
  });

});
