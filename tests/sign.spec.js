// import { expect, test } from '@playwright/test';

// test.describe('Signup Functionality', () => {
  
//   test('should successfully register a new user', async ({ page }) => {
//     await page.goto('/signup');

//     // Fill in the signup form
//     await page.fill('input[name="name"]', 'Test User');
//     await page.fill('input[name="email"]', `testuser${Date.now()}@example.com`); // Generate unique email
//     await page.fill('input[name="mobile_no"]', '9876543210');
//     await page.fill('input[name="password"]', 'Test@123');
//     await page.fill('input[name="confirmpassword"]', 'Test@123');

//     // Click the Register button
//     await page.locator('button:has-text("Register")').click();

//     // Wait for success toast message
//     await page.waitForSelector('.toast-success, .alert-success', { timeout: 5000 });

//     // Wait until navigation to /login happens
//     await page.waitForLoadState('networkidle'); 
//     await expect(page).toHaveURL('/login');
//   });

//   test('should show an error for mismatched passwords', async ({ page }) => {
//     await page.goto('/signup');

//     await page.fill('input[name="name"]', 'Test User');
//     await page.fill('input[name="email"]', 'testuser@example.com');
//     await page.fill('input[name="mobile_no"]', '9876543210');
//     await page.fill('input[name="password"]', 'Test@123');
//     await page.fill('input[name="confirmpassword"]', 'WrongPass'); // Mismatch

//     await page.locator('button:has-text("Register")').click();

//     // Wait for the error message to appear (Update selector if needed)
//     await page.waitForSelector('.text-red-500, .error-message', { timeout: 5000 });

//     // Verify error message is displayed
//     await expect(page.locator('.text-red-500, .error-message')).toBeVisible();
//   });

//   test('should not allow signup with invalid email', async ({ page }) => {
//     await page.goto('/signup');

//     await page.fill('input[name="name"]', 'Test User');
//     await page.fill('input[name="email"]', 'invalidemail'); // Invalid email
//     await page.fill('input[name="mobile_no"]', '9876543210');
//     await page.fill('input[name="password"]', 'Test@123');
//     await page.fill('input[name="confirmpassword"]', 'Test@123');

//     await page.locator('button:has-text("Register")').click();

//     // Wait for email validation error (Update selector if needed)
//     await page.waitForSelector('.text-red-500, .error-message', { timeout: 5000 });

//     // Ensure error message is shown
//     await expect(page.locator('.text-red-500, .error-message')).toBeVisible();
//   });

// });
