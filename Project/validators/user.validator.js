const Joi = require('joi');

const userRegisterSchema = Joi.object({
  fullname: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  contact: Joi.number().optional()
});

module.exports = userRegisterSchema;
