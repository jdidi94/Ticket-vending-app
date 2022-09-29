import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@new-developers/work";
export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.expirationComplete = Subjects.expirationComplete;
}
