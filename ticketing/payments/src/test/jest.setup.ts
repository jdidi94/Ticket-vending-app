import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
declare global {
  function signin(id?: string): string[];
}

jest.mock("../nats-wrapper");
let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = "asdfdsx";
  mongo = new MongoMemoryServer();
  await mongo.start();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();

  mongoose.connection.close();
});
global.signin = (id) => {
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: "test@gmail.com",
  };

  const token = jwt.sign(payload, process.env.JWT_KEY!);
  const session = { jwt: token };
  const sessionJson = JSON.stringify(session);
  const base64 = Buffer.from(sessionJson).toString("base64");
  return [`session=${base64}`];
};
