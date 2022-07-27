import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { natsWrapper } from "../../nats-wrapper";

import { Order, OrderStatus } from "../../models/orders-model";
import { Ticket } from "../../models/ticket-model";
// @ts-ignore
it("marks an order as cancelled", async () => {
  const user = global.signin();
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "helooo",
    price: 100,
  });
  await ticket.save();
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);
  const updatdOrder = await Order.findById(order.id);
  // @ts-ignore
  expect(updatdOrder!.status).toEqual(OrderStatus.Cancelled);
});
// @ts-ignore
it("emits an order cancelled event", async () => {
  const user = global.signin();
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "helooo",
    price: 100,
  });
  await ticket.save();
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);
  const updatdOrder = await Order.findById(order.id);
  // @ts-ignore
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
