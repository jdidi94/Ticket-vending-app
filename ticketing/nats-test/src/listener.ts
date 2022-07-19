import nats from "node-nats-streaming";
import { TicketCreatedListener } from "@new-developers/work";
import { randomBytes } from "crypto";
console.clear();
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});
stan.on("connect", () => {
  console.log("listening connected to NATS");

  stan.on("close", () => {
    console.log("pusblisher disconnected from NATS");
    process.exit();
  });
  new TicketCreatedListener(stan).listen();
});
process.on("SIGNIT", () => stan.close());
process.on("SIGTERM", () => stan.close());
