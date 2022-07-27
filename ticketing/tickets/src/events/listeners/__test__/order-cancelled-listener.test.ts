import { Message } from "node-nats-streaming";
import mongoose from "mongoose";
import { OrderCancelledEvent } from "@new-developers/work";
import { OrderCancelledListener } from "../order-cancelled-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket-model";

const setup = async () => {
  // Create an instance of the listener
  const listener = new OrderCancelledListener(natsWrapper.client);
  const orderId = new mongoose.Types.ObjectId().toHexString();
  // Create and save a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 99,
    userId: "asdf",
  });
  ticket.set({ orderId });
  await ticket.save();

  // Create the fake data event
  const data: OrderCancelledEvent["data"] = {
    id: orderId,
    version: 0,

    ticket: {
      id: ticket.id,
    },
  };

  // @ts-ignore
  const msg: Message = {
    // @ts-ignore
    ack: jest.fn(),
  };

  return { listener, orderId, ticket, data, msg };
};
// @ts-ignore
it("updates the tickets , publish the event and ack the message", async () => {
  const { listener, ticket, orderId, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);
  // @ts-ignore

  expect(updatedTicket!.orderId).not.toBeDefined();
  // @ts-ignore
  expect(msg.ack).toHaveBeenCalled();
  // @ts-ignore
  expect(natsWrapper.client.publish).toHaveBeenCalledTimes(1);
});
