import express, { Request, Response } from "express";
// import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated-publisher";
import { natsWrapper } from "../nats-wrapper";

// import { Ticket } from "../models/ticket-model";
const router = express.Router();
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  NotAuthorizedError,
} from "@new-developers/work";
import { body } from "express-validator";

router.delete(
  "/api/orders/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("title is required"),
    body("price")
      .not()
      .isEmpty()
      .isFloat({ gt: 0 })
      .withMessage("title is required"),
  ],
  validateRequest
  // async (req: Request, res: Response) => {
  //   const ticket = await Ticket.findById(req.params.id);

  //   const { title, price } = req.body;
  //   if (!ticket) {
  //     throw new NotFoundError();
  //   }

  //   if (ticket.userId !== req.currentUser!.id) {
  //     throw new NotAuthorizedError();
  //   }
  //   ticket.set({
  //     title: title,
  //     price: price,
  //   });
  //   await ticket.save();
  //   new TicketUpdatedPublisher(natsWrapper.client).publish({
  //     id: ticket.id,
  //     title: ticket.title,
  //     price: ticket.price,
  //     userId: ticket.userId,
  //   });
  //   res.send(ticket);
  // }
);
export { router as deleteOrderRouter };
