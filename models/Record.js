import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  hours: {
    type: Number, // Correcting the type to Number
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now, // Set default to current date
  },
});

const Record = mongoose.model("Record", recordSchema);

export default Record;
