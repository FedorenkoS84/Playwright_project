import test, { expect } from "@playwright/test";
import HomePage from "../../pom/pages/HomePage";
import { VALID_USER1 } from "../../test-data/users";
import SignInForm from "../../pom/forms/SignInForm";
import GaragePage from "../../pom/pages/GaragePage";

test.describe("Sign in and save storage state", () => {
  let homePage: HomePage;
  let signInForm: SignInForm;
  let garagePage: GaragePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signInForm = new SignInForm(page);
    garagePage = new GaragePage(page);
    await homePage.open();
    await homePage.signInButton.click();
  });
  test("Valid user1 sign in and save storage state", async ({ page }) => {
    await signInForm.login(VALID_USER1.email, VALID_USER1.password);
    await expect(garagePage.pageTitle).toBeVisible();
    await page.context().storageState({ path: "./test-data/states/validUser1StorageState.json" });
  });
});
