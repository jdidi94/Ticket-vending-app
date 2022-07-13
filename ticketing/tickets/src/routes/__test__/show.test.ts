import request from "supertest";
import { Ticket } from "../../models/ticket-model";
import mongoose from "mongoose";
import { app } from "../../app";

// @ts-ignore
it("it returns 404 if the tickets is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .get(`/api/tickets/${id}`)
    .send()
    .expect(404);
});
// @ts-ignore

it("it returns the ticket if the ticket is found", async () => {
  const title = "concert";
  const price = 200;
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title, price })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);
  console.log("ticketResponse", ticketResponse.body);
  // @ts-ignore

  expect(ticketResponse.body.title).toEqual(title);
  // @ts-ignore
  expect(ticketResponse.body.price).toEqual(price);
});
