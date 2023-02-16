import Muscle from "../models/Muscle.js";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";

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
    throw new BadRequestError(`There is no muscle with ${id}!`);
  }

  res.status(StatusCodes.OK).json({ muscle });
};

export { createName, getAllMuscles, getSingleMuscle };
