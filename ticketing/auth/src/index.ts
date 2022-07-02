import Mongoose from "mongoose";
import "express-async-errors";
import { app } from "./app";
const start = async () => {
  try {
    await Mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("connected to mongodb");
  } catch (err) {
    console.error(err);
  }
};

app.listen(3000, () => {
  console.log(" hi listening on 3000");
});

start();
