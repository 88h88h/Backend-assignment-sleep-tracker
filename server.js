const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const sleepRoutes = require("./routes/sleepRoutes");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api", sleepRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to Database");
    app.listen(PORT, () => {
      console.log(`Listening at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
