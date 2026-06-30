import { test, expect } from "@playwright/test";
import { routes } from "../api/definitions";
import { getPosts } from "../api/helpers";

  test(`GET "/posts/{id}/comments" returns 200`, async ({ request }) => {
    const first = (await getPosts(request))[0]
    const response = await request.get(`${routes.posts}/${first.id}/comments`);
    expect(response.status()).toBe(200);
    // also we should validate data
    // we can do it with known data, explicit data we created the item with or take it from other api response

  });

  for (const filter of ['userId', 'id', 'title', 'body']) {
    test(`GET "/posts" filtered by ${filter} returns 200`, async ({ request }) => {
    const first = (await getPosts(request))[0]
    const response = await request.get(`${routes.posts}?$${filter}=${first[filter]}`);
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual(expect.arrayContaining([first]))
    // also we should validate negative -- filtered response should not contain anything that is not matching the filter
    
  });
  }
