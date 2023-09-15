const Property = require("../models/Property.model");
const User = require("../models/User.model")

async function submitProperty(location,price,category,description,imgsUrl,bathrooms,surface,operation,address,ambientes) {
  try {
    const property = await Property.create({ location,price,category,description,imgsUrl,bathrooms,surface,operation,address,ambientes });
    return property;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteProperty(id){
  return await Property.destroy({
    where: {
      id: id,
    },
  });
};

async function getAllUser() {
  return User.findAll()
}

async function userDelete(id){
  return await User.destroy({
    where: {
      id: id,
    },
  });
};

async function editProperty(id, property){
  const editProperty = await Property.update(property, {
    where: {
      id: id,
    },
  });}


module.exports = {
  submitProperty,deleteProperty,getAllUser,userDelete,editProperty,

};