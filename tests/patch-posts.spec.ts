import { test, expect } from "@playwright/test";
import { routes } from "../api/definitions";
import { getPosts, fakePost } from "../api/helpers";

test(`PATCH "/posts/{id}" returns 200`, async ({ request }) => {
  const first = (await getPosts(request))[0];
  const patch = { title: fakePost().title };
  const response = await request.patch(`${routes.posts}/${first.id}`, { data: patch });
  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual(expect.objectContaining({ ...first, ...patch }));
});
