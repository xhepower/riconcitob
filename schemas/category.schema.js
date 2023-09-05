const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const description = Joi.string();

const createCategorySchema = Joi.object({
	name: name.required(),
	description: description,
});

const updateCategorySchema = Joi.object({
	name: name,
	description: description,
});

const getCategorySchema = Joi.object({
	id: id.required(),
});

module.exports = {
	createCategorySchema,
	updateCategorySchema,
	getCategorySchema,
};
