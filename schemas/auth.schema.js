const Joi = require('joi');
const email = Joi.string().email();
const password = Joi.string();
const newPassword = Joi.string().min(8);
const token = Joi.string();
const authSchema = Joi.object({
  email: email,
  password: password,
});
const recoverySchema = Joi.object({
  token: token.required(),
  newPassword: newPassword.required(),
});

module.exports = { authSchema, recoverySchema };
