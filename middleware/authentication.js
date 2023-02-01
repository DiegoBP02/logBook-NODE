const CustomError = require("../errors");
const { isTokenValid } = require("../utils");
const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid!");
  }

  try {
    const payload = isTokenValid({ token });
    const { name, userId, role } = payload.payload;
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid!");
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route!"
      );
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
