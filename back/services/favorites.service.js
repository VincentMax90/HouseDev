const Property = require("../models/Property.model");
const Favorites = require("../models/Favorites.model");
const User = require("../models/User.model");

async function getUserFavorites(userId) {
  return Favorites.findAll({ where: { userId } });


}

async function getFavoriteWithDataById(favoriteId) {
  try {
    const favorite = await Favorites.findByPk(favoriteId, {
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
        {
          model: Property,
          attributes: ["id", "name", "address"],
        },
      ],
    });

    return favorite;
  } catch (error) {
    throw new Error("Error al buscar el Favorite: " + error.message);
  }
}

async function addFavorite(userId, propertyId) {
  return Favorites.findOrCreate({
    where: { userId, propertyId },
  });
}



async function removeFavorite(favoriteId) {
  return Favorites.destroy({ where: { id: favoriteId } });
}

module.exports = {
  getUserFavorites,
  getFavoriteWithDataById,
  addFavorite,
  removeFavorite,
};
