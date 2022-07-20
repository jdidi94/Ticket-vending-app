import request from "supertest";
import mongoose from "mongoose";
import { Ticket } from "../../models/ticket-model";
import { app } from "../../app";

// @ts-ignore

it("returns a 404 if the id not exists", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({ title: "dfkjdz", price: 20 })
    .expect(404);
});
// @ts-ignore

it("returns a 401 if the user is not athenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({ title: "dfkjdz", price: 20 })
    .expect(401);
});

// @ts-ignore

it("returns a 401 if the user does not own the tickets", async () => {
  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", global.signin())
    .send({ title: "dfkjdz", price: 20 });
  console.log("response", response.body);
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({ title: "dsdzsaxfkjdz", price: 458 })
    .expect(401);
});
// @ts-ignore

it("returns a 400 if the user provides an invalid title or price", async () => {
  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", global.signin())
    .send({ title: "dfkjdz", price: 20 });
  console.log("response", response.body);
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({ title: "", price: 458 })
    .expect(400);
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({ title: "nkqsnkjq", price: -10 })
    .expect(400);
});
// @ts-ignore

it("updates the tickets proided valid inputs", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({ title: "dfkjdz", price: 20 });
  console.log("response", response.body);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "nkqsnkjq", price: 10 })
    .expect(200);

  const upadates = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();
  // @ts-ignore
  expect(upadates.body.title).toEqual("nkqsnkjq");
  // @ts-ignore
  expect(upadates.body.price).toEqual(10);
});
