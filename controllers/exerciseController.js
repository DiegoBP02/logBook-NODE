const { StatusCodes } = require("http-status-codes");
const Muscle = require("../models/Muscle");
const CustomError = require("../errors");
const Exercise = require("../models/Exercise");

const createExercise = async (req, res) => {
  const { muscle } = req.body;

  const muscles = await (await Muscle.find({})).map(({ name }) => name);
  const isMuscleValid = await Muscle.findOne({ name: muscle });
  if (!isMuscleValid) {
    throw new CustomError.BadRequestError(
      `There is no ${muscle} category, categories available: ${muscles}`
    );
  }

  req.body.muscleId = isMuscleValid._id;
  req.body.user = req.user.userId;

  const exercise = await Exercise.create(req.body);
  res.status(StatusCodes.CREATED).json({ exercise });
};

const getAllExercises = async (req, res) => {
  const { userId } = req.user;
  const exercises = await Exercise.find({ user: userId }).populate({
    path: "user",
    select: "name",
  });
  res.status(StatusCodes.OK).json({ exercises, count: exercises.length });
};

const getSingleMuscleExercises = async (req, res) => {
  const { id } = req.params;
  const muscle = await Muscle.find({ _id: id }).populate("exercise");
  res.status(StatusCodes.OK).json({ muscle });
};

module.exports = { createExercise, getAllExercises, getSingleMuscleExercises };
