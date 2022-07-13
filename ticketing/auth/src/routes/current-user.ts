import express, { Request, Response } from "express";

const router = express.Router();
import { currentUser } from "@new-developers/work";

router.get("/api/users/currentuser", currentUser, async (req, res) => {
  console.log("hi");

  res.send({ currentUser: req.currentUser || null });
});
export { router as currentUserRouter };
