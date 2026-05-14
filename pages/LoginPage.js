export class LoginPage {
  constructor(page) {
    this.page = page;

    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.getByText('Epic sadface:');
    this.errorMessageUsername = page.getByText('Epic sadface:');
  }

  async goto() {
    await this.page.goto('/');
  }

  async getTitle() {
    return this.page.title();
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}