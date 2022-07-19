import { Publisher, Subjects, TicketCreatedEvent } from "@new-developers/work";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
// new TicketCreatedPublisher(client).publish(ticket)
