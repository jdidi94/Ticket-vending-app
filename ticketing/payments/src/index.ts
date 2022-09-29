import { natsWrapper } from "./nats-wrapper";
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
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID  should be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL  should be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID  should be defined");
  }
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      console.log("pusblisher disconnected from NATS");
      process.exit();
    });
    process.on("SIGNIT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

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
