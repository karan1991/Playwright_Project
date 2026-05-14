import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users,checkoutData } from '../test-data/testData';
import { CartPage } from '../pages/CartPage';
import { InventoryPage } from '../pages/InventoryPage';
import {CheckoutPage} from '../pages/CheckoutPage';
import { CheckoutOverview } from '../pages/CheckoutOveriewPage';

test.beforeEach(async ({ page }) => {

    const login = new LoginPage(page);
    await login.goto();
    await login.login(
        users.standardUser.username,
        users.standardUser.password
    );
});

test('verify product name on overview page',async({page}) =>{
        const inv = new InventoryPage(page);    
        const cart = new CartPage(page);
        const checkout = new CheckoutPage(page)
        const checkoutoverview= new CheckoutOverview(page);

        await inv.addProductToCart('Sauce Labs Backpack');
        await inv.opencartlink();
        await cart.checkout();
        await checkout.fillCheckoutInformation(
        'Karan',
        'Sharma',
        '110001'
    );
        await checkout.continueButton.click();
        const product=checkoutoverview.getProduct('Sauce Labs Backpack')
        await expect(product).toBeVisible()
    
} )

test('verify total amount displayed',
async ({ page }) => {

    const inv =
        new InventoryPage(page);

    const cart =
        new CartPage(page);

    const checkout =
        new CheckoutPage(page);

    const overview =
        new CheckoutOverview(page);

    await inv.addProductToCart(
        'Sauce Labs Backpack'
    );

    await inv.opencartlink();

    await cart.checkout();

    await checkout.fillCheckoutInformation(
    checkoutData.validUser.firstName,
    checkoutData.validUser.lastName,
    checkoutData.validUser.postalCode
);

    await checkout.continueButton.click();

    await expect(
        overview.totalAmount
    ).toBeVisible();
});