const Workout = require("../models/Workout");
const Muscle = require("../models/Muscle");
const Exercise = require("../models/Exercise");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createWorkout = async (req, res) => {
  const { muscleId } = req.body;

  const isMuscleValid = await Muscle.findOne({ _id: muscleId });
  if (!isMuscleValid) {
    throw new CustomError.BadRequestError(
      `There is no muscle with ${muscleId} id!`
    );
  }

  req.body.muscleId = isMuscleValid._id;
  req.body.muscle = isMuscleValid.name;
  req.body.userId = req.user.userId;

  const workout = await Workout.create(req.body);

  res.status(StatusCodes.CREATED).json({ workout });
};

const getAllWorkouts = async (req, res) => {
  const { muscleId } = req.params;
  const { userId } = req.user;

  const workouts = await Workout.find({ userId, muscleId });
  if (!workouts) {
    throw new CustomError.BadRequestError(
      `Something went wrong! Please check the if the values are correct!`
    );
  }

  res.status(StatusCodes.OK).json({ workouts, count: workouts.length });
};

const deleteWorkout = async (req, res) => {
  const { workoutId } = req.params;
  const { muscleId } = req.params;
  const { date } = req.params;

  const workout = await Workout.findOne({ _id: workoutId });
  const exercises = await Exercise.find({ muscleId, date });

  if (!workout) {
    throw new CustomError.BadRequestError(
      `No workout found with ${workoutId} id!`
    );
  }

  await workout.remove();
  exercises.forEach(async (exercise) => {
    await exercise.remove();
  });

  res
    .status(StatusCodes.OK)
    .json({ msg: "Successful! Workout and exercises removed!" });
};

module.exports = { createWorkout, getAllWorkouts, deleteWorkout };
