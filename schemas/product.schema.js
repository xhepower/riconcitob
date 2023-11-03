const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const description = Joi.string();
const price = Joi.number().precision(2);
const idCategory = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();
const page_limit = Joi.number().integer();
const date = Joi.date();
const date_min = Joi.date();
const date_max = Joi.date();
const searchText = Joi.string();
const searchField = Joi.string();
const createProductSchema = Joi.object({
	name: name.required(),
	price: price.required(),
	description: description,
	idCategory: idCategory,
});
const queryProductSchema = Joi.object({
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
const updateProductSchema = Joi.object({
	name: name,
	price: price,
	description: description,
	idCategory: idCategory,
});

const getProductSchema = Joi.object({
	id: id.required(),
});

module.exports = {
	createProductSchema,
	updateProductSchema,
	getProductSchema,
	queryProductSchema,
};
