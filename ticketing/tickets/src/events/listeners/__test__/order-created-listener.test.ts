import { OrderCreatedListener } from "../order-created-listeners";
import { OrderCreatedEvent, OrderStatus } from "@new-developers/work";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket-model";
import mongoose from "mongoose";
const setUp = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);
  const ticket = Ticket.build({
    title: "concert",
    price: 10,
    userId: "ufdsfdsfzdsf5556ed",
  });
  await ticket.save();
  const data: OrderCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: "fdvgefgefg",
    expiresAt: "qskldzsqknldc",
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  return { msg, data, ticket, listener };
};
// @ts-ignore
it("set the userId of the ticket", async () => {
  const { msg, data, ticket, listener } = await setUp();
  await listener.onMessage(data, msg);
  const updatedTicket = await Ticket.findById(ticket.id);
  expect(updatedTicket!.userId).toEqual(data.id);
});
// @ts-ignore
it("ack the message", async () => {
  const { msg, data, ticket, listener } = await setUp();
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});
