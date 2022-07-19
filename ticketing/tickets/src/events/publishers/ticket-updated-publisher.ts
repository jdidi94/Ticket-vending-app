import { Publisher, Subjects, TicketUpdatedEvent } from "@new-developers/work";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
