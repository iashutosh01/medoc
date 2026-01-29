const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/api/tokens", require("./routes/tokenRoutes"));
app.use("/api/simulate", require("./routes/simulationRoutes"));

module.exports = app;
