import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "@new-developers/work";
console.clear();

const stan = nats.connect("ticketing", "abc", { url: "http://localhost:4222" });

stan.on("connect", async () => {
  console.log("pusblisher connected to NATS");
  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: "123",
      title: "Test",
      price: 525,
    });
  } catch (err) {}
});
