const router = require("express").Router();

const {
  createExercise,
  getAllExercises,
  getExercisesByData,
  deleteExercise,
} = require("../controllers/exerciseController");

const { authenticateUser } = require("../middleware/authentication");

router
  .route("/")
  .post(authenticateUser, createExercise)
  .get(authenticateUser, getAllExercises);
router.route("/:exerciseId").delete(authenticateUser, deleteExercise);
router.route("/:date/:muscleId").get(authenticateUser, getExercisesByData);

module.exports = router;
