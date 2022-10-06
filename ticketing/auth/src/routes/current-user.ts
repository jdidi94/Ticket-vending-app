import express, { Request, Response } from "express";

const router = express.Router();
import { currentUser } from "@new-developers/work";
console.log("new files changes let's see what willl happen");
router.get("/api/users/currentuser", currentUser, async (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});
export { router as currentUserRouter };
