import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

let mongo: any;
// @ts-ignore
beforeAll(async () => {
  process.env.JWT_KEY = "asdfdsx";
  mongo = new MongoMemoryServer();
  await mongo.start();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri);
});
// @ts-ignore
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});
// @ts-ignore
afterAll(async () => {
  await mongo.stop();

  await mongoose.connection.close();
});
