const express = require("express");

const morgan = require("morgan");

const carRouter = require("../routes/carRouters");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

//a

app.get("/", (req, res) => {
  res.send({
    message: "ping successfully",
  });
});

app.use("/api/v1/cars", carRouter);
module.exports = app;
