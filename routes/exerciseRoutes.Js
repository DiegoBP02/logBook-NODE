const router = require("express").Router();

const {
  createExercise,
  getAllExercises,
  getExercisesByData,
  createWorkout,
} = require("../controllers/exerciseController");

const { authenticateUser } = require("../middleware/authentication");

router
  .route("/")
  .post(authenticateUser, createExercise)
  .get(authenticateUser, getAllExercises);
router.route("/:createdAt/:muscleId").get(authenticateUser, getExercisesByData);

module.exports = router;
