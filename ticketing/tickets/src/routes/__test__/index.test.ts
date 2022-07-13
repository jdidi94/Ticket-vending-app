import request from "supertest";
import { Ticket } from "../../models/ticket-model";
import mongoose from "mongoose";
import { app } from "../../app";
// @ts-ignore

it("it returns all tickets", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "helooo", price: 100 });
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "sdhjks", price: 30 });
  // @ts-ignore
  expect(200);
  const responseTickets = await request(app)
    .get(`/api/tickets`)
    .send()
    .expect(200);
  // @ts-ignore

  expect(responseTickets.body.length).toEqual(2);
});
