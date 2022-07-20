import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { natsWrapper } from "../nats-wrapper";
// import { Ticket } from "../models/ticket-model";
const router = express.Router();
import { requireAuth, validateRequest } from "@new-developers/work";
import { body } from "express-validator";
// import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";
router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("ticketId must be provided"),
    body("price")
      .not()
      .isEmpty()
      .isFloat({ gt: 0 })
      .withMessage("title is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    // const ticket = Ticket.build({
    //   title,
    //   price,
    //   userId: req.currentUser!.id,
    // });
    // await ticket.save();
    // await new TicketCreatedPublisher(natsWrapper.client).publish({
    //   id: ticket.id,
    //   title: ticket.title,
    //   price: ticket.price,
    //   userId: ticket.userId,
    // });
    // res.status(201).send(ticket);
  }
);
export { router as createOrderRouter };
