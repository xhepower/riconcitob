const Joi = require('joi');

const id = Joi.number().integer();
const clientId = Joi.number().integer();
const status = Joi.string();
const total = Joi.number().precision(2);
const createOrderSchema = Joi.object({
	// name: name.required(),
	// price: price.required(),
	// description: description,
	clientId: clientId,
	status: status.required(),
	total: total.required(),
});

const updateOrderSchema = Joi.object({
	clientId: clientId,
	status: status,
	total: total,
});

const getOrderSchema = Joi.object({
	id: id.required(),
});

module.exports = { createOrderSchema, updateOrderSchema, getOrderSchema };
