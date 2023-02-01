const router = require("express").Router();

const {
  createName,
  getAllMuscles,
  getSingleMuscle,
} = require("../controllers/muscleController");

const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

router
  .route("/")
  .post(authenticateUser, authorizePermissions("admin"), createName)
  .get(authenticateUser, getAllMuscles);
router.route("/:id").get(getSingleMuscle);

module.exports = router;
