import { Ticket } from "../ticket-model";
// @ts-ignore
it("implments optimistic concurrency", async () => {
  const ticket = Ticket.build({ title: "helooo", price: 100, userId: "1255" });
  await ticket.save();

  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });
  await firstInstance!.save();
  // @ts-ignore
  try {
    await secondInstance!.save();
  } catch (err) {
    return;
  }
  throw new Error("should not reach this point");
});
// @ts-ignore
it("increments the version number on multiple saves", async () => {
  const ticket = Ticket.build({ title: "helooo", price: 100, userId: "1255" });
  await ticket.save();
  // @ts-ignore
  expect(ticket.version).toEqual(0);
  await ticket.save();
  // @ts-ignore
  expect(ticket.version).toEqual(1);
  await ticket.save();
  // @ts-ignore
  expect(ticket.version).toEqual(2);
});
