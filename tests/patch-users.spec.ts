import { test, expect } from "@playwright/test";
import { routes } from "../api/definitions";
import { getUsers, fakeUser } from "../api/helpers";

test(`PATCH "/users/{id}" returns 200`, async ({ request }) => {
  const first = (await getUsers(request))[0];
  const patch = { name: fakeUser().name };
  const response = await request.patch(`${routes.users}/${first.id}`, { data: patch });
  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual(expect.objectContaining({ ...first, ...patch }));
});
