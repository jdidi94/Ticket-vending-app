import request from "supertest";
import mongoose from "mongoose";
import { Order, OrderStatus } from "../../models/orders-model";
import { Ticket } from "../../models/ticket-model";

import { app } from "../../app";
import { natsWrapper } from "../../nats-wrapper";
// @ts-ignore
it("returns an error if the ticket  does not exist", async () => {
  const ticketId = new mongoose.Types.ObjectId();
  const response = await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())

    .send({ ticketId: ticketId })
    .expect(404);
});
// @ts-ignore
it("returns an error if the ticket is already reserved", async () => {
  const ticket = Ticket.build({ title: "helooo", price: 100 });
  await ticket.save();
  const order = Order.build({
    ticket,
    userId: "sfddsfczefdgvf",
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });
  await order.save();
  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(400);
});
// @ts-ignore
it("it reserves a ticket", async () => {
  const ticket = Ticket.build({ title: "helooo", price: 100 });
  await ticket.save();
  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);
});
