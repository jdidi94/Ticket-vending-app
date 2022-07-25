import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketUpdatedEvent } from "@new-developers/work";
import { Ticket } from "../../models/ticket-model";
import { queueGroupName } from "./queue-groupe-name";
export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;
  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const { id, price, title } = data;
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      throw new Error("Ticket not found");
    }
    ticket.set({ title, price });
    await ticket.save();
    msg.ack();
  }
}
