import express, { Request, Response } from "express";
// import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated-publisher";
import { natsWrapper } from "../nats-wrapper";
import { OrderCancelledPublisher } from "../events/publishers/order-cancelled-publisher";

import { Order, OrderStatus } from "../models/orders-model";
const router = express.Router();
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from "@new-developers/work";
import { body } from "express-validator";

router.delete(
  "/api/orders/:orderId",
  requireAuth,

  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate("ticket");

    const { title, price } = req.body;
    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    order.status = OrderStatus.Cancelled;
    await order.save();
    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      ticket: {
        id: order.ticket.id,
      },
    });
    res.status(204).send(order);
  }
);
export { router as deleteOrderRouter };
