const Joi = require('joi');
const { Category } = require('../database/models');

const validationField = async (name) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
  }).validate({ name });

  if (error === undefined) {
    const newCategory = await Category.create({ name });
    return { status: 201, newCategory };
  }

  if (error.message.includes('name')) return { status: 400, message: error.message };
};

const createCategory = async (name) => {
  const data = await validationField(name);
  return data;
};

const getCategories = async () => {
  const allCategories = await Category.findAll();
  return allCategories;
};

module.exports = { createCategory, getCategories };