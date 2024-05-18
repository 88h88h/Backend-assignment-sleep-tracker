const mongoose = require("mongoose");

const durationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  hours: {
    type: String,
    required: Number,
    unique: true,
  },

  timestamp: {
    type: Date,
    required: true,
    unique: true,
  },
});

const Duration = mongoose.model("Duration", durationSchema);

module.exports = Duration;
