import {
  Subjects,
  OrderStatus,
  Listener,
  PaymentCreatedEvent,
} from "@new-developers/work";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-groupe-name";
import { Order } from "../../models/orders-model";
export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: PaymentCreatedEvent["data"], msg: Message) {
    const order = await Order.findById(data.orderId);
    if (!order) {
      throw new Error("Order not found");
    }
    order.set({
      status: OrderStatus.Complete,
    });
    await order.save();
    msg.ack();
  }
}
