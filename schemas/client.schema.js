const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const phone = Joi.string();

const createClientSchema = Joi.object({
	name: name.required(),
	phone: phone,
});

const updateClientSchema = Joi.object({
	name: name,
	phone: phone,
});

const getClientSchema = Joi.object({
	id: id.required(),
});

module.exports = { createClientSchema, updateClientSchema, getClientSchema };
