import { Router } from "express";
const router = Router();

import {
  createExercise,
  getAllExercises,
  getExercisesByData,
  deleteExercise,
} from "../controllers/exerciseController.js";

import { authenticateUser } from "../middleware/authentication.js";

router
  .route("/")
  .post(authenticateUser, createExercise)
  .get(authenticateUser, getAllExercises);
router.route("/:exerciseId").delete(authenticateUser, deleteExercise);
router.route("/:date/:muscleId").get(authenticateUser, getExercisesByData);

export default router;
