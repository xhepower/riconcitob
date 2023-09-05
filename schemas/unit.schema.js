const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();

const createUnitSchema = Joi.object({
	name: name.required(),
});

const updateUnitSchema = Joi.object({
	name: name,
});

const getUnitSchema = Joi.object({
	id: id.required(),
});

module.exports = { createUnitSchema, updateUnitSchema, getUnitSchema };
