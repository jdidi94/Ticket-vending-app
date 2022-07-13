import express, { Request, Response } from "express";
const router = express.Router();
import { requireAuth } from "@new-developers/work";
router.post(
  "/api/tickets",
  requireAuth,
  async (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);
export { router as createTicketRouter };
