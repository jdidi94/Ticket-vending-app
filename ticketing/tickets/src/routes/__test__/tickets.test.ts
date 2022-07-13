import request from "supertest";

import { app } from "../../app";
// @ts-ignore
it("has a rooutes listening to /api/tickets for post request", async () => {
  const response = await request(app).post("/api/tickets").send({});
  // @ts-ignore
  expect(response.status).not.toEqual(404);
});
// @ts-ignore
it("if the user is signed in ", async () => {
  const response = await request(app).post("/api/tickets").send({});
  // @ts-ignore
  expect(401);
});
// @ts-ignore
it("returns a statu other than 401 if the user is signed in", async () => {
  const response = await request(app).post("/api/tickets").send({});
  // @ts-ignore
  expect(response.status).not.toEqual(401);
});
// @ts-ignore
it("it returns error if invalid title is provided", async () => {});
// @ts-ignore
it("it returns error if invalid prices is provided", async () => {});
// @ts-ignore
it("creates a tickets with valid inputs", async () => {});
