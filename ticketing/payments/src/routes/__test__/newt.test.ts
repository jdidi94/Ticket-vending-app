import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Order } from "../../models/orders-model";
import { OrderStatus } from "@new-developers/work";
import { stripe } from "../../stripe";
jest.mock("../../stripe");
it("return a 404 when purchasing an order that does not exists", async () => {
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({
      token: "asldkf",
      orderId: new mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});
it("return a 401 when purchasing an order that does not belong to the user ", async () => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 20,
    status: OrderStatus.Created,
  });
  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({
      token: "asldkf",
      orderId: order.id,
    })
    .expect(401);
});
it("it retuns a 400 when purshasing a cancelled order", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId,
    version: 0,
    price: 20,
    status: OrderStatus.Cancelled,
  });
  await order.save();
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin(userId))
    .send({
      token: "asldkf",
      orderId: order.id,
    })
    .expect(400);
});
it("it returns 204  with valid input", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();

  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId,
    version: 0,
    price: 20,
    status: OrderStatus.Created,
  });
  await order.save();
  await request(app)
    .post("/api/payments/")
    .set("Cookie", global.signin(userId))
    .send({
      token: "tok_visa",
      orderId: order.id,
    })
    .expect(201);
  const chargesOption = (stripe.charges.create as jest.Mock).mock.calls[0][0];
  expect(chargesOption.source).toEqual("tok_visa");
  expect(chargesOption.amount).toEqual(20 * 100);
  expect(chargesOption.currency).toEqual("usd");
});
