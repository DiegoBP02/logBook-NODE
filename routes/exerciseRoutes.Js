const router = require("express").Router();

const { createExercise } = require("../controllers/exerciseController");

router.route("/").post(createExercise);

module.exports = router;
