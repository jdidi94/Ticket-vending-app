import express, { Request, Response } from "express";
import { BadrequestError, validateRequest } from "@ts-middleweares/commons";
import jwt from "jsonwebtoken";

import { body } from "express-validator";
import { Password } from "../services/password";
import { User } from "../models/user-model";

import { validateRequest } from "../middleware/validate-request";
interface IGetUserAuthInfoRequest extends Request {
  session?: object;
}
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
      throw new BadrequestError("Invalid credentials");
    }
    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordMatch) {
      throw new BadrequestError("Invalid credentials");
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
