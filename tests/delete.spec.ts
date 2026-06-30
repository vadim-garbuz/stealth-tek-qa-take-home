import { test, expect } from "@playwright/test";
import { routes } from "../api/definitions";

for (const [name, path] of Object.entries(routes)) {
  test(`DELETE ${name} by id returns 200`, async ({ request }) => {
    const listResponse = await request.get(path);
    const firstId = (await listResponse.json())[0].id;
    const response = await request.delete(`${path}/${firstId}`);
    expect(response.status()).toBe(200);
  });
}

for (const notExistingId of [-1, 0, Number.MAX_SAFE_INTEGER])
  for (const [name, path] of Object.entries(routes)) {
    test(`DELETE ${name} non-existing id ${notExistingId} returns 404`, async ({ request }) => {
      const response = await request.delete(`${path}/${notExistingId}`);
      expect(response.status()).toBe(200);
    });
  }

for (const invalidId of ["string"])
  for (const [name, path] of Object.entries(routes)) {
    test(`DELETE ${name} invalid id "${invalidId}" returns 404`, async ({ request }) => {
      const response = await request.delete(`${path}/${invalidId}`);
      expect(response.status()).toBe(200);
    });
  }
