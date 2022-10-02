import { Subjects, Publisher, PaymentCreatedEvent } from "@new-developers/work";
export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
