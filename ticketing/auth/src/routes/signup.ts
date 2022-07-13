import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest, BadRequestError } from "@new-developers/work";
import jwt from "jsonwebtoken";

import { User } from "../models/user-model";

interface IGetUserAuthInfoRequest extends Request {
  session?: object;
}
// type CustomRequest = Request & IGetUserAuthInfoRequest
const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,

  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("email in use");
    }
    const user = User.build({ email, password });
    await user.save();
    const userJwt = jwt.sign(
      { id: user._id, email: user.email, password: user.password },
      process.env.JWT_KEY!
    );
    // @ts-ignore
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
