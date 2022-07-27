import { Listener, OrderCreatedEvent, Subjects } from "@new-developers/work";
import { Ticket } from "../../models/ticket-model";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";
import { natsWrapper } from "../../nats-wrapper";
export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) {
      throw new Error("ticket is not found");
    }
    ticket.set({ orderId: data.id });
    await ticket.save();
    new TicketUpdatedPublisher(natsWrapper.client);
    msg.ack();
  }
}
