import { test, expect } from "@playwright/test";

test.describe("Sign up form", () => {
  const timestamp = Date.now();
  const testEmail = `aqa-fedorenko${timestamp}@gmail.com`;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator(".hero-descriptor_btn").click();
  });

  test.describe("Registration Form", () => {
    //Test1 Successful Registration
    test("Success Registration", async ({ page }) => {
      await page.locator("#signupName").fill("Serhii");
      await page.locator("#signupLastName").fill("Fedorenko");
      await page.locator("#signupEmail").fill(testEmail);
      await page.locator("#signupPassword").fill("Qwer12345");
      await page.locator("#signupRepeatPassword").fill("Qwer12345");
      await page.getByRole("button", { name: "Register" }).click();
      await expect(
        page.getByRole("heading", { name: "Garage" }).first(),
      ).toBeVisible({ timeout: 10000 });
    });
    test.describe("Field Name", () => {
      //Test2 - Empty field - "Name required"

      test("Empty field validation", async ({ page }) => {
        const nameInput = page.locator("#signupName");
        await nameInput.focus();
        await nameInput.blur();
        const errorMessage = page.locator(".invalid-feedback");
        await expect(errorMessage).toHaveText("Name required");
        await expect(errorMessage).toHaveCSS(
          "border-color",
          "rgb(220, 53, 69)",
        );
      });
      //Test3 - Name is invalid
      test("Name is invalid", async ({ page }) => {
        const nameInput = page.locator("#signupName");
        await nameInput.fill(" S ");
        await nameInput.blur();
        const error = page.locator("#signupName ~ .invalid-feedback");
        await expect(error).toHaveText("Name is invalid");
      });
      //Test4 - Wrong length - "Name has to be from 2 to 20 characters long. The field name can ba any English symbol min=2 max=20. Need to ignore space and please use function trim"
      test("Wrong length (min)", async ({ page }) => {
        const nameInput = page.locator("#signupName");
        await nameInput.fill("S");
        await nameInput.blur();
        await expect(
          page.locator("#signupName ~ .invalid-feedback"),
        ).toHaveText("Name has to be from 2 to 20 characters long");
      });
      test("Wrong length (max)", async ({ page }) => {
        const nameInput = page.locator("#signupName");
        const longName = "A".repeat(21);
        await nameInput.fill(longName);
        await nameInput.blur();
        await expect(
          page.locator("#signupName ~ .invalid-feedback"),
        ).toHaveText("Name has to be from 2 to 20 characters long");
      });
      //Test5 - Border color red
      test("Border color red", async ({ page }) => {
        const nameInput = page.locator("#signupName");
        await nameInput.focus();
        await nameInput.blur();
        await expect(nameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
      });
    });
    test.describe("Field Last Name", () => {
      //Test2 - Empty field - "Last Name is required"
      test("Empty field Last Name", async ({ page }) => {
        const lastNameInput = page.locator("#signupLastName");
        await lastNameInput.focus();
        await lastNameInput.blur();

        await expect(
          page.locator("#signupLastName ~ .invalid-feedback"),
        ).toHaveText("Last name required");
      });

      //Test3 - Wrong data - "Last Name is invalid"
      test("Last name is invalid", async ({ page }) => {
        const lastNameInput = page.locator("#signupLastName");
        await lastNameInput.fill(" S ");
        await lastNameInput.blur();

        await expect(
          page.locator("#signupLastName ~ .invalid-feedback"),
        ).toHaveText("Last name is invalid");
      });

      //Test4 - Wrong length
      test("LastName Wrong length (min)", async ({ page }) => {
        const lastNameInput = page.locator("#signupLastName");
        await lastNameInput.fill("F");
        await lastNameInput.blur();

        await expect(
          page.locator("#signupLastName ~ .invalid-feedback"),
        ).toHaveText("Last name has to be from 2 to 20 characters long");
      });

      test("LastName Wrong length (max)", async ({ page }) => {
        const lastNameInput = page.locator("#signupLastName");
        const longLastName = "B".repeat(21);

        await lastNameInput.fill(longLastName);
        await lastNameInput.blur();

        await expect(
          page.locator("#signupLastName ~ .invalid-feedback"),
        ).toHaveText("Last name has to be from 2 to 20 characters long");
      });

      //Test5 - Border color red
      test("LastName Border color red", async ({ page }) => {
        const lastNameInput = page.locator("#signupLastName");
        await lastNameInput.focus();
        await lastNameInput.blur();

        await expect(lastNameInput).toHaveCSS(
          "border-color",
          "rgb(220, 53, 69)",
        );
      });
    });
    test.describe("Field Email", () => {
      //Test1 - Empty field - "Email required"
      test("Empty field Email", async ({ page }) => {
        const emailInput = page.locator("#signupEmail");
        await emailInput.focus();
        await emailInput.blur();

        await expect(
          page.locator("#signupEmail ~ .invalid-feedback"),
        ).toHaveText("Email required");
      });

      //Test2 - Wrong data - "Email is incorrect"
      test("Email is incorrect", async ({ page }) => {
        const emailInput = page.locator("#signupEmail");
        await emailInput.fill("serg@gmail");
        await emailInput.blur();

        await expect(
          page.locator("#signupEmail ~ .invalid-feedback"),
        ).toHaveText("Email is incorrect");
      });

      //Test3 - Border color red
      test("Email Border color red", async ({ page }) => {
        const emailInput = page.locator("#signupEmail");
        await emailInput.focus();
        await emailInput.blur();

        await expect(emailInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
      });
    });
    test.describe("Field Password", () => {
      const passwordErrorText =
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter";

      //Test1 - Empty field - "Password required"
      test("Password required", async ({ page }) => {
        const passwordInput = page.locator("#signupPassword");
        await passwordInput.focus();
        await passwordInput.blur();

        await expect(
          page.locator("#signupPassword ~ .invalid-feedback"),
        ).toHaveText("Password required");
      });

      //Test3 - Wrong data (Validation messages)
      test("Password is shorter than 8 characters", async ({ page }) => {
        await page.locator("#signupPassword").fill("Aa1");
        await page.locator("#signupPassword").blur();

        await expect(
          page.locator("#signupPassword ~ .invalid-feedback"),
        ).toHaveText(passwordErrorText);
      });

      test("Password is longer than 15 characters", async ({ page }) => {
        const longPass = "Aa1" + "a".repeat(13); // 16 символів
        await page.locator("#signupPassword").fill(longPass);
        await page.locator("#signupPassword").blur();

        await expect(
          page.locator("#signupPassword ~ .invalid-feedback"),
        ).toHaveText(passwordErrorText);
      });

      test("Password has no integer", async ({ page }) => {
        await page.locator("#signupPassword").fill("PasswordA");
        await page.locator("#signupPassword").blur();

        await expect(
          page.locator("#signupPassword ~ .invalid-feedback"),
        ).toHaveText(passwordErrorText);
      });

      test("Password has no capital letter", async ({ page }) => {
        await page.locator("#signupPassword").fill("password1");
        await page.locator("#signupPassword").blur();

        await expect(
          page.locator("#signupPassword ~ .invalid-feedback"),
        ).toHaveText(passwordErrorText);
      });

      test("Password has no small letter", async ({ page }) => {
        await page.locator("#signupPassword").fill("PASSWORD1");
        await page.locator("#signupPassword").blur();

        await expect(
          page.locator("#signupPassword ~ .invalid-feedback"),
        ).toHaveText(passwordErrorText);
      });

      //Test4 - Border color red
      test("Password Border color red", async ({ page }) => {
        const passwordInput = page.locator("#signupPassword");
        await passwordInput.focus();
        await passwordInput.blur();

        await expect(passwordInput).toHaveCSS(
          "border-color",
          "rgb(220, 53, 69)",
        );
      });
    });
    test.describe("Field Re-enter password", () => {
      const passwordErrorText =
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter";

      //Test1 - Empty field - "Re-enter password required"
      test("RepeatPassword Empty field", async ({ page }) => {
        const repeatPasswordInput = page.locator("#signupRepeatPassword");
        await repeatPasswordInput.focus();
        await repeatPasswordInput.blur();

        await expect(
          page.locator("#signupRepeatPassword ~ .invalid-feedback"),
        ).toHaveText("Re-enter password required");
      });

      //Test2 - Wrong data
      test("Repeat password is shorter than 8 characters", async ({ page }) => {
        const repeatPasswordInput = page.locator("#signupRepeatPassword");
        await repeatPasswordInput.fill("Bb1");
        await repeatPasswordInput.blur();

        await expect(
          page.locator("#signupRepeatPassword ~ .invalid-feedback"),
        ).toHaveText(passwordErrorText);
      });

      //Test3 - Border color red
      test("Repeat password Border color red", async ({ page }) => {
        const repeatPasswordInput = page.locator("#signupRepeatPassword");
        await repeatPasswordInput.focus();
        await repeatPasswordInput.blur();

        await expect(repeatPasswordInput).toHaveCSS(
          "border-color",
          "rgb(220, 53, 69)",
        );
      });
    });
    test.describe("Button Register", () => {
      test("Register button should be enabled when form is valid", async ({
        page,
      }) => {
        const uniqueEmail = `aqa-test${Date.now()}@gmail.com`;

        await page.locator("#signupName").fill("Serg");
        await page.locator("#signupLastName").fill("Fedorenko");
        await page.locator("#signupEmail").fill(uniqueEmail);
        await page.locator("#signupPassword").fill("Password1");
        await page.locator("#signupRepeatPassword").fill("Password1");
        const registerButton = page.getByRole("button", { name: "Register" });
        await expect(registerButton).toBeEnabled();
      });

      test("Register button should be disabled when form is Empty", async ({
        page,
      }) => {
        const registerButton = page.getByRole("button", { name: "Register" });
        await expect(registerButton).toBeDisabled();
      });
    });
  });
});
