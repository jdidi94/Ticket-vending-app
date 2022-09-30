import { Listener, OrderCreatedEvent, Subjects } from "@new-developers/work";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/orders-model";
import { queueGroupName } from "./queue-group-name";
export class OrdercreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const order = await Order.build({
      id: data.id,
      status: data.status,
      userId: data.userId,
      version: data.version,
      price: data.ticket.price,
    });

    await order.save();
    msg.ack();
  }
}
