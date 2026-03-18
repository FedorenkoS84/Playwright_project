import { Locator, Page } from "@playwright/test";

class ForgotPasswordForm {
  // Form fields and methods
  private readonly page: Page;
  public readonly formTitle: Locator;
  constructor(page: Page) {
    this.page = page;
    this.formTitle = this.page.getByRole("heading", {
      name: "Restore access",
    });
  }
}

export default ForgotPasswordForm;
