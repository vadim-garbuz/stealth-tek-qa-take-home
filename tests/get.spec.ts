import { test, expect } from "@playwright/test";
import { routes } from "../api/definitions";

for (const [name, path] of Object.entries(routes)) {
  test(`GET ${name} returns 200`, async ({ request }) => {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
  });
}

// full schema validation tests are skipped due to time constraints
// tests that rely on specific data being present would still fail and report errors but in crude way

for (const [name, path] of Object.entries(routes)) {
  test(`GET ${name} by id returns 200`, async ({ request }) => {
    const routeResponse = await request.get(path);
    const routeResponseData = await routeResponse.json();
    const firstId = routeResponseData[0].id;
    const response = await request.get(`${path}/${firstId}`);
    expect(response.status()).toBe(200);
  });
}

for (const [name, path] of Object.entries(routes)) {
  test(`GET ${name} by id returns the same data as list`, async ({
    request,
  }) => {
    const routeResponse = await request.get(path);
    const routeResponseData = await routeResponse.json();
    const firstId = routeResponseData[0].id;
    const response = await request.get(`${path}/${firstId}`);
    expect(await response.json()).toEqual(routeResponseData[0]);
  });
}


for (const [name, path] of Object.entries(routes)) {
  test(`GET ${name} with filter by id returns the same data as list`, async ({
    request,
  }) => {
    const routeResponse = await request.get(path);
    const routeResponseData = await routeResponse.json();
    const firstId = routeResponseData[0].id;
    const response = await request.get(`${path}?id=${firstId}`);
    expect(await response.json()).toEqual([routeResponseData[0]]);
  });
}

for (const notExistingId of [-1, 0, Number.MAX_SAFE_INTEGER])
  for (const [name, path] of Object.entries(routes)) {
    test(`GET ${name} non-existing id ${notExistingId}`, async ({
      request,
    }) => {
      const response = await request.get(`${path}/${notExistingId}`);
      expect(response.status()).toBe(404);
    });
  }

for (const invalidId of ["string"])
  for (const [name, path] of Object.entries(routes)) {
    test(`GET ${name} invalid id "${invalidId}"`, async ({
      request,
    }) => {
      const response = await request.get(`${path}/${invalidId}`);
      expect(response.status()).toBe(404);
    });
  }
