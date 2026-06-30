import { test, expect } from "@playwright/test";
import { routes } from "../api/definitions";
import { fakePost } from "../api/helpers";

test(`POST "/posts" returns 201`, async ({ request }) => {
  const post = fakePost();
  const response = await request.post(routes.posts, { data: post });
  expect(response.status()).toBe(201);
  expect(await response.json()).toEqual(expect.objectContaining(post));
});

test.fail(`POST duplicated "/posts" returns 409`, async ({ request }) => {
  const post = fakePost();
  await request.post(routes.posts, { data: post });
  const responseDuplicated = await request.post(routes.posts, { data: post });
  expect(responseDuplicated.status()).toBe(409);
});
