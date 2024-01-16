import * as Joi from "joi";

export const createSiswaValidation = Joi.object({
  NIS: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  alamat: Joi.string().optional(),
  jenis_kelamin: Joi.string().required(),
  nama_ayah: Joi.string().required(),
  nama_ibu: Joi.string().required(),
  nama_lengkap: Joi.string().required(),
  nomor_telepon_ayah: Joi.string().optional(),
  nomor_telepon_ibu: Joi.string().optional(),
  pekerjaan_ayah: Joi.string().optional(),
  pekerjaan_ibu: Joi.string().optional(),
  tanggal_lahir: Joi.date().required(),
  tempat_lahir: Joi.string().required(),
  foto: Joi.string().optional(),
  status: Joi.boolean().optional(),
});
