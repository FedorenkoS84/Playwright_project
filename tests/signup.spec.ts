import { test, expect } from "@playwright/test";
import { RegistrationPage } from "../pom/RegistrationPage";

test.describe("Sign up form", () => {
  let registrationPage: RegistrationPage;

  const timestamp = Date.now();
  const testEmail = `aqa-fedorenko${timestamp}@gmail.com`;
  const errorBorderColor = "rgb(220, 53, 69)";

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    registrationPage = new RegistrationPage(page);
    await page.getByRole("button", { name: "Sign up" }).click();
  });

  // SUCCESSFUL REGISTRATION

  test("Successful registration", async () => {
    await registrationPage.fillRegistrationForm({
      name: "Serhiy",
      lastName: "Fedorenko",
      email: testEmail,
      pass: "Password123",
      repeatPass: "Password123",
    });

    await registrationPage.registerButton.click();

    await expect(registrationPage.garageHeading).toBeVisible();
  });

  // REGISTER BUTTON DISABLED

  test("Register button should be disabled with empty form", async () => {
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  // NAME

  test("Name required", async () => {
    await registrationPage.triggerValidationError(registrationPage.signupName);
    await expect(registrationPage.getNameError()).toHaveText("Name required");
  });

  test("Name too short", async () => {
    await registrationPage.signupName.fill("A");
    await registrationPage.signupName.blur();
    await expect(registrationPage.getNameError()).toHaveText(
      "Name has to be from 2 to 20 characters long",
    );
  });

  test("Name too long", async () => {
    const longName = "A".repeat(21);
    await registrationPage.signupName.fill(longName);
    await registrationPage.signupName.blur();
    await expect(registrationPage.getNameError()).toHaveText(
      "Name has to be from 2 to 20 characters long",
    );
  });

  test("Name invalid characters", async () => {
    await registrationPage.signupName.fill("1234");
    await registrationPage.signupName.blur();
    await expect(registrationPage.getNameError()).toHaveText("Name is invalid");
  });

  test("Name border red when invalid", async () => {
    await registrationPage.signupName.fill("A");
    await registrationPage.signupName.blur();
    await expect(registrationPage.signupName).toHaveCSS(
      "border-color",
      errorBorderColor,
    );
  });

  // LAST NAME

  test("Last name required", async () => {
    await registrationPage.triggerValidationError(
      registrationPage.signupLastName,
    );
    await expect(registrationPage.getLastNameError()).toHaveText(
      "Last name required",
    );
  });

  test("Last name too short", async () => {
    await registrationPage.signupLastName.fill("A");
    await registrationPage.signupLastName.blur();
    await expect(registrationPage.getLastNameError()).toHaveText(
      "Last name has to be from 2 to 20 characters long",
    );
  });

  test("Last name too long", async () => {
    const longName = "A".repeat(21);
    await registrationPage.signupLastName.fill(longName);
    await registrationPage.signupLastName.blur();
    await expect(registrationPage.getLastNameError()).toHaveText(
      "Last name has to be from 2 to 20 characters long",
    );
  });

  test("Last name invalid characters", async () => {
    await registrationPage.signupLastName.fill("1234");
    await registrationPage.signupLastName.blur();
    await expect(registrationPage.getLastNameError()).toHaveText(
      "Last name is invalid",
    );
  });

  test("Last name border red when invalid", async () => {
    await registrationPage.signupLastName.fill("A");
    await registrationPage.signupLastName.blur();
    await expect(registrationPage.signupLastName).toHaveCSS(
      "border-color",
      errorBorderColor,
    );
  });

  // EMAIL

  test("Email required", async () => {
    await registrationPage.triggerValidationError(registrationPage.signupEmail);
    await expect(registrationPage.getEmailError()).toHaveText("Email required");
  });

  test("Email incorrect format", async () => {
    await registrationPage.signupEmail.fill("test");
    await registrationPage.signupEmail.blur();
    await expect(registrationPage.getEmailError()).toHaveText(
      "Email is incorrect",
    );
  });

  test("Email border red when invalid", async () => {
    await registrationPage.signupEmail.fill("test");
    await registrationPage.signupEmail.blur();
    await expect(registrationPage.signupEmail).toHaveCSS(
      "border-color",
      errorBorderColor,
    );
  });

  // PASSWORD

  test("Password required", async () => {
    await registrationPage.triggerValidationError(
      registrationPage.signupPassword,
    );
    await expect(registrationPage.getPasswordError()).toHaveText(
      "Password required",
    );
  });

  test("Password too short", async () => {
    await registrationPage.signupPassword.fill("123");
    await registrationPage.signupPassword.blur();
    await expect(registrationPage.getPasswordError()).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    );
  });

  test("Password border red when invalid", async () => {
    await registrationPage.signupPassword.fill("123");
    await registrationPage.signupPassword.blur();
    await expect(registrationPage.signupPassword).toHaveCSS(
      "border-color",
      errorBorderColor,
    );
  });

  // REPEAT PASSWORD

  test("Repeat password required", async () => {
    await registrationPage.triggerValidationError(
      registrationPage.signupRepeatPassword,
    );
    await expect(registrationPage.getRepeatPasswordError()).toHaveText(
      "Re-enter password required",
    );
  });

  test("Repeat password mismatch", async () => {
    await registrationPage.signupPassword.fill("Password123");
    await registrationPage.signupRepeatPassword.fill("Password321");
    await registrationPage.signupRepeatPassword.blur();
    await expect(registrationPage.getRepeatPasswordError()).toHaveText(
      "Passwords do not match",
    );
  });

  test("Repeat password border red when invalid", async () => {
    await registrationPage.signupRepeatPassword.fill("123");
    await registrationPage.signupRepeatPassword.blur();
    await expect(registrationPage.signupRepeatPassword).toHaveCSS(
      "border-color",
      errorBorderColor,
    );
  });

  // REGISTER BUTTON ENABLED

  test("Register button should be enabled with valid data", async () => {
    await registrationPage.fillRegistrationForm({
      name: "Serhiy",
      lastName: "Fedorenko",
      email: `aqa-fedorenko${Date.now()}@gmail.com`,
      pass: "Password123",
      repeatPass: "Password123",
    });

    await expect(registrationPage.registerButton).toBeEnabled();
  });
});
