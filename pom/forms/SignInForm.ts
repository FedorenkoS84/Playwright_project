import { Locator, Page } from "@playwright/test";

class SignInForm {
  private readonly page: Page;
  public readonly emailField: Locator;
  public readonly passwordField: Locator;
  public readonly loginButton: Locator;
  public readonly validationError: Locator;
  public readonly wrongDataError: Locator;
  constructor(page: Page) {
    this.page = page;
    this.emailField = this.page.locator("#signinEmail");
    this.passwordField = this.page.locator("#signinPassword");
    this.loginButton = this.page.getByRole("button", { name: "Login" });

    this.validationError = this.page.locator("div.invalid-feedback p");
    this.wrongDataError = this.page.locator(".alert-danger");
  }
  async login(email: string, password: string) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
  async triggerValidationErrorOnField(field: Locator) {
    await field.focus();
    await field.blur();
  }
}

export default SignInForm;
