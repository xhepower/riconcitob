const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();

const limit = Joi.number().integer();
const offset = Joi.number().integer();
const page_limit = Joi.number().integer();
const date = Joi.date();
const date_min = Joi.date();
const date_max = Joi.date();
const searchText = Joi.string();
const searchField = Joi.string();

const createUnitSchema = Joi.object({
	name: name.required(),
});

const updateUnitSchema = Joi.object({
	name: name,
});

const getUnitSchema = Joi.object({
	id: id.required(),
});
const queryUnitSchema = Joi.object({
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
	createUnitSchema,
	updateUnitSchema,
	getUnitSchema,
	queryUnitSchema,
};
