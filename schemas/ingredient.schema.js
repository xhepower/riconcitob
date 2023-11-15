const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const unitId = Joi.number().integer();
const price = Joi.number().precision(2);
const stock = Joi.number().precision(2);
const minimum = Joi.number().precision(2);
const cost = Joi.number().precision(2);
const isProduct = Joi.boolean();
const limit = Joi.number().integer();
const offset = Joi.number().integer();
const page_limit = Joi.number().integer();
const date = Joi.date();
const date_min = Joi.date();
const date_max = Joi.date();
const searchText = Joi.string();
const searchField = Joi.string();
const createIngredientSchema = Joi.object({
	name: name.required(),
	price: price.required(),
	unitId: unitId.required(),
	stock: stock.required(),
	minimum: minimum.required(),
	cost: cost.required(),
	isProduct: isProduct.required(),
});

const updateIngredientSchema = Joi.object({
	name: name,
	price: price,
	unitId: unitId,
	stock: stock,
	minimum: minimum,
	cost: cost,
	isProduct: isProduct,
});

const getIngredientSchema = Joi.object({
	id: id.required(),
});
const queryIngredientSchema = Joi.object({
	searchText,
	searchField,
	limit,
	offset,
	page_limit,
	date,
	date_min,
	date_max: date_max.when('date_min', {
		is: date_min.required(),
		then: Joi.required(),
	}),
});
module.exports = {
	createIngredientSchema,
	updateIngredientSchema,
	getIngredientSchema,
	queryIngredientSchema,
};
