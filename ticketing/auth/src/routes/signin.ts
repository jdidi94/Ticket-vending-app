import express, { Request, Response } from "express";
import { BadRequestError, validateRequest } from "@new-developers/work";
import jwt from "jsonwebtoken";

import { body } from "express-validator";
import { Password } from "../services/password";
import { User } from "../models/user-model";

const router = express.Router();
router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Yoou must supply a password"),
    validateRequest,
  ],
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }
    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordMatch) {
      throw new BadRequestError("Invalid credentials");
    }
    const userJwt = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        password: existingUser.password,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };
    res.status(200).send(existingUser);
  }
);
export { router as signinRouter };
