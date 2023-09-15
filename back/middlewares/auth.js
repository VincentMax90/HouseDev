const { validateToken } = require("../config/tokens");
const User = require("../models/User.model");
const userService = require("../services/user.service");

function validateAuth(req, res, next) {
  const token = req.cookies.token;

  if (!token) return res.sendStatus(401);

  const { user } = validateToken(token);
  

  if (!user) return res.sendStatus(401);

  req.user = user;

  next();
}


const validateUserProfileAccess = (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  if (parseInt(id) !== userId) {
    return res
      .status(403)
      .json({ message: "No tienes permiso para acceder a este perfil" });
  }

  next();
};

module.exports = { validateAuth, validateUserProfileAccess };
