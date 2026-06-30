import { test, expect } from "@playwright/test";
import { routes } from "../api/definitions";
import { fakeComment } from "../api/helpers";

test(`POST "/comments" returns 201`, async ({ request }) => {
  const comment = fakeComment();
  const response = await request.post(routes.comments, { data: comment });
  expect(response.status()).toBe(201);
  expect(await response.json()).toEqual(expect.objectContaining(comment));
});

test.fail(`POST duplicated "/comments" returns 409`, async ({ request }) => {
  const comment = fakeComment();
  await request.post(routes.comments, { data: comment });
  const responseDuplicated = await request.post(routes.comments, { data: comment });
  expect(responseDuplicated.status()).toBe(409);
});
