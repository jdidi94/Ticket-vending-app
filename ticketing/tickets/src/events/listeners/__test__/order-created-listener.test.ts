import { Message } from "node-nats-streaming";
import mongoose from "mongoose";
import { OrderCreatedEvent, OrderStatus } from "@new-developers/work";
import { OrderCreatedListener } from "../order-created-listeners";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket-model";

const setup = async () => {
  // Create an instance of the listener
  const listener = new OrderCreatedListener(natsWrapper.client);

  // Create and save a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 99,
    userId: "asdf",
  });
  await ticket.save();

  // Create the fake data event
  const data: OrderCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: "alskdfj",
    expiresAt: "alskdjf",
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  // @ts-ignore
  const msg: Message = {
    // @ts-ignore
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg };
};
// @ts-ignore

it("sets the userId of the ticket", async () => {
  const { listener, ticket, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);
  // @ts-ignore

  expect(updatedTicket!.orderId).toEqual(data.id);
});
// @ts-ignore

it("acks the message", async () => {
  const { listener, ticket, data, msg } = await setup();
  await listener.onMessage(data, msg);
  // @ts-ignore

  expect(msg.ack).toHaveBeenCalled();
});
// @ts-ignore

it("publishes a ticket updated event", async () => {
  const { listener, ticket, data, msg } = await setup();

  await listener.onMessage(data, msg);
  // @ts-ignore

  expect(natsWrapper.client.publish).toHaveBeenCalledTimes(3);
  // @ts-ignore

  //
  const ticketUpdated = JSON.parse(
    // @ts-ignore
    (natsWrapper.client.publish as jest.Mock).mock.calls[2][1]
  );
  console.log(data.id);
  console.log(ticketUpdated);
  // @ts-ignore
  expect(data.id).toEqual(ticketUpdated.orderId);
});
