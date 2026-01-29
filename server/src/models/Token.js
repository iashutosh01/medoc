const mongoose = require("mongoose");

module.exports = mongoose.model("Token", {
  tokenId: String,
  patientId: String,
  doctorId: mongoose.Schema.Types.ObjectId,
  slotId: mongoose.Schema.Types.ObjectId,
  priority: Number,
  source: String,
  status: String,
  createdAt: { type: Date, default: Date.now }
});
