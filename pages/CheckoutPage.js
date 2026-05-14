export class CheckoutPage {
    constructor(page) {

        this.page=page
        this.firstNameInput =page.getByPlaceholder('First Name');
        this.lastNameInput =page.getByPlaceholder('Last Name');
        this.postalCodeInput =page.getByPlaceholder('Zip/Postal Code');
        this.continueButton =page.getByRole('button', { name: 'Continue' });
        this.cancelButton =page.getByRole('button', { name: 'Cancel' });
    }

    async fillCheckoutInformation(firstName, lastName, postalCode) {

        await this.firstNameInput.fill(firstName);

        await this.lastNameInput.fill(lastName);

        await this.postalCodeInput.fill(postalCode);
    }
}