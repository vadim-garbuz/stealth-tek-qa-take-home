import { test, expect } from "@playwright/test";
import { routes } from "../api/definitions";
import { fakeAlbum } from "../api/helpers";

test(`POST "/albums" returns 201`, async ({ request }) => {
  const album = fakeAlbum();
  const response = await request.post(routes.albums, { data: album });
  expect(response.status()).toBe(201);
  expect(await response.json()).toEqual(expect.objectContaining(album));
});

test.fail(`POST duplicated "/albums" returns 409`, async ({ request }) => {
  const album = fakeAlbum();
  await request.post(routes.albums, { data: album });
  const responseDuplicated = await request.post(routes.albums, { data: album });
  expect(responseDuplicated.status()).toBe(409);
});
