import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";
import { currentUserRouter } from "./routes/current-user";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
const app = express();
app.set("tust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
    // secure: process.env.NODE_ENV !== "test",
  })
);
// console.log(process.env.NODE_ENV);
// console.log(process.env.JWT_KEY);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.get("*", async () => {
  throw new NotFoundError();
});
app.use(errorHandler);
export { app };
