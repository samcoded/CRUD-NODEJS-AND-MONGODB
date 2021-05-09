const mongoose = require("mongoose");

const entrySchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  id: { type: String },
});

module.exports = mongoose.model("Entry", entrySchema);
