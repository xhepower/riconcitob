const Joi = require('joi');
const id = Joi.number().integer();
const ingredientId = Joi.number().integer();
const productId = Joi.number().integer();
const quantity = Joi.number().precision(2);
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

module.exports = {
	createDetailProductSchema,
	updateDetailProductSchema,
	getDetailProductSchema,
};
