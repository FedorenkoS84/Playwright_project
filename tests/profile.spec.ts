import { test, expect } from "@playwright/test";

test.use({ storageState: "./test-data/states/validUser1StorageState.json" });

test.describe("Profile page", () => {
  test("should display user information correctly", async ({ page }) => {
    await page.route("**/api/users/profile", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          status: "ok",
          data: {
            userId: 332928,
            photoFilename: "default-user.png",
            name: "Serhii",
            lastName: "Fedorenko",
          },
        }),
      });
    });

    await page.goto("/panel/profile");

    await expect(page.getByText("Serhii")).toBeVisible();
    await expect(page.getByText("Fedorenko")).toBeVisible();
  });
});
