const { StatusCodes } = require("http-status-codes");
const Muscle = require("../models/Muscle");
const CustomError = require("../errors");
const Exercise = require("../models/Exercise");

const createExercise = async (req, res) => {
  const { muscleId } = req.body;

  const muscle = await Muscle.findOne({ _id: muscleId });
  if (!muscle) {
    throw new CustomError.BadRequestError(
      `There is no ${muscleId} muscle category id!`
    );
  }

  req.body.muscle = muscle.name;
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

const getExercisesByData = async (req, res) => {
  const muscleId = req.params.muscleId;
  const date = req.params.date;
  const userId = req.user.userId;

  const muscleName = (await Muscle.findOne({ _id: muscleId })).name;

  const exercises = await Exercise.find({
    date,
    muscle: muscleName,
    user: { _id: userId },
  });

  if (!exercises) {
    throw new CustomError.BadRequestError(
      "There are no exercises created on the given date!"
    );
  }

  res
    .status(StatusCodes.OK)
    .json({ exercises, muscleId, count: exercises.length });
};

const deleteExercise = async (req, res) => {
  const exerciseId = req.params.exerciseId;

  const exercise = await Exercise.findOne({ _id: exerciseId });
  if (!exercise) {
    throw new CustomError.BadRequestError(
      `There is no exercise with ${exerciseId} id`
    );
  }

  await exercise.remove();
  res.status(StatusCodes.OK).json({ msg: "Successful! Exercise removed!" });
};

module.exports = {
  createExercise,
  getAllExercises,
  getSingleMuscleExercises,
  getExercisesByData,
  deleteExercise,
};
