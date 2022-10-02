import express, { Request, Response } from "express";

import { Ticket } from "../models/ticket-model";
import { NotFoundError } from "@new-developers/work";

const router = express.Router();
router.get("/api/tickets", async (req: Request, res: Response) => {
  const ticket = await Ticket.find({ orderId: undefined });
  if (!ticket) {
    throw new NotFoundError();
  }
  res.status(200).send(ticket);
});
export { router as fetchTickets };
