import { test, expect } from "@playwright/test";
import { routes } from "../api/definitions";
import { getPhotos, getPosts } from "../api/helpers";

  for (const filter of ['albumId', 'id', 'title', 'url', 'thumbnailUrl']) {
    test(`GET "/photos" filtered by ${filter} returns 200`, async ({ request }) => {
    const first = (await getPhotos(request))[0]
    const response = await request.get(`${routes.photos}?$${filter}=${first[filter]}`);
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual(expect.arrayContaining([first]))
    // also we should validate negative -- filtered response should not contain anything that is not matching the filter
    
  });
  }
