import { test, expect } from "@playwright/test";
import { routes } from "../api/definitions";
import { fakeUser, getUsers } from "../api/helpers";

test(`POST "/users" returns 201`, async ({ request }) => {
  const user = fakeUser()
  const response = await request.post(routes.users, {
     data: user
    
  });
  expect(response.status()).toBe(201);
  expect(await response.json()).toEqual(expect.objectContaining(user))
  // also we should not trust post response. we should aldo independently to get for returned id and validate that it's true as well -- new user is created
});


test.fail(`POST duplicated use "/users" returns 201`, async ({ request }) => {
  const user = fakeUser()
  await request.post(routes.users, {
     data: user
    
  }); 
  const responseDuplicated = await request.post(routes.users, {
     data: user
    
  });
  expect(responseDuplicated.status()).toBe(409);
});
