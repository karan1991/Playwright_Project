import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { users, products } from '../test-data/testData';

test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login( users.standardUser.username,users.standardUser.password);
});

test('has title', async ({ page }) => {
    const inventoryPage= new InventoryPage(page);
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
});

test('count of items', async ({ page }) => {
    const inventoryPage= new InventoryPage(page);
    const count = await inventoryPage.getInventoryCount();
    expect(count).toBe(6);

});

test('Add multiple products to cart', async ({ page }) => {
    const inventoryPage= new InventoryPage(page);
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    await expect(inventoryPage.cartBadge).toHaveText('2');
});

test('Remove Products from cart', async ({ page }) => {
    const inventoryPage= new InventoryPage(page);
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    const productname=await inventoryPage.getAllProductNames();
    expect(productname).toContain('Sauce Labs Backpack')
    await inventoryPage.removeallproducts()

});