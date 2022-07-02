import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
const router = express.Router();
import { currentUser } from "@ts-middleweares/commons";

router.get("/api/users/currentuser", currentUser, async (req, res) => {
  console.log("hi");

  res.send({ currentUser: req.currentUser || null });
});
export { router as currentUserRouter };
