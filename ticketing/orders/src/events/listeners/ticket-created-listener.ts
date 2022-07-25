import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketCreatedEvent } from "@new-developers/work";
import { Ticket } from "../../models/ticket-model";
import { queueGroupName } from "./queue-groupe-name";
export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    const { id, title, price } = data;
    const ticket = Ticket.build({ id, title, price });
    await ticket.save();
    msg.ack();
  }
}
