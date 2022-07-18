import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";
console.clear();
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});
stan.on("connect", () => {
  console.log("listening connected to NATS");
  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName("acounting-service");
  const subscription = stan.subscribe(
    "ticket:created",
    "queue-group-name",
    options
  );
  stan.on("close", () => {
    console.log("pusblisher disconnected from NATS");
    process.exit();
  });
  subscription.on("message", (msg: Message) => {
    const data = msg.getData();

    if (typeof data === "string") {
      console.log(`received event #${msg.getSequence()} ,with data ${data}`);
    }
    msg.ack();
  });
});
process.on("SIGNIT", () => stan.close());
process.on("SIGTERM", () => stan.close());
