import { Publisher, TicketCreatedEvent, Subjects } from "@new-developers/work";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
