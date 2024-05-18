const Record = require("../models/Record");

// Add the record
module.exports.add = async (req, res) => {
  const { userId, hours } = req.body;
  if (!userId || !hours) {
    return res.status(400).send("Missing required fields");
  }

  // Validate that hours is a positive number
  if (typeof hours !== "number" || hours <= 0) {
    return res
      .status(400)
      .send("Invalid hours value, it must be a positive number");
  }

  try {
    const timestamp = new Date(); // Automatically set the current timestamp
    const newRecord = new Record({ userId, hours, timestamp });
    await newRecord.save();
    res.status(201).send({ newRecord, success: true });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Retrieve the record
module.exports.retrieve = async (req, res) => {
  const userId = req.params.userId;

  try {
    const userRecords = await Record.find({ userId }).sort({ timestamp: -1 });
    res.status(200).send(userRecords);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Delete the record
module.exports.delete = async (req, res) => {
  const recordId = req.params.recordId;

  try {
    const result = await Record.findByIdAndDelete(recordId);
    if (!result) {
      return res.status(404).send("Record not found");
    }
    res.status(200).send("Record deleted");
  } catch (error) {
    const errMessage = error.message;
    res.status(500).send({
      "Error Message": errMessage,
      Suggestion: "Use a valid mongoDB id",
    });
  }
};
