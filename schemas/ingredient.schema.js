const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const unitId = Joi.number().integer();
const price = Joi.number().precision(2);
const stock = Joi.number().precision(2);
const minimum = Joi.number().precision(2);
const createIngredientSchema = Joi.object({
	name: name.required(),
	price: price.required(),
	unitId: unitId.required(),
	stock: stock.required(),
	minimum: minimum.required(),
});

const updateIngredientSchema = Joi.object({
	name: name,
	price: price,
	unitId: unitId,
	stock: stock,
	minimum: minimum,
});

const getIngredientSchema = Joi.object({
	id: id.required(),
});

module.exports = {
	createIngredientSchema,
	updateIngredientSchema,
	getIngredientSchema,
};
