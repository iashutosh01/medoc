const Token = require("../models/Token");

const PRIORITY = {
  EMERGENCY: 1,
  PAID: 2,
  FOLLOW_UP: 3,
  ONLINE: 4,
  WALK_IN: 5
};

async function allocateToken(data, slot) {
  const tokens = await Token.find({ slotId: slot._id, status: "CONFIRMED" });

  if (tokens.length < slot.capacity) {
    return Token.create({ ...data, status: "CONFIRMED" });
  }

  // Find lowest priority
  const lowest = tokens.sort((a, b) => b.priority - a.priority)[0];

  if (data.priority < lowest.priority) {
    lowest.status = "REPLACED";
    await lowest.save();
    return Token.create({ ...data, status: "CONFIRMED" });
  }

  return Token.create({ ...data, status: "WAITLISTED" });
}

module.exports = { allocateToken, PRIORITY };
