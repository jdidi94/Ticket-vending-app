import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";
import { createTicketRouter } from "./routes/new";
import { errorHandler, NotFoundError,currentUser } from "@new-developers/work";

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
app.use(currentUser)
// console.log(process.env.NODE_ENV);
// console.log(process.env.JWT_KEY);
app.use(createTicketRouter);
app.get("*", async () => {
  throw new NotFoundError();
});
app.use(errorHandler);
export { app };
