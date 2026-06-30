// this is crude implementation of rest api client helper
// purpose is to provide data generation and collection methods to be used in tests

import { APIRequestContext } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { routes } from "./definitions";

export async function getPosts(request: APIRequestContext) {
  const routeResponse = await request.get(routes.posts);
  const routeResponseData = await routeResponse.json();
  return routeResponseData;
}

export async function getUsers(request: APIRequestContext) {
  const routeResponse = await request.get(routes.users);
  const routeResponseData = await routeResponse.json();
  return routeResponseData;
}

export async function getComments(request: APIRequestContext) {
  const routeResponse = await request.get(routes.comments);
  const routeResponseData = await routeResponse.json();
  return routeResponseData;

}

export async function getAlbums(request: APIRequestContext) {
  const routeResponse = await request.get(routes.albums);
  const routeResponseData = await routeResponse.json();
  return routeResponseData;
}

export async function getPhotos(request: APIRequestContext) {
  const routeResponse = await request.get(routes.photos);
  const routeResponseData = await routeResponse.json();
  return routeResponseData;
}

export async function getTodos(request: APIRequestContext) {
  const routeResponse = await request.get(routes.todos);
  const routeResponseData = await routeResponse.json();
  return routeResponseData;
}

export function fakePost() {
  return {
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraph(),
    userId: faker.number.int({ min: 1, max: 10 }),
  };
}

export function fakeComment() {
  return {
    postId: faker.number.int({ min: 1, max: 100 }),
    name: faker.lorem.words(3),
    email: faker.internet.email(),
    body: faker.lorem.paragraph(),
  };
}

export function fakeAlbum() {
  return {
    title: faker.lorem.sentence(),
    userId: faker.number.int({ min: 1, max: 10 }),
  };
}

export function fakePhoto() {
  return {
    albumId: faker.number.int({ min: 1, max: 100 }),
    title: faker.lorem.sentence(),
    url: faker.image.url(),
    thumbnailUrl: faker.image.url(),
  };
}

export function fakeTodo() {
  return {
    title: faker.lorem.sentence(),
    completed: faker.datatype.boolean(),
    userId: faker.number.int({ min: 1, max: 10 }),
  };
}

export function fakeUser() {
  return {
    name: faker.person.fullName(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    address: {
      street: faker.location.street(),
      suite: faker.location.secondaryAddress(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode(),
      geo: {
        lat: faker.location.latitude().toFixed(4),
        lng: faker.location.longitude().toFixed(4),
      },
    },
    phone: faker.phone.number(),
    website: faker.internet.domainName(),
    company: {
      name: faker.company.name(),
      catchPhrase: faker.company.catchPhrase(),
      bs: faker.company.buzzPhrase(),
    },
  };
} 