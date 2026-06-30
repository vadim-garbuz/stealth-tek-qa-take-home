import { test, expect } from "@playwright/test";
import { routes } from "../api/definitions";
import { fakePhoto } from "../api/helpers";

test(`POST "/photos" returns 201`, async ({ request }) => {
  const photo = fakePhoto();
  const response = await request.post(routes.photos, { data: photo });
  expect(response.status()).toBe(201);
  expect(await response.json()).toEqual(expect.objectContaining(photo));
});

test.fail(`POST duplicated "/photos" returns 409`, async ({ request }) => {
  const photo = fakePhoto();
  await request.post(routes.photos, { data: photo });
  const responseDuplicated = await request.post(routes.photos, { data: photo });
  expect(responseDuplicated.status()).toBe(409);
});
