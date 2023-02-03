const router = require("express").Router();

const {
  register,
  login,
  logout,
  getCurrentUser,
} = require("../controllers/authController");
const { authenticateUser } = require("../middleware/authentication");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/getCurrentUser", getCurrentUser);
router.route("/logout").get(logout);

module.exports = router;
