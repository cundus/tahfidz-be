import * as Joi from "joi";

export const createGuruValidation = Joi.object({
  nama_lengkap: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  NIG: Joi.string().required(),
  tempat_lahir: Joi.string().required(),
  tanggal_lahir: Joi.date().required(),
  jenis_kelamin: Joi.string().required(),
  email: Joi.string().required(),
  nomor_telepon: Joi.string().required(),
  posisi: Joi.string().required(),
  tanggal_bergabung: Joi.string().required(),
  alamat: Joi.string().optional(),
  foto: Joi.string().optional(),
  status: Joi.boolean().optional(),
});
