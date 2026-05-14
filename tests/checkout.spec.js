import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';

import { InventoryPage } from '../pages/InventoryPage';

import { CartPage } from '../pages/CartPage';

import { CheckoutPage } from '../pages/CheckoutPage';

import { users, products }
from '../test-data/testData';


let inv;
let cart;
let checkout;


test.beforeEach(async ({ page }) => {

    const login = new LoginPage(page);
    inv = new InventoryPage(page);
    cart = new CartPage(page);
    
    await login.goto();
    await login.login(
        users.standardUser.username,
        users.standardUser.password
    );
    await inv.addProductToCart('Sauce Labs Backpack');
    await inv.opencartlink();
    await cart.checkout();
});

test('fill checkout information', async ({ page }) => {
    checkout = new CheckoutPage(page);
    await checkout.fillCheckoutInformation(
        'Karan',
        'Sharma',
        '110001'
    );
    await checkout.continueButton.click();
    await expect(page).toHaveURL(/checkout-step-two/);
});