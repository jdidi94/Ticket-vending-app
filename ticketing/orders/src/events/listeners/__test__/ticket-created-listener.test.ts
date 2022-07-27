import { TicketCreatedEvent } from "@new-developers/work";
import { Message } from "node-nats-streaming";
import mongoose from "mongoose";
import { TicketCreatedListener } from "../ticket-created-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket-model";
const setup = async () => {
  const listener = new TicketCreatedListener(natsWrapper.client);
  const data: TicketCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "hello",
    price: 400,
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
  };
  // @ts-ignore
  const msg: Message = {
    // @ts-ignore
    ack: jest.fn(),
  };
  return { listener, data, msg };
};
// @ts-ignore
it("creates and saves a ticket", async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  const ticket = await Ticket.findById(data.id);
  // @ts-ignore
  expect(ticket).toBeDefined();
  // @ts-ignore
  expect(ticket!.title).toEqual(data.title);
  // @ts-ignore
  expect(ticket!.price).toEqual(data.price);
});
// @ts-ignore

it("acks the message", async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  // @ts-ignore
  expect(msg.ack).toHaveBeenCalled();
});
// @ts-ignore

