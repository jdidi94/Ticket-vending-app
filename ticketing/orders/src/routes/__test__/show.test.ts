import request from "supertest";
import mongoose from "mongoose";

import { Ticket } from "../../models/ticket-model";
import { app } from "../../app";
// @ts-ignore

it("it fetch the ticket with th current id", async () => {
  const user = global.signin();
  const ticket = Ticket.build({ title: "helooo", price: 100 });
  await ticket.save();
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);
  const { body: fetchOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);
  // @ts-ignore

  expect(fetchOrder.id).toEqual(order.id);
});
// @ts-ignore

it("it returns an error if another user try to fetch another user order", async () => {
  const user = global.signin();
  const ticket = Ticket.build({ title: "helooo", price: 100 });
  await ticket.save();
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);
  const { body: fetchOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", global.signin())
    .send()
    .expect(401);
});
