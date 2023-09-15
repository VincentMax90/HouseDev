const propertyService = require("../services/property.service");

exports.getPropertyByCategory = async (req, res) => {
  try {
    const name = req.params.name;
    const property = await propertyService.getPropertytByCategory(name);
    return res.status(200).send(property);
  } catch (error) {
    return res.status(500).json({ error: "Search failed" });
  }
};

exports.getAllProperty = async (req, res) => {
  try {
    const properties = await propertyService.getAllProperty();
    return res.status(200).send(properties);
  } catch (error) {
    return res.status(500).json({ error: "Search failed" });
  }
};

exports.getProperty = async (req, res) => {
  try {
    const id = req.params.id;
    const property = await propertyService.getProperty(id);
    if (!property) {
      return res.status(404).json({ message: 'Propiedad no encontrada.' });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la propiedad.' });
  }
};

