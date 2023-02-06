const Workout = require("../models/Workout");
const Muscle = require("../models/Muscle");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createWorkout = async (req, res) => {
  const { date, muscleId } = req.body;

  const [day, month, year] = date.split("/");
  const formattedDate = new Date(year, month - 1, day);
  formattedDate.toISOString();

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
  console.log(muscleId, userId);
  const workouts = await Workout.find({ userId, muscleId });
  if (!workouts) {
    throw new CustomError.BadRequestError(
      `Something went wrong! Please check the if the values are correct!`
    );
  }

  res.status(StatusCodes.OK).json({ workouts, count: workouts.length });
};

module.exports = { createWorkout, getAllWorkouts };
