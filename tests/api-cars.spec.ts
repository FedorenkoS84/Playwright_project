import { test, expect } from "@playwright/test";

test.describe("Cars API", () => {
  test.use({ storageState: "./test-data/states/validUser1StorageState.json" });

  test("Positive: create car returns 201", async ({ request }) => {
    const response = await request.post("/api/cars", {
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: 10000,
      },
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.status).toBe("ok");
    expect(body.data.carBrandId).toBe(1);
    expect(body.data.carModelId).toBe(1);
    expect(body.data.mileage).toBe(10000);

    // Cleanup
    await request.delete(`/api/cars/${body.data.id}`);
  });

  test("Negative: create car without mileage returns 400", async ({ request }) => {
    const response = await request.post("/api/cars", {
      data: {
        carBrandId: 1,
        carModelId: 1,
        // mileage відсутній
      },
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.status).toBe("error");
  });

  test("Negative: create car with invalid brandId returns 404", async ({ request }) => {
    const response = await request.post("/api/cars", {
      data: {
        carBrandId: 9999,
        carModelId: 1,
        mileage: 5000,
      },
    });

    expect(response.status()).toBe(404);

    const body = await response.json();
    expect(body.status).toBe("error");
  });
});
