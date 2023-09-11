const categoriesServices = require('../services/categoriesServices');

const getCategories = async (_req, res) => {
  try {
    const allCategories = await categoriesServices.getCategories();
    return res.status(200).json(allCategories);
  } catch (error) {
    console.log(error);
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await categoriesServices.createCategory(name);

    if (newCategory.status === 201) {
      return res.status(newCategory.status).json(newCategory.newCategory.dataValues);
    }

    return res.status(newCategory.status).json({ message: newCategory.message });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createCategory, getCategories }; 