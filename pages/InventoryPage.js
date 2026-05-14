export class InventoryPage {
    constructor(page){
        this.page=page;
        this.inventoryItems=page.locator('.inventory_item');
        this.cartBadge=page.locator('.shopping_cart_badge');
        this.removeButton=page.getByRole('button',{name:'Remove'})
        this.inventoryItemNames =page.locator('.inventory_item_name');
        this.cartLink = page.locator('.shopping_cart_container')
    }

    async addProductToCart(productName) {

    const product = this.page
        .locator('.inventory_item')
        .filter({
            has: this.page.locator('.inventory_item_name', {
                hasText: productName
            })
        });

    await product
        .getByRole('button', { name: 'Add to cart' })
        .click();
}

async getInventoryCount(){
        return await this.inventoryItems.count();
}

async removeallproducts(){
    const count=await this.removeButton.count;
    for(let i = 0; i < count; i++) {
        await removeButtons.nth(0).click();
    }
}

async getAllProductNames() {
        return await this.inventoryItemNames.allTextContents();
    }

    async opencartlink(){
         await this.cartLink.click()
    }

    

}