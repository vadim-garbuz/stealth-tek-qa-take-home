import { test, expect } from "@playwright/test";
import { routes } from "../api/definitions";
import { fakeTodo } from "../api/helpers";

test(`POST "/todos" returns 201`, async ({ request }) => {
  const todo = fakeTodo();
  const response = await request.post(routes.todos, { data: todo });
  expect(response.status()).toBe(201);
  expect(await response.json()).toEqual(expect.objectContaining(todo));
});

test.fail(`POST duplicated "/todos" returns 409`, async ({ request }) => {
  const todo = fakeTodo();
  await request.post(routes.todos, { data: todo });
  const responseDuplicated = await request.post(routes.todos, { data: todo });
  expect(responseDuplicated.status()).toBe(409);
});
