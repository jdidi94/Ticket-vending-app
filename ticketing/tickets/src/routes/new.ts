import express, { Request, Response } from "express";

import { Ticket } from "../models/ticket-model";
const router = express.Router();
import { requireAuth, validateRequest } from "@new-developers/work";
import { body } from "express-validator";
router.post(
  "/api/tickets",
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
    const { title, price } = req.body;
    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });
    await ticket.save();
    res.status(201).send(ticket);
  }
);
export { router as createTicketRouter };
