import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";
import { createOrderRouter } from "./routes/new";
import { errorHandler, NotFoundError, currentUser } from "@new-developers/work";
import { showOrderRouter } from "./routes/show";
import { fetchOrders } from "./routes/index";
import { deleteOrderRouter } from "./routes/delete";
console.log("we are here");
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
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
app.use(currentUser);
app.use(createOrderRouter);
app.use(showOrderRouter);
app.use(fetchOrders);
app.use(deleteOrderRouter);
app.get("*", async () => {
  throw new NotFoundError();
});
app.use(errorHandler);
export { app };
