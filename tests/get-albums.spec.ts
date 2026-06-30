import { test, expect } from "@playwright/test";
import { routes } from "../api/definitions";
import { getAlbums } from "../api/helpers";

test(`GET "/albums/{id}/photos" returns 200`, async ({ request }) => {
  const firstAlbum = (await getAlbums(request))[0];
  const response = await request.get(`${routes.albums}/${firstAlbum.id}/photos`);
  expect(response.status()).toBe(200);
  // also we should validate data
  // we can do it with known data, explicit data we created the item with or take it from other api response
});

for (const filter of ["id", "name", "username", "email"]) {
  test(`GET "/users" filtered by ${filter} returns 200`, async ({
    request,
  }) => {
    const first = (await getAlbums(request))[0];
    const response = await request.get(
      `${routes.albums}?$${filter}=${first[filter]}`,
    );
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual(expect.arrayContaining([first]));
    // also we should validate negative -- filtered response should not contain anything that is not matching the filter
  });
}
