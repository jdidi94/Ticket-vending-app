import request from "supertest";
import { Ticket } from "../../models/ticket-model";
import { Order } from "../../models/orders-model";

import mongoose from "mongoose";
import { app } from "../../app";
const buildTicket = async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
  });
  await ticket.save();
  return ticket;
};
// @ts-ignore

it("it returns all orders for current user", async () => {
  const ticketOne = await buildTicket();
  const ticketTow = await buildTicket();
  const ticketThree = await buildTicket();
  const userOne = global.signin();
  const userTow = global.signin();

  await request(app)
    .post("/api/orders")
    .set("Cookie", userOne)
    .send({
      ticketId: ticketOne.id,
    })
    .expect(201);
  const { body: orderOne } = await request(app)
    .post("/api/orders")
    .set("Cookie", userTow)
    .send({
      ticketId: ticketTow.id,
    })
    .expect(201);
  const { body: orderTow } = await request(app)
    .post("/api/orders")
    .set("Cookie", userTow)
    .send({
      ticketId: ticketThree.id,
    })
    .expect(201);
  // @ts-ignore
  const response = await request(app)
    .get("/api/orders")
    .set("Cookie", userTow)
    .expect(200);
  // @ts-ignore
  expect(response.body.length).toEqual(2);
  // @ts-ignore
  expect(response.body[0].id).toEqual(orderOne.id);
  // @ts-ignore
  expect(response.body[1].id).toEqual(orderTow.id);
});
