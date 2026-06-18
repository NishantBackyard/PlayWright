// spec: specs/salesforce-login.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Salesforce Login', () => {
  test('Invalid credentials - error message', async ({ page }) => {
    // 1. Navigate to https://login.salesforce.com/?locale=in
    await page.goto('https://login.salesforce.com/?locale=in');

    // 2. Verify Username and Password fields are visible
    const username = page.locator('#username');
    const password = page.locator('#password');
    const loginBtn = page.locator('input#Login');
    await expect(username).toBeVisible();
    await expect(password).toBeVisible();
    await expect(loginBtn).toBeVisible();

    // 3. Enter invalid username and password and click Log In
    await username.fill('invalid@example.com');
    await password.fill('wrongpassword');
    await loginBtn.click();

    // 4. Verify an authentication error message is displayed and user remains on the login page
    await expect(page).toHaveURL(/login.salesforce.com/);
    const errorLocator = page.locator('text=/please check|invalid|incorrect|failed|authentication/i');
    await expect(errorLocator).toBeVisible({ timeout: 5000 });
  });
});
