const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
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

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
