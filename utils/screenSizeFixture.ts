import { test as base, expect, Page } from "@playwright/test";

type ScreenSize = {
  pageSmall: Page;
  pageMedium: Page;
  pageLarge: Page;
};

export const test = base.extend<ScreenSize>({
  pageSmall: async ({ page }, use) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await use(page);
  },
  pageMedium: async ({ page }, use) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await use(page);
  },
  pageLarge: async ({ page }, use) => {
    await page.setViewportSize({ width: 1444, height: 900 });
    await use(page);
  },
});
