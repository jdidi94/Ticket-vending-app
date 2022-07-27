import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketUpdatedEvent } from "@new-developers/work";
import { Ticket } from "../../models/ticket-model";
import { queueGroupName } from "./queue-groupe-name";
export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const ticket = await Ticket.findByEvent(data);

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    const { title, price } = data;
    ticket.set({ title, price });
    await ticket.save();

    msg.ack();
  }
}
