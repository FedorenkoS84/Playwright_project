import { Locator, Page } from "@playwright/test";

export class RegistrationPage {
  readonly page: Page;
  readonly signupName: Locator;
  readonly signupLastName: Locator;
  readonly signupEmail: Locator;
  readonly signupPassword: Locator;
  readonly signupRepeatPassword: Locator;
  readonly registerButton: Locator;
  readonly garageHeading: Locator;
  readonly invalidFeedback: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupName = page.locator("#signupName");
    this.signupLastName = page.locator("#signupLastName");
    this.signupEmail = page.locator("#signupEmail");
    this.signupPassword = page.locator("#signupPassword");
    this.signupRepeatPassword = page.locator("#signupRepeatPassword");
    this.registerButton = page.getByRole("button", { name: "Register" });
    this.garageHeading = page.getByRole("heading", { name: "Garage" });
    this.invalidFeedback = page.locator(".invalid-feedback");
  }

  async triggerValidationError(input: Locator) {
    await input.focus();
    await input.blur();
  }

  async fillRegistrationForm(data: {
    name: string;
    lastName: string;
    email: string;
    pass: string;
    repeatPass: string;
  }) {
    await this.signupName.fill(data.name);
    await this.signupLastName.fill(data.lastName);
    await this.signupEmail.fill(data.email);
    await this.signupPassword.fill(data.pass);
    await this.signupRepeatPassword.fill(data.repeatPass);
  }

  getNameError() {
    return this.page.locator("#signupName + .invalid-feedback");
  }
  getLastNameError() {
    return this.page.locator("#signupLastName + .invalid-feedback");
  }
  getEmailError() {
    return this.page.locator("#signupEmail + .invalid-feedback");
  }
  getPasswordError() {
    return this.page.locator("#signupPassword + .invalid-feedback");
  }
  getRepeatPasswordError() {
    return this.page.locator("#signupRepeatPassword + .invalid-feedback");
  }
}
