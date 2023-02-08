const router = require("express").Router();

const {
  createWorkout,
  getAllWorkouts,
  deleteWorkout,
} = require("../controllers/workoutController");

const { authenticateUser } = require("../middleware/authentication");

router.route("/").post(authenticateUser, createWorkout);
router.route("/:muscleId").get(authenticateUser, getAllWorkouts);
router
  .route("/:workoutId/:muscleId/:date")
  .delete(authenticateUser, deleteWorkout);

module.exports = router;
