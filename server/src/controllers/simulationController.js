const { simulateDay } = require("../services/simulationService");

exports.runSimulation = async (req, res) => {
  const result = await simulateDay();
  res.json(result);
};
