import { Router } from "express";
const router = Router();

import {
  createWorkout,
  getAllWorkouts,
  deleteWorkout,
} from "../controllers/workoutController.js";

import { authenticateUser } from "../middleware/authentication.js";

router.route("/").post(authenticateUser, createWorkout);
router.route("/:muscleId").get(authenticateUser, getAllWorkouts);
router
  .route("/:workoutId/:muscleId/:date")
  .delete(authenticateUser, deleteWorkout);

export default router;
