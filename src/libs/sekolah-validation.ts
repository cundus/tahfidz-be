import * as Joi from "joi";

export const createSekolahValidation = Joi.object({
  nama_sekolah: Joi.string().required(),
  nomor_telepon: Joi.string().required(),
  email: Joi.string().required(),
  website: Joi.string().optional(),
  alamat: Joi.string().required(),
  logo: Joi.string().optional(),
  status: Joi.boolean().required(),
});
