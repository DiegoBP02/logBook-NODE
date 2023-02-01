const Muscle = require("../models/Muscle");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createName = async (req, res) => {
  const muscle = await Muscle.create(req.body);
  res.status(StatusCodes.CREATED).json({ muscle });
};

const getAllMuscles = async (req, res) => {
  const muscles = await Muscle.find({});
  res.status(StatusCodes.OK).json({ muscles });
};

const getSingleMuscle = async (req, res) => {
  const { id: muscleId } = req.params;
  const muscle = await Muscle.findOne({ _id: muscleId });
  if (!muscle) {
    throw new CustomError.BadRequestError(`There is no muscle with ${id}!`);
  }

  res.status(StatusCodes.OK).json({ muscle });
};

module.exports = { createName, getAllMuscles, getSingleMuscle };
