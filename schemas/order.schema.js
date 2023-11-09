const Joi = require('joi');

const id = Joi.number().integer();
const clientId = Joi.number().integer();
const status = Joi.string();
const total = Joi.number().precision(2);

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
const createOrderSchema = Joi.object({
	// name: name.required(),
	// price: price.required(),
	// description: description,
	clientId: clientId,
	status: status,
	total: total,
});

const updateOrderSchema = Joi.object({
	clientId: clientId,
	status: status,
	total: total,
});

const getOrderSchema = Joi.object({
	id: id.required(),
});
const queryOrderSchema = Joi.object({
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
	createOrderSchema,
	updateOrderSchema,
	getOrderSchema,
	queryOrderSchema,
};
