import { test, expect } from "@playwright/test";
import { routes } from "../api/definitions";
import { getTodos, fakeTodo } from "../api/helpers";

test(`PATCH "/todos/{id}" returns 200`, async ({ request }) => {
  const first = (await getTodos(request))[0];
  const patch = { title: fakeTodo().title };
  const response = await request.patch(`${routes.todos}/${first.id}`, { data: patch });
  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual(expect.objectContaining({ ...first, ...patch }));
});
