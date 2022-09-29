import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { OrderStatus, ExpirationCompleteEvent } from "@new-developers/work";
import { ExpirationCompleteListener } from "../expiration-complete-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Order } from "../../../models/orders-model";
import { Ticket } from "../../../models/ticket-model";

const setup = async () => {
  const listener = new ExpirationCompleteListener(natsWrapper.client);

  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();
  const order = Order.build({
    status: OrderStatus.Created,
    userId: "alskdfj",
    expiresAt: new Date(),
    ticket,
  });
  await order.save();

  const data: ExpirationCompleteEvent["data"] = {
    orderId: order.id,
  };

  // @ts-ignore
  const msg: Message = {
    // @ts-ignore

    ack: jest.fn(),
  };

  return { listener, order, ticket, data, msg };
};
// @ts-ignore

it("updates the order status to cancelled", async () => {
  const { listener, order, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedOrder = await Order.findById(order.id);
  // @ts-ignore

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});
// @ts-ignore

it("emit an OrderCancelled event", async () => {
  const { listener, order, data, msg } = await setup();

  await listener.onMessage(data, msg);
  // @ts-ignore

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const eventData = JSON.parse(
    // @ts-ignore

    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );
  // console.log("eventData", eventData);
  // console.log("order", order);

  // @ts-ignore

  // expect(eventData.id).toEqual(order.id);
});
// @ts-ignore

it("ack the message", async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);
  // @ts-ignore

  expect(msg.ack).toHaveBeenCalled();
});
