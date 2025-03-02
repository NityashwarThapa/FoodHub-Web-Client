import { expect, test } from '@playwright/test';

test.describe('Login Functionality', () => {
    test('should log in successfully with valid credentials', async ({ page }) => {
        // Navigate to the login page
        await page.goto('/login'); // Uses baseURL from config
    
        // Fill in the email and password fields
        await page.fill('input[name="email"]', 'dhirajbalayar0@gmail.com');
        await page.fill('input[name="password"]', 'Dhiraj@123');
    
        // Ensure correct button selection
        await page.locator('button:has-text("Sign in")').click(); 
    
        // Wait for navigation to complete
        await page.waitForLoadState('networkidle');
    
        // Assert successful login by checking redirection
        await expect(page).toHaveURL('/'); // Adjust if the dashboard URL is different
      });
    
    //   test('should show an error message for invalid credentials', async ({ page }) => {
    //     await page.goto('/login'); 
    
    //     await page.fill('input[name="email"]', 'invaliduser@example.com');
    //     await page.fill('input[name="password"]', 'wrongpassword');
    
    //     await page.locator('button:has-text("Sign in")').click();
    
    //     // Wait for the toast error message
    //     const errorToast = page.locator('.toast-error, .error-message'); // Adjust if needed
    //     await expect(errorToast).toBeVisible();
    //   });

//   test('should redirect an authenticated user away from login page', async ({ page }) => {
//     // Simulate authentication by setting localStorage token and reloading
//     await page.addInitScript(() => {
//       window.localStorage.setItem('_hw_token', 'dummyToken');
//     });

//     await page.goto('/login');

//     // Ensure redirection occurs
//     await expect(page).not.toHaveURL('/login');
//   });
});
