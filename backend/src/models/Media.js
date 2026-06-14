const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  url: String,
  type: String,
  roomId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: Date,
});

module.exports = mongoose.model("Media", mediaSchema);