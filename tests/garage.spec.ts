import { test, expect, Locator } from "@playwright/test";
import { faker } from "@faker-js/faker";
import GaragePage from "../pom/pages/GaragePage";

test.describe("Garage page - Data Driven", () => {
  let carItem: Locator;
  let garagePage: GaragePage;
  test.use({ storageState: "./test-data/states/validUser1StorageState.json" });
  const testData = [
    { brand: "Audi", model: "Q7" },
    { brand: "BMW", model: "X5" },
    { brand: "Ford", model: "Focus" },
    { brand: "Porsche", model: "Cayenne" },
    { brand: "Fiat", model: "Panda" },
  ];

  test.beforeEach(async ({ page }) => {
    garagePage = new GaragePage(page);
    await garagePage.open();
    await garagePage.removeAllCars();
    carItem = page.locator(".car-item").first();
  });

  test.afterEach(async ({ page }) => {
    if (await carItem.isVisible()) {
      await carItem.locator(".icon-edit").click();
      await page.getByRole("button", { name: "Remove car" }).click();
      await page.getByRole("button", { name: "Remove" }).click();
    }
  });

  for (const data of testData) {
    test(`Add ${data.brand} ${data.model}`, async ({ page }) => {
      const mileage = faker.number.int({ min: 1000, max: 50000 }).toString();

      await page.getByRole("button", { name: "Add car" }).click();
      await page.getByLabel("Brand").selectOption(data.brand);
      await page.getByLabel("Model").selectOption(data.model);
      await page.locator("#addCarMileage").fill(mileage);
      await page.getByRole("button", { name: "Add" }).click();
      await expect(carItem.locator(".car_name")).toHaveText(
        `${data.brand} ${data.model}`,
      );
      await expect(carItem.locator('input[name="miles"]')).toHaveValue(mileage);
    });
  }
});
