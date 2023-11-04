const Joi = require('joi');
const id = Joi.number().integer();
const ingredientId = Joi.number().integer();
const productId = Joi.number().integer();
const quantity = Joi.number().precision(2);
const limit = Joi.number().integer();
const offset = Joi.number().integer();
const page_limit = Joi.number().integer();
const fk = Joi.string();
const fkIndex = Joi.number().integer();
const date = Joi.date();
const date_min = Joi.date();
const date_max = Joi.date();
const searchText = Joi.string();
const searchField = Joi.string();
const createDetailProductSchema = Joi.object({
	ingredientId: ingredientId.required(),
	productId: productId.required(),
	quantity: quantity.required(),
});

const updateDetailProductSchema = Joi.object({
	ingredientId: ingredientId,
	productId: productId,
	quantity: quantity,
});
const getDetailProductSchema = Joi.object({
	id: id.required(),
});
const queryDetailProductSchema = Joi.object({
	searchText,
	searchField,
	limit,
	offset,
	page_limit,
	date,
	date_min,
	fk,
	fkIndex,
	date_max: date_max.when('date_min', {
		is: date_min.required(),
		then: Joi.required(),
	}),
});
module.exports = {
	createDetailProductSchema,
	updateDetailProductSchema,
	getDetailProductSchema,
	queryDetailProductSchema,
};
