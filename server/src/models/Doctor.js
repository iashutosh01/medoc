const mongoose = require("mongoose");

module.exports = mongoose.model("Doctor", {
  name: String
});
