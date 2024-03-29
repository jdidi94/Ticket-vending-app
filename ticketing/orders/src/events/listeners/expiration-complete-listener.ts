import {
  Listener,
  Subjects,
  ExpirationCompleteEvent,
  OrderStatus,
} from "@new-developers/work";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-groupe-name";
import { Order } from "../../models/orders-model";
export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  queueGroupName = queueGroupName;
  subject: Subjects.expirationComplete = Subjects.expirationComplete;
  async onMessage(data: ExpirationCompleteEvent["data"], msg: Message) {
    const order = await Order.findById(data.orderId).populate("ticket");
    if (!order) {
      throw new Error("order Not found");
    }
    if (order.status === OrderStatus.Complete) {
      return msg.ack();
    }
    order.set({ status: OrderStatus.Cancelled });
    await order.save();
    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });
    msg.ack();
  }
}
