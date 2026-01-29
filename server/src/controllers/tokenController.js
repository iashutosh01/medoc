const Slot = require("../models/Slot");
const { allocateToken, PRIORITY } = require("../services/allocationService");
const { v4: uuid } = require("uuid");

exports.createToken = async (req, res) => {
  if (!req.body) {
  return res.status(400).json({ error: "Request body missing" });
}

const { patientId, doctorId, slotId, source } = req.body;

if (!patientId || !doctorId || !slotId || !source) {
  return res.status(400).json({ error: "Missing required fields" });
}


  const slot = await Slot.findById(slotId);

  const token = await allocateToken({
    tokenId: uuid(),
    patientId,
    doctorId,
    slotId,
    source,
    priority: PRIORITY[source]
  }, slot);

  res.json(token);
};
