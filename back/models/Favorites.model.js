const sequelize = require("../config/db");
const Sequelize = require("sequelize");

class Favorites extends Sequelize.Model {}

Favorites.init(
  {
    userId: {
      type: Sequelize.INTEGER,
    },
    propertyId: {
      type: Sequelize.INTEGER,
    },
  },
  { sequelize, modelName: "favorites" }
);

module.exports = Favorites;
