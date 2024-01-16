import * as Joi from "joi";

export const loginValidation = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
