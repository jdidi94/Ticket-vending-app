import { Publisher, OrderCancelledEvent, Subjects } from "@new-developers/work";
export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
