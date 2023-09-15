const Appointments = require("./Appointment.model");
const Property = require("./Property.model");
const User = require("./User.model");
const Favorites = require("./Favorites.model");

Favorites.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(Favorites, { foreignKey: "userId" });

Favorites.belongsTo(Property, { foreignKey: "propertyId" });
Property.hasMany(Favorites, { foreignKey: "propertyId" });


module.exports = { Appointments, Property, User, Favorites };
