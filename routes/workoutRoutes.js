const router = require("express").Router();

const {
  createWorkout,
  getAllWorkouts,
} = require("../controllers/workoutController");

const { authenticateUser } = require("../middleware/authentication");

router.route("/").post(authenticateUser, createWorkout);
router.route("/:muscleId").get(authenticateUser, getAllWorkouts);

module.exports = router;
