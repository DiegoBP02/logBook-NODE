const { StatusCodes } = require("http-status-codes");
const Muscle = require("../models/Muscle");

const createExercise = async (req, res) => {
  res.send("create exercise");
};

module.exports = { createExercise };
