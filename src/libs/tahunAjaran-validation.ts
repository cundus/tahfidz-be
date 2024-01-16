import * as Joi from "joi";

export const createTahunAjaranValidation = Joi.object({
  nama_tahun_ajaran: Joi.string().required(),
  status: Joi.boolean().optional(),
});
