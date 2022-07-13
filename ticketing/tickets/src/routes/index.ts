import express, { Request, Response } from "express";

import { Ticket } from "../models/ticket-model";
import {
  requireAuth,
  validateRequest,
  NotFoundError,
} from "@new-developers/work";
import { body } from "express-validator";
const router = express.Router();
router.get("/api/tickets", async (req: Request, res: Response) => {
  const ticket = await Ticket.find({});
  if (!ticket) {
    throw new NotFoundError();
  }
  res.status(200).send(ticket);
});
export { router as fetchTickets };
