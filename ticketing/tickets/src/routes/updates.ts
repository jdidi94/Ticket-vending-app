import express, { Request, Response } from "express";

import { Ticket } from "../models/ticket-model";
const router = express.Router();
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  NotAuthorizedError,
} from "@new-developers/work";
import { body } from "express-validator";

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("title is required"),
    body("price")
      .not()
      .isEmpty()
      .isFloat({ gt: 0 })
      .withMessage("title is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    const { title, price } = req.body;
    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    ticket.set({
      title: title,
      price: price,
    });
    await ticket.save();
    res.send(ticket);
  }
);
export { router as updateTicketRouter };
