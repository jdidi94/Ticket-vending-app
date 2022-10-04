import express, { Request, Response } from "express";

const router = express.Router();
import { currentUser } from "@new-developers/work";
console.log("happpy");
router.get("/api/users/currentuser", currentUser, async (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});
export { router as currentUserRouter };
