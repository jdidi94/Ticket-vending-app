import express, { Request, Response } from "express";
import { requireAuth } from "@new-developers/work";
import { Order } from "../models/orders-model";

// import { Ticket } from "../models/ticket-model";
import { NotFoundError } from "@new-developers/work";

const router = express.Router();
router.get("/api/orders", requireAuth, async (req: Request, res: Response) => {
  const order = await Order.find({ userId: req.currentUser!.id }).populate(
    "ticket"
  );
  // if (!ticket) {
  //   throw new NotFoundError();
  // }
  res.status(200).send(order);
});
export { router as fetchOrders };
