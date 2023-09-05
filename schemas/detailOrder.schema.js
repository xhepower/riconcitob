const Joi = require('joi');
const id = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const quantity = Joi.number().precision(2);
const createDetailOrderSchema = Joi.object({
	orderId: orderId.required(),
	productId: productId.required(),
	quantity: quantity.required(),
});

const updateDetailOrderSchema = Joi.object({
	orderId: orderId,
	productId: productId,
	quantity: quantity,
});
const getDetailOrderSchema = Joi.object({
	id: id.required(),
});

module.exports = {
	createDetailOrderSchema,
	updateDetailOrderSchema,
	getDetailOrderSchema,
};
