import * as Joi from "joi";

export const createHalaqohValidation = Joi.object({
  nama_halaqoh: Joi.string().required(),
  tahun_ajaran: Joi.string().required(),
  nama_guru: Joi.string().required(),
  nama_anggota: Joi.string().required(),
  status: Joi.boolean().optional(),
});
