import { test, expect } from "../utils/garageFixture";

test("Add car via userGaragePage fixture", async ({ userGaragePage }) => {
  await userGaragePage.removeAllCars();
  await userGaragePage.addCar("Audi", "Q7", "15000");
  await expect(userGaragePage.getCarName(0)).toHaveText("Audi Q7");
  await expect(userGaragePage.getMileageInput(0)).toHaveValue("15000");
});
