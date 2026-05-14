export class CheckoutOverview{
    constructor (page){
        this.page=page;
        this.totalAmount = page.locator('.summary_total_label');
    }

    getProduct(productName) {
    return this.page.locator('.cart_item').filter
    (
        {
            has: this.page.locator('.inventory_item_name',
                {
                    hasText: productName
                }
            )
        }
    );
}

}