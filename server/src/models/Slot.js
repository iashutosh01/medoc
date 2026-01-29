const mongoose = require("mongoose");

module.exports = mongoose.model("Slot", {
  doctorId: mongoose.Schema.Types.ObjectId,
  time: String,
  capacity: Number
});
