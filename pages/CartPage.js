export class CartPage {
    constructor(page) {
        this.page = page
        this.cartItems = page.locator('.cart_item')
        
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
        this.CheckoutButton = page.getByRole('button', { name: 'Checkout' });
    }

    async getCartItemsCount() {
       
        return await this.cartItems.count();
    }
    async checkout() {
        await this.CheckoutButton.click()
    }
    async continueButton() {
        await this.continueButton.click()
    }
    

    async removeProductfromCart(productName) {
        const product = this.page.locator('.cart_item').
            filter
            ({
                has: this.page.locator('.inventory_item_name', {
                    hasText: productName
                })
            })
        await product.getByRole("button", { name: 'Remove' }).click()
    }

    async isproductVisible(productName){
        const product = this.page.locator('.cart_item').
        filter({
            has: this.page.locator('.inventory_item_name', {
                    hasText: productName
                })
        })
        return await product.isVisible();
    }
}