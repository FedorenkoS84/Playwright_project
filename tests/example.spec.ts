// import { test, expect } from "@playwright/test";

// test.describe("Group of tests", () => {
//   test.beforeAll(() => {});
//   test("has title", async ({ page }) => {
//     await page.goto("https://playwright.dev/");

//     // Expect a title "to contain" a substring.
//     await expect(page).toHaveTitle(/Playwright/);
//   });

//   test("get started link", async ({ page }) => {
//     await page.goto("https://playwright.dev/");

//     // Click the get started link.
//     await page.getByRole("link", { name: "Get started" }).click();

//     // Expects page to have a heading with the name of Installation.
//     await expect(
//       page.getByRole("heading", { name: "Installation" }),
//     ).toBeVisible();
//   });
// //   test("Successful sign in", async ({ page }) => {
// //     await page.goto("/");
// //     await page.locator("#signinEmail").fill("fedorenkos084+test1@gmail.com");
// //     await page.locator("#signinPassword").fill("12345Test1");
// //     await page.getByRole("button", { name: "Login" }).click();
// //     await expect(
// //       page.getByRole("heading", { name: "Garage" }).first(),
// //     ).toBeVisible();
// //     await expect(page).toHaveScreenshot("garage");
// //   });
// // });
