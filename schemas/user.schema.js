const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(3).valid('admin', 'user', 'editor');
const limit = Joi.number().integer();
const offset = Joi.number().integer();
const page_limit = Joi.number().integer();
const date = Joi.date();
const date_min = Joi.date();
const date_max = Joi.date();
const createUserSchema = Joi.object({
	email: email.required(),
	password: password.required(),
	role: role.required(),
});

const updateUserSchema = Joi.object({
	email: email,
	role: role,
});

const getUserSchema = Joi.object({
	id: id.required(),
});
const queryUserSchema = Joi.object({
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
	createUserSchema,
	updateUserSchema,
	getUserSchema,
	queryUserSchema,
};
