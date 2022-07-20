import express, { Request, Response } from "express";

// import { Ticket } from "../models/ticket-model";
const router = express.Router();
import { NotFoundError } from "@new-developers/work";
router.get("/api/orders/:id", async (req: Request, res: Response) => {
  // const ticket = await Ticket.findById(req.params.id);
  // if (!ticket) {
  //   throw new NotFoundError();
  // }
  // res.status(200).send(ticket);
});
export { router as showOrderRouter };
