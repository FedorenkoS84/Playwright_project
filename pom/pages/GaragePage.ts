import { Locator, Page } from "@playwright/test";

class GaragePage {
  readonly page: Page;
  readonly addCarButton: Locator;
  readonly brandSelect: Locator;
  readonly modelSelect: Locator;
  readonly mileageField: Locator;
  readonly addButton: Locator;
  readonly removeCarButton: Locator;
  readonly confirmRemoveButton: Locator;
  readonly carItems: Locator;
  readonly pageTitle: Locator;
  async open() {
    await this.page.goto("/panel/garage", { waitUntil: "networkidle" });
  }
  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator("h1", { hasText: "Garage" });
    this.addCarButton = page.getByRole("button", { name: "Add car" });
    this.brandSelect = page.getByLabel("Brand");
    this.modelSelect = page.getByLabel("Model");
    this.mileageField = page.locator("#addCarMileage");
    this.addButton = page.getByRole("button", { name: "Add" });
    this.removeCarButton = page.getByRole("button", { name: "Remove car" });
    this.confirmRemoveButton = page.getByRole("button", { name: "Remove" });
    this.carItems = page.locator(".car-item");
  }

  getCarItem(index = 0): Locator {
    return this.carItems.nth(index);
  }

  getCarName(index = 0): Locator {
    return this.getCarItem(index).locator(".car_name");
  }

  getMileageInput(index = 0): Locator {
    return this.getCarItem(index).locator('input[name="miles"]');
  }

  async addCar(brand: string, model: string, mileage: string): Promise<void> {
    await this.addCarButton.click();
    await this.brandSelect.selectOption(brand);
    await this.modelSelect.selectOption(model);
    await this.mileageField.fill(mileage);
    await this.addButton.click();
  }

  async removeCar(index = 0): Promise<void> {
    await this.getCarItem(index).locator(".icon-edit").click();
    await this.removeCarButton.click();
    await this.confirmRemoveButton.click();
    await this.getCarItem(index).waitFor({ state: "hidden" });
  }

  async removeAllCars(): Promise<void> {
    while (await this.carItems.first().isVisible()) {
      await this.removeCar(0);
    }
  }
}

export default GaragePage;
