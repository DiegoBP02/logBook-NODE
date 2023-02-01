const router = require("express").Router();

const {
  createExercise,
  getAllExercises,
} = require("../controllers/exerciseController");

const { authenticateUser } = require("../middleware/authentication");

router
  .route("/")
  .post(authenticateUser, createExercise)
  .get(authenticateUser, getAllExercises);

module.exports = router;
