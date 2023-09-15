const Property = require("../models/Property.model")


async function getPropertytByCategory(operation) {
  return Property.findAll({ where: { operation } });
}

async function getAllProperty() {
  return Property.findAll()
}

async function getProperty (id) {
 
  return Property.findOne( {where: {
    id: id,
  }});
};

module.exports = {getPropertytByCategory,getAllProperty,getProperty}

