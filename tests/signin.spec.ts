import test, { expect } from "@playwright/test";

test.describe("Sign in form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator(".header_signin").click();
  });

  test.describe("SignIn Process", () => {
    //Successful sign in
    test("Successful sign in", async ({ page }) => {
      await page.locator("#signinEmail").fill("fedorenkos084+test1@gmail.com");
      await page.locator("#signinPassword").fill("12345Test1");
      await page.getByRole("button", { name: "Login" }).click();
      await expect(
        page.getByRole("heading", { name: "Garage" }).first(),
      ).toBeVisible();
    });
    //Sign in with empty email
    test("Sign in with empty email", async ({ page }) => {
      await page.locator("#signinEmail").fill("");
      await page.locator("#signinEmail").focus();
      await page.locator("#signinEmail").blur();
      await page.locator("#signinPassword").fill("12345Test");
      await expect(page.getByRole("button", { name: "Login" })).toBeDisabled();
      await expect(page.locator("div.invalid-feedback p")).toHaveText(
        "Email required",
      );
      await expect(page.locator("#signinEmail")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });

    //Sign in with empty password
    test("Sign in with empty password", async ({ page }) => {
      await page.locator("#signinEmail").fill("fedorenko084+test1@gmail.com");
      await page.locator("#signinPassword").focus();
      await page.locator("#signinPassword").blur();

      await expect(page.getByRole("button", { name: "Login" })).toBeDisabled();
      await expect(page.locator("div.invalid-feedback p")).toHaveText(
        "Password required",
      );
      await expect(page.locator("#signinPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
    });

    //Sign in with wrong password
    test("Sign in with wrong password", async ({ page }) => {
      await page.locator("#signinEmail").fill("fedorenko084+test1@gmail.com");
      await page.locator("#signinPassword").fill("123");
      await page.getByRole("button", { name: "Login" }).click();
      await expect(page.locator(".alert-danger")).toHaveText(
        "Wrong email or password",
      );
      await expect(page.locator(".alert-danger")).toHaveCSS(
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
      await expect(
        page.getByRole("heading", { name: "Restore access" }),
      ).toBeVisible();
    });
  });
});
