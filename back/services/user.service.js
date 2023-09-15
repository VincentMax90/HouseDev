const User = require("../models/User.model");
const tokenService = require("../config/tokens");
const bcrypt = require("bcrypt");

async function registerUser(name, lastname, email, password, admin) {
  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      throw new Error("El correo electrónico ya está registrado");
    }

    const user = await User.create({ name, lastname, email, password, admin });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function findUserByEmail(email) {
  return User.findOne({
    where: { email },
  });
}

async function getUserById(userId) {
  return User.findByPk(userId);
}

async function validateUserPassword(password, secondPassword) {
  return bcrypt.compare(password, secondPassword);
}

function generateToken(payload) {
  return tokenService.generateToken(payload);
}

async function getUserProfile(userId) {
  const userProfile = await User.findByPk(userId, {
    attributes: {
      exclude: ["password"],
      include: ["name", "lastname", "email", "phone", "img_url"],
    },
  });
  return userProfile;
}

async function updateUserProfile(userId, profileData) {
  try {
    await User.update(
      {
        name: profileData.name,
        phone: profileData.phone,
        lastname: profileData.lastname,
      },
      { returning: true, where: { id: userId } }
    );

    const updatedUser = await User.findByPk(userId, {
      attributes: {
        exclude: ["password"],
        include: ["name", "lastname", "email", "phone", "img_url"],
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error al actualizar el perfil del usuario:", error);
    throw new Error("Error al actualizar el perfil del usuario");
  }
}

async function updateUserImage(userId, img_url) {
  try {
    await User.update({ img_url }, { returning: true, where: { id: userId } });
  } catch (error) {
    console.error("Error al actualizar la img_url del usuario:", error);
    throw new Error("Error al actualizar la img_url del usuario");
  }
}

module.exports = {
  registerUser,
  findUserByEmail,
  getUserById,
  validateUserPassword,
  generateToken,
  getUserProfile,
  updateUserProfile,
  updateUserImage,
};
