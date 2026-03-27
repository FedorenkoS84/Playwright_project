import test, { expect } from "@playwright/test";
import HomePage from "../pom/pages/HomePage";
import SignInForm from "../pom/forms/SignInForm";
import { VALID_USER1 } from "../test-data/users";
import { faker } from "@faker-js/faker";
import { SignInValidationMessages } from "../test-data/messages";
import ForgotPasswordForm from "../pom/forms/ForgotPasswordForm";
test.describe("Sign in form", () => {
  let homePage: HomePage;
  let signInForm: SignInForm;
  let forgotPasswordForm: ForgotPasswordForm;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signInForm = new SignInForm(page);
    forgotPasswordForm = new ForgotPasswordForm(page);
    signInForm = new SignInForm(page);
    await page.goto("/");
    await homePage.signInButton.click();
  });

  test.describe("SignIn Process", () => {
    //Successful sign in
    test("Successful sign in", async ({ page }) => {
      await page
        .context()
        .storageState({ path: "./test-data/states/initialStorageState.json" });
      await signInForm.login(VALID_USER1.email, VALID_USER1.password);
      await expect(page.locator("h1")).toHaveText("Garage");
      await page
        .context()
        .storageState({ path: "./test-data/states/finalStorageState.json" });
    });
    //Sign in with empty email
    test("Sign in with empty email", async () => {
      await signInForm.triggerValidationErrorOnField(signInForm.emailField);
      await expect(signInForm.loginButton).toBeDisabled();
      await expect(signInForm.validationError).toHaveText(
        SignInValidationMessages.emptyEmail,
      );
      await expect(signInForm.emailField).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });

    //Sign in with empty password
    test("Sign in with empty password", async () => {
      await signInForm.triggerValidationErrorOnField(signInForm.passwordField);
      await expect(signInForm.loginButton).toBeDisabled();
      await expect(signInForm.validationError).toHaveText(
        SignInValidationMessages.emptyPassword,
      );
      await expect(signInForm.passwordField).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });

    //Sign in with wrong password
    test("Sign in with wrong password", async () => {
      await signInForm.login(faker.internet.email(), faker.internet.password());
      await expect(signInForm.wrongDataError).toHaveText(
        SignInValidationMessages.wrongData,
      );
      await expect(signInForm.wrongDataError).toHaveCSS(
        "color",
        "rgb(114, 28, 36)",
      );
    });
    test("Sign in with wrong email", async ({ page }) => {
      await page.locator("#signinEmail").fill("fedorenkos084+test1@gmail.com");
      await page.locator("#signinPassword").fill("12345Test");
      await page.getByRole("button", { name: "Login" }).click();
      await expect(page.locator(".alert-danger")).toHaveText(
        "Wrong email or password",
      );
      await expect(page.locator(".alert-danger")).toHaveCSS(
        "color",
        "rgb(114, 28, 36)",
      );
    });
    //CLose signin form
    test("CLose signin form", async ({ page }) => {
      await page.locator("#signinEmail").fill("fedorenkos084+test1@gmail.com");
      await page.locator("#signinPassword").fill("12345Test");
      await page.getByRole("button", { name: "Login" }).click();
      await expect(page.locator(".alert-danger")).toHaveText(
        "Wrong email or password",
      );
      await expect(page.locator(".alert-danger")).toHaveCSS(
        "color",
        "rgb(114, 28, 36)",
      );
    });
  });

  test.describe("Form navigation", () => {
    test("Close signin form", async ({ page }) => {
      await page.locator("button.close").click();
      await expect(
        page.locator(".modal-title", { hasText: "Log in" }),
      ).not.toBeVisible();
    });
    //Open Registration form
    test("Open Registration form", async ({ page }) => {
      await page.getByRole("button", { name: "Registration" }).click();
      await expect(
        page.getByRole("heading", { name: "Registration" }),
      ).toBeVisible();
    });
    //Open Forgot Password form
    test("Open Forgot Password form", async ({ page }) => {
      await page.getByRole("button", { name: "Forgot password" }).click();
      await expect(forgotPasswordForm.formTitle).toBeVisible();
    });
  });
});
