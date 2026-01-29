const express = require("express");
const router = express.Router();
const { runSimulation } = require("../controllers/simulationController");

router.post("/", runSimulation);

module.exports = router;
