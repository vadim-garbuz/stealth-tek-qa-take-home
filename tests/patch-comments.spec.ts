import { test, expect } from "@playwright/test";
import { routes } from "../api/definitions";
import { getComments, fakeComment } from "../api/helpers";

test(`PATCH "/comments/{id}" returns 200`, async ({ request }) => {
  const first = (await getComments(request))[0];
  const patch = { body: fakeComment().body };
  const response = await request.patch(`${routes.comments}/${first.id}`, { data: patch });
  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual(expect.objectContaining({ ...first, ...patch }));
});
