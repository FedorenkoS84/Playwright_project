import { test, expect } from "@playwright/test";
import { RegistrationForm } from "../pom/pages/RegistrationForm";

test.describe("Sign up form", () => {
  let registrationForm: RegistrationForm;

  const timestamp = Date.now();
  const testEmail = `aqa-fedorenko${timestamp}@gmail.com`;
  const errorBorderColor = "rgb(220, 53, 69)";

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    registrationForm = new RegistrationForm(page);
    await page.getByRole("button", { name: "Sign up" }).click();
  });

  // SUCCESSFUL REGISTRATION

  test("Successful registration", async () => {
    await registrationForm.fillRegistrationForm({
      name: "Serhiy",
      lastName: "Fedorenko",
      email: testEmail,
      pass: "Password123",
      repeatPass: "Password123",
    });

    await registrationForm.registerButton.click();

    await expect(registrationForm.garageHeading).toBeVisible();
  });

  // REGISTER BUTTON DISABLED

  test("Register button should be disabled with empty form", async () => {
    await expect(registrationForm.registerButton).toBeDisabled();
  });

  // NAME

  test("Name required", async () => {
    await registrationForm.triggerValidationError(registrationForm.signupName);
    await expect(registrationForm.getNameError()).toHaveText("Name required");
  });

  test("Name too short", async () => {
    await registrationForm.signupName.fill("A");
    await registrationForm.signupName.blur();
    await expect(registrationForm.getNameError()).toHaveText(
      "Name has to be from 2 to 20 characters long",
    );
  });

  test("Name too long", async () => {
    const longName = "A".repeat(21);
    await registrationForm.signupName.fill(longName);
    await registrationForm.signupName.blur();
    await expect(registrationForm.getNameError()).toHaveText(
      "Name has to be from 2 to 20 characters long",
    );
  });

  test("Name invalid characters", async () => {
    await registrationForm.signupName.fill("1234");
    await registrationForm.signupName.blur();
    await expect(registrationForm.getNameError()).toHaveText("Name is invalid");
  });
  test("Name border red when invalid", async () => {
    await registrationForm.signupName.fill("A");
    await registrationForm.signupName.blur();
    await expect(registrationForm.signupName).toHaveCSS(
      "border-color",
      errorBorderColor,
    );
  });

  // LAST NAME

  test("Last name required", async () => {
    await registrationForm.triggerValidationError(
      registrationForm.signupLastName,
    );
    await expect(registrationForm.getLastNameError()).toHaveText(
      "Last name required",
    );
  });

  test("Last name too short", async () => {
    await registrationForm.signupLastName.fill("A");
    await registrationForm.signupLastName.blur();
    await expect(registrationForm.getLastNameError()).toHaveText(
      "Last name has to be from 2 to 20 characters long",
    );
  });

  test("Last name too long", async () => {
    const longName = "A".repeat(21);
    await registrationForm.signupLastName.fill(longName);
    await registrationForm.signupLastName.blur();
    await expect(registrationForm.getLastNameError()).toHaveText(
      "Last name has to be from 2 to 20 characters long",
    );
  });

  test("Last name invalid characters", async () => {
    await registrationForm.signupLastName.fill("1234");
    await registrationForm.signupLastName.blur();
    await expect(registrationForm.getLastNameError()).toHaveText(
      "Last name is invalid",
    );
  });

  test("Last name border red when invalid", async () => {
    await registrationForm.signupLastName.fill("A");
    await registrationForm.signupLastName.blur();
    await expect(registrationForm.signupLastName).toHaveCSS(
      "border-color",
      errorBorderColor,
    );
  });

  // EMAIL

  test("Email required", async () => {
    await registrationForm.triggerValidationError(registrationForm.signupEmail);
    await expect(registrationForm.getEmailError()).toHaveText("Email required");
  });

  test("Email incorrect format", async () => {
    await registrationForm.signupEmail.fill("test");
    await registrationForm.signupEmail.blur();
    await expect(registrationForm.getEmailError()).toHaveText(
      "Email is incorrect",
    );
  });

  test("Email border red when invalid", async () => {
    await registrationForm.signupEmail.fill("test");
    await registrationForm.signupEmail.blur();
    await expect(registrationForm.signupEmail).toHaveCSS(
      "border-color",
      errorBorderColor,
    );
  });

  // PASSWORD

  test("Password required", async () => {
    await registrationForm.triggerValidationError(
      registrationForm.signupPassword,
    );
    await expect(registrationForm.getPasswordError()).toHaveText(
      "Password required",
    );
  });

  test("Password too short", async () => {
    await registrationForm.signupPassword.fill("123");
    await registrationForm.signupPassword.blur();
    await expect(registrationForm.getPasswordError()).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    );
  });

  test("Password border red when invalid", async () => {
    await registrationForm.signupPassword.fill("123");
    await registrationForm.signupPassword.blur();
    await expect(registrationForm.signupPassword).toHaveCSS(
      "border-color",
      errorBorderColor,
    );
  });

  // REPEAT PASSWORD

  test("Repeat password required", async () => {
    await registrationForm.triggerValidationError(
      registrationForm.signupRepeatPassword,
    );
    await expect(registrationForm.getRepeatPasswordError()).toHaveText(
      "Re-enter password required",
    );
  });

  test("Repeat password mismatch", async () => {
    await registrationForm.signupPassword.fill("Password123");
    await registrationForm.signupRepeatPassword.fill("Password321");
    await registrationForm.signupRepeatPassword.blur();
    await expect(registrationForm.getRepeatPasswordError()).toHaveText(
      "Passwords do not match",
    );
  });

  test("Repeat password border red when invalid", async () => {
    await registrationForm.signupRepeatPassword.fill("123");
    await registrationForm.signupRepeatPassword.blur();
    await expect(registrationForm.signupRepeatPassword).toHaveCSS(
      "border-color",
      errorBorderColor,
    );
  });

  // REGISTER BUTTON ENABLED

  test("Register button should be enabled with valid data", async () => {
    await registrationForm.fillRegistrationForm({
      name: "Serhiy",
      lastName: "Fedorenko",
      email: `aqa-fedorenko${Date.now()}@gmail.com`,
      pass: "Password123",
      repeatPass: "Password123",
    });

    await expect(registrationForm.registerButton).toBeEnabled();
  });
});
