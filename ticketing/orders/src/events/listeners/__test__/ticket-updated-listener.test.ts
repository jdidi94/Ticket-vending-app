import { TicketUpdatedEvent } from "@new-developers/work";
import { Message } from "node-nats-streaming";
import mongoose from "mongoose";
import { TicketUpdatedListener } from "../ticket-updated-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket-model";
const setup = async () => {
  // Create a listener
  const listener = new TicketUpdatedListener(natsWrapper.client);

  // Create and save a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();

  // Create a fake data object
  const data: TicketUpdatedEvent["data"] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: "new concert",
    price: 999,
    userId: "ablskdjf",
  };

  // Create a fake msg object
  // @ts-ignore
  const msg: Message = {
    // @ts-ignore
    ack: jest.fn(),
  };

  // return all of this stuff
  return { msg, data, ticket, listener };
};
// @ts-ignore
it("finds, updates, and saves a ticket", async () => {
  const { msg, data, ticket, listener } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);
  // @ts-ignore
  expect(updatedTicket!.title).toEqual(data.title);
  // @ts-ignore
  expect(updatedTicket!.price).toEqual(data.price);
  // @ts-ignore
  expect(updatedTicket!.version).toEqual(data.version);
});
// @ts-ignore
it("acks the message", async () => {
  const { msg, data, listener } = await setup();

  await listener.onMessage(data, msg);
  // @ts-ignore
  expect(msg.ack).toHaveBeenCalled();
});
 // @ts-ignore
it("does not call ack if the event has a skipped version number", async () => {
  const { listener, data, msg } = await setup();

  data.version = 10;
  console.log(data);
  try {
    await listener.onMessage(data, msg);
  } catch (err) {}
  // @ts-ignore
  expect(msg.ack).not.toHaveBeenCalled();
});
