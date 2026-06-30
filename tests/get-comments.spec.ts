import { test, expect } from "@playwright/test";
import { routes } from "../api/definitions";
import { getComments } from "../api/helpers";


for (const filter of ["id", "postId", "name", "email", "body"]) {
  test(`GET "/comments" filtered by ${filter} returns 200`, async ({
    request,
  }) => {
    const first = (await getComments(request))[0];
    const response = await request.get(
      `${routes.comments}?$${filter}=${first[filter]}`,
    );
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual(expect.arrayContaining([first]));
    // also we should validate negative -- filtered response should not contain anything that is not matching the filter
  });
}
