import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Siswa } from "../entities/Siswa";
import { createSiswaValidation } from "../libs/siswa-validation";

class SiswaService {
  private readonly siswaRepository: Repository<Siswa> =
    AppDataSource.getRepository(Siswa);

  async find(): Promise<any> {
    try {
      const siswa = await this.siswaRepository.find();
      return {
        message: "Successfully Get Siswa",
        data: siswa,
      };
    } catch (err) {
      throw new Error("Something Wrong with the server");
    }
  }

  async findOne(id: any): Promise<any> {
    try {
      const siswa = await this.siswaRepository.findOne({
        where: {
          id: id,
        },
      });

      if (siswa === null || siswa === undefined) {
        // Customize the response when user is not found
        return {
          message: "User not found!",
        };
      }

      return {
        message: "Successfully Get Siswa",
        data: siswa,
      };
    } catch (err) {
      throw new Error("Something Wrong with the server");
    }
  }

  async create(reqBody: any): Promise<any> {
    try {
      const { error } = createSiswaValidation.validate(reqBody);
      if (error) {
        return {
          message: "Validation error",
          error: error.details[0].message,
          status: 400,
        };
      }

      const siswa = this.siswaRepository.create({
        NIS: reqBody.NIS,
        username: reqBody.username,
        password: reqBody.password,
        alamat: reqBody.alamat,
        jenis_kelamin: reqBody.jenis_kelamin,
        nama_ayah: reqBody.nama_ayah,
        nama_ibu: reqBody.nama_ibu,
        nama_lengkap: reqBody.nama_lengkap,
        nomor_telepon_ayah: reqBody.nomor_telepon_ayah,
        nomor_telepon_ibu: reqBody.nomor_telepon_ibu,
        pekerjaan_ayah: reqBody.pekerjaan_ayah,
        pekerjaan_ibu: reqBody.pekerjaan_ibu,
        tanggal_lahir: reqBody.tanggal_lahir,
        tempat_lahir: reqBody.tempat_lahir,
        foto: reqBody.foto,
        status: reqBody.status,
      });

      await this.siswaRepository.save(siswa);

      return {
        message: "Siswa successfully created!",
        data: siswa,
      };
    } catch (err) {
      console.error("Error in create method:", err);
      throw new Error("Something Wrong with the server");
    }
  }

  async update(reqBody?: any, id?: any): Promise<any> {
    try {
      const siswa = await this.siswaRepository.findOneOrFail({
        where: {
          id: id,
        },
      });

      siswa.NIS = reqBody.NIS;
      siswa.username = reqBody.username;
      siswa.password = reqBody.password;
      siswa.alamat = reqBody.alamat;
      siswa.jenis_kelamin = reqBody.jenis_kelamin;
      siswa.nama_ayah = reqBody.nama_ayah;
      siswa.nama_ibu = reqBody.nama_ibu;
      siswa.nama_lengkap = reqBody.nama_lengkap;
      siswa.nomor_telepon_ayah = reqBody.nomor_telepon_ayah;
      siswa.nomor_telepon_ibu = reqBody.nomor_telepon_ibu;
      siswa.pekerjaan_ayah = reqBody.pekerjaan_ayah;
      siswa.pekerjaan_ibu = reqBody.pekerjaan_ibu;
      siswa.tanggal_lahir = reqBody.tanggal_lahir;
      siswa.tempat_lahir = reqBody.tempat_lahir;
      siswa.foto = reqBody.foto;
      siswa.status = reqBody.status;

      const siswaUpdate = await this.siswaRepository.save(siswa);
      return {
        message: "Sucessfully update siswa data!",
        data: siswaUpdate,
      };
    } catch (err) {
      throw new Error("Something wrong on the server!");
    }
  }

  async delete(id: any): Promise<any> {
    try {
      await this.siswaRepository.delete(id);

      return {
        message: "Siswa deleted successfully!",
      };
    } catch (error) {
      throw new Error("Something wrong on the server!");
    }
  }
}

export default new SiswaService();
