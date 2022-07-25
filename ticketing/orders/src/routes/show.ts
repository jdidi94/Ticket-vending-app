import express, { Request, Response } from "express";

import { Order } from "../models/orders-model";
const router = express.Router();
import {
  NotFoundError,
  NotAuthorizedError,
  requireAuth,
} from "@new-developers/work";
router.get(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate("ticket");
    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    res.status(200).send(order);
  }
);
export { router as showOrderRouter };
