import request from "supertest";
import { app } from "../../app";

// @ts-ignore
it("returns a 201 on succeful request", async () => {
  return await request(app)
    .post("/api/users/signup")
    .send({ email: "test@gmail.com", password: "testpassw" })
    .expect(201);
});
// @ts-ignore
it("it returns 400 with invalid email", async () => {
  return await request(app)
    .post("/api/users/signup")
    .send({ email: "testgmail.com", password: "testpassw" })
    .expect(400);
});

// @ts-ignore
it("it returns 400 with invalid password", async () => {
  return await request(app)
    .post("/api/users/signup")
    .send({ email: "test@gmail.com", password: "t" })
    .expect(400);
});

// @ts-ignore
it("it returns 400 with missing email or passsword", async () => {
  return await request(app).post("/api/users/signup").send({}).expect(400);
});
// @ts-ignore
it("it dislowes a duplicates email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@gmail.com", password: "testpassw" })
    .expect(201);
  await request(app)
    .post("/api/users/signup")
    .send({ email: "testgmail.com", password: "testpassw" })
    .expect(400);
});

// @ts-ignore
it("it sets a cookie after a succefull response", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({ email: "test@gmail.com", password: "testpassw" })
    .expect(201);
  // @ts-ignore
  expect(response.get("Set-Cookie")).toBeDefined();
});
