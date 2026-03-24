import { test as base } from "@playwright/test";
import GaragePage from "../pom/pages/GaragePage";

type GarageFixture = {
  userGaragePage: GaragePage;
};

export const test = base.extend<GarageFixture>({
  context: async ({ browser, contextOptions }, use) => {
    const context = await browser.newContext({
      ...contextOptions,
      storageState: "./test-data/states/validUser1StorageState.json",
    });
    await use(context);
    await context.close();
  },
  userGaragePage: async ({ page }, use) => {
    const garagePage = new GaragePage(page);
    await garagePage.open();
    await use(garagePage);
  },
});

export { expect } from "@playwright/test";
