import { Publisher, OrderCreatedEvent, Subjects } from "@new-developers/work";
export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
