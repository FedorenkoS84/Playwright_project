import { expect, chromium } from "@playwright/test";
import { test } from "../utils/screenSizeFixture";

test("Open wikipedia on small screen", async ({ pageSmall }) => {
  await pageSmall.goto("https://www.wikipedia.org/");
  await expect(pageSmall.locator(".central-featured")).toBeVisible();
});
test("Open wikipedia on medium screen", async ({ pageMedium }) => {
  await pageMedium.goto("https://www.wikipedia.org/");
  await expect(pageMedium.locator(".central-featured")).toBeVisible();
});
test("Open wikipedia on large screen", async ({ pageLarge }) => {
  await pageLarge.goto("https://www.wikipedia.org/");
  await expect(pageLarge.locator(".central-featured")).toBeVisible();
});
