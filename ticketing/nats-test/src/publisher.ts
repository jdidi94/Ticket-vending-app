import nats from "node-nats-streaming";
console.clear();

const stan = nats.connect("ticketing", "abc", { url: "http://localhost:4222" });

stan.on("connect", () => {
  console.log("pusblisher connected to NATS");

  const data = JSON.stringify({
    id: "123",
    title: "Test",
  });
  stan.publish("ticket:created", data, () => {
    console.log("event published");
  });
});
