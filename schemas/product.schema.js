const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const description = Joi.string();
const price = Joi.number().precision(2);
const idCategory = Joi.number().integer();

const createProductSchema = Joi.object({
	name: name.required(),
	price: price.required(),
	description: description,
	idCategory: idCategory,
});

const updateProductSchema = Joi.object({
	name: name,
	price: price,
	description: description,
	idCategory: idCategory,
});

const getProductSchema = Joi.object({
	id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
