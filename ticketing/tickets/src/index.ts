import Mongoose from "mongoose";
import "express-async-errors";
import { app } from "./app";
const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI  should be defined");
  }
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY  should be defined");
  }
  try {
    await Mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongodb");
  } catch (err) {
    console.error(err);
  }
};

app.listen(3000, () => {
  console.log(" hi listening on 3000");
});

start();
