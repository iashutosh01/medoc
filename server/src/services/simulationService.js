const Doctor = require("../models/Doctor");
const Slot = require("../models/Slot");
const Token = require("../models/Token");
const { allocateToken, PRIORITY } = require("./allocationService");
const { v4: uuid } = require("uuid");

async function simulateDay() {
  await Doctor.deleteMany();
  await Slot.deleteMany();
  await Token.deleteMany();

  const doctors = await Doctor.insertMany([
    { name: "Dr AK" },
    { name: "Dr VK" },
    { name: "Dr JK" }
  ]);

  const slots = [];
  for (const doc of doctors) {
    slots.push(await Slot.create({
      doctorId: doc._id,
      time: "9-10",
      capacity: 2
    }));
  }

  for (let i = 0; i < 10; i++) {
    await allocateToken({
      tokenId: uuid(),
      patientId: "P" + i,
      doctorId: doctors[0]._id,
      slotId: slots[0]._id,
      source: "ONLINE",
      priority: PRIORITY.ONLINE
    }, slots[0]);
  }

  //return Token.find();
  return Token.find().sort({ priority: 1 });

}

module.exports = { simulateDay };
