import { test, expect } from "@playwright/test";
import { routes } from "../api/definitions";
import { getAlbums, fakeAlbum } from "../api/helpers";

test(`PATCH "/albums/{id}" returns 200`, async ({ request }) => {
  const first = (await getAlbums(request))[0];
  const patch = { title: fakeAlbum().title };
  const response = await request.patch(`${routes.albums}/${first.id}`, { data: patch });
  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual(expect.objectContaining({ ...first, ...patch }));
});
