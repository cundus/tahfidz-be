// postValidation.ts
import * as Joi from "joi";

export const createPostValidation = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});
