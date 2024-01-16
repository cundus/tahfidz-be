import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Guru } from "../entities/Guru";
import { createGuruValidation } from "../libs/guru-validation";

class GuruService {
  private readonly guruRepository: Repository<Guru> =
    AppDataSource.getRepository(Guru);

  async find(): Promise<any> {
    try {
      const guru = await this.guruRepository.find();
      return {
        message: "Successfully Get Guru",
        data: guru,
      };
    } catch (err) {
      throw new Error("Something Wrong with the server");
    }
  }

  async findOne(id: any): Promise<any> {
    try {
      const guru = await this.guruRepository.findOne({
        where: {
          id: id,
        },
      });
      return {
        message: "Successfully Get Guru",
        data: guru,
      };
    } catch (err) {
      throw new Error("Something Wrong with the server");
    }
  }

  async create(reqBody: any): Promise<any> {
    try {
      const { error } = createGuruValidation.validate(reqBody);
      if (error) {
        return {
          message: "Validation error",
          error: error.details[0].message,
          status: 400,
        };
      }

      const guru = this.guruRepository.create({
        nama_lengkap: reqBody.nama_lengkap,
        username: reqBody.username,
        password: reqBody.password,
        NIG: reqBody.NIG,
        tempat_lahir: reqBody.tempat_lahir,
        tanggal_lahir: reqBody.tanggal_lahir,
        jenis_kelamin: reqBody.jenis_kelamin,
        email: reqBody.email,
        nomor_telepon: reqBody.nomor_telepon,
        posisi: reqBody.posisi,
        tanggal_bergabung: reqBody.tanggal_bergabung,
        alamat: reqBody.alamat,
        foto: reqBody.foto,
        status: reqBody.status,
      });

      await this.guruRepository.save(guru);

      return {
        message: "Guru successfully created!",
        data: guru,
      };
    } catch (err) {
      console.error("Error in create method:", err);
      throw new Error("Something Wrong with the server");
    }
  }

  async update(reqBody?: any, id?: any): Promise<any> {
    try {
      const guru = await this.guruRepository.findOneOrFail({
        where: {
          id: id,
        },
      });

      guru.nama_lengkap = reqBody.nama_lengkap;
      guru.username = reqBody.username;
      guru.password = reqBody.password;
      guru.NIG = reqBody.NIG;
      guru.tempat_lahir = reqBody.tempat_lahir;
      guru.tanggal_lahir = reqBody.tanggal_lahir;
      guru.jenis_kelamin = reqBody.jenis_kelamin;
      guru.email = reqBody.email;
      guru.nomor_telepon = reqBody.nomor_telepon;
      guru.posisi = reqBody.posisi;
      guru.tanggal_bergabung = reqBody.tanggal_bergabung;
      guru.alamat = reqBody.alamat;
      guru.foto = reqBody.foto;
      guru.status = reqBody.status;

      const guruUpdate = await this.guruRepository.save(guru);
      return {
        message: "Sucessfully update guru!",
        data: guruUpdate,
      };
    } catch (err) {
      throw new Error("Something wrong on the server!");
    }
  }

  async delete(id: any): Promise<any> {
    try {
      await this.guruRepository.delete(id);

      return {
        message: "Guru deleted successfully!",
      };
    } catch (error) {
      throw new Error("Something wrong on the server!");
    }
  }
}

export default new GuruService();
