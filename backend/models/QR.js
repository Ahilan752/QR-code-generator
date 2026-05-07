const mongoose = require("mongoose");

const qrSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  rawData: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("QR", qrSchema);
