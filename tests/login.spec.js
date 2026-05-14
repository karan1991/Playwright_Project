import { test, expect, chromium } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('has title', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
});

test('understand',async()=>{
    const browser=await chromium.launch({headless:false});
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle(/Swag Labs/);
    await browser.close();
})

test('empty password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', '');
    await expect(loginPage.errorMessage).toContainText('Password is required');
});
test('empty userName', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('', 'secret_sauce');
    await expect(loginPage.errorMessageUsername).toContainText('Username is required');
});

test('already logged in', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/secure');
  await expect(page.locator('h2')).toContainText('Secure Area');
});