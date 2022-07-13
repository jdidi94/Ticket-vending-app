import request from "supertest";
import { Ticket } from "../../models/ticket-model";
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
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({});

  // @ts-ignore
  expect(response.status).not.toEqual(401);
});
// @ts-ignore
it("it returns error if invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "", price: 10 });
  // @ts-ignore
  expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ price: 10 });
  // @ts-ignore
  expect(400);
});
// @ts-ignore
it("it returns error if invalid prices is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "hello", price: -10 });
  // @ts-ignore
  expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "hello" });
  // @ts-ignore
  expect(400);
});

// @ts-ignore
it("creates a tickets with valid inputs", async () => {
  let tickets = await Ticket.find({});
  // @ts-ignore
  expect(tickets.length).toEqual(0);
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "helooo", price: 100 });
  // @ts-ignore
  expect(200);
  tickets = await Ticket.find({});
  // @ts-ignore
  expect(tickets.length).toEqual(1);
  // @ts-ignore
  expect(tickets[0].price).toEqual(100);
});
