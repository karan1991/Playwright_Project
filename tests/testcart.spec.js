import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../test-data/testData';
import { CartPage } from '../pages/CartPage';
import { InventoryPage } from '../pages/InventoryPage';

let inv;
let cart;

test.beforeEach(async ({ page }) => {

    const login = new LoginPage(page);
    cart = new CartPage(page);
    inv = new InventoryPage(page);
    await login.goto();
    await login.login(
        users.standardUser.username,
        users.standardUser.password
    );
});

test('Verify cart count', async ({ page }) => {
    cart = new CartPage(page);
    inv = new InventoryPage(page);
    await inv.addProductToCart('Sauce Labs Backpack');
    await inv.addProductToCart('Sauce Labs Bike Light');
    await inv.opencartlink();
    const count = await cart.getCartItemsCount();
    expect(count).toBe(2);
});

test('validate product visible in cart', async ({ page }) => {

    cart = new CartPage(page);
    inv = new InventoryPage(page);
    await inv.addProductToCart('Sauce Labs Backpack');
    await inv.opencartlink();
    expect(await cart.isproductVisible('Sauce Labs Backpack')).toBeTruthy();
});

test('proceed to checkout', async ({ page }) => {
    cart = new CartPage(page);
    inv = new InventoryPage(page);
    await inv.addProductToCart('Sauce Labs Backpack');
    await inv.opencartlink();
    await cart.checkout();
    await expect(page).toHaveURL(/checkout-step-one/);
});

test('Handle iframe in Playwright', async ({ page }) => {

  // Open webpage
  await page.goto('https://the-internet.herokuapp.com/iframe');

  // Locate iframe
  const frame = page.frameLocator('#mce_0_ifr');

  // Clear existing text
  await frame.locator('#tinymce').clear();

  // Type new text
  await frame.locator('#tinymce').fill('Hello Playwright Frames');

});

test('Handle  in Playwright', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/iframe');

  // Locate iframe
  const frame = page.frameLocator('#mce_0_ifr');

  // Click inside editor
  await frame.locator('#tinymce').focus();

  // Select all existing text
  await page.keyboard.press('Meta+A'); // Mac

  // For Windows:
  // await page.keyboard.press('Control+A');

  // Delete existing text
  await page.keyboard.press('Backspace');

  // Type new text
  await frame.locator('#tinymce')
    .type('Hello Playwright Frames');

  // Assertion
  await expect(frame.locator('#tinymce'))
    .toHaveText('Hello Playwright Frames');

});