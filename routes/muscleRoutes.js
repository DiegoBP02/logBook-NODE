import { Router } from "express";
const router = Router();

import {
  createName,
  getAllMuscles,
  getSingleMuscle,
} from "../controllers/muscleController.js";

import { getSingleMuscleExercises } from "../controllers/exerciseController.js";

import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authentication.js";

router
  .route("/")
  .post(authenticateUser, authorizePermissions("admin"), createName)
  .get(authenticateUser, getAllMuscles);
router.route("/:id/exercises").get(getSingleMuscleExercises);
router.route("/:id").get(getSingleMuscle);

export default router;
