import { test, expect } from "@playwright/test";
import { routes } from "../api/definitions";
import { getPhotos, fakePhoto } from "../api/helpers";

test(`PATCH "/photos/{id}" returns 200`, async ({ request }) => {
  const first = (await getPhotos(request))[0];
  const patch = { title: fakePhoto().title };
  const response = await request.patch(`${routes.photos}/${first.id}`, { data: patch });
  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual(expect.objectContaining({ ...first, ...patch }));
});
