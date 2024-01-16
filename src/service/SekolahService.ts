import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Sekolah } from "../entities/Sekolah";
import { createSekolahValidation } from "../libs/sekolah-validation";

class SekolahService {
  private readonly sekolahRepository: Repository<Sekolah> =
    AppDataSource.getRepository(Sekolah);

  async find(): Promise<any> {
    try {
      const sekolah = await this.sekolahRepository.find();
      return {
        message: "Successfully Get Sekolah",
        data: sekolah,
      };
    } catch (err) {
      throw new Error("Something Wrong with the server");
    }
  }

  async findOne(id: any): Promise<any> {
    try {
      const sekolah = await this.sekolahRepository.findOne({
        where: {
          id: id,
        },
      });
      return {
        message: "Successfully Get Sekolah",
        data: sekolah,
      };
    } catch (err) {
      throw new Error("Something Wrong with the server");
    }
  }

  async create(reqBody: any): Promise<any> {
    try {
      const { error } = createSekolahValidation.validate(reqBody);
      if (error) {
        return {
          message: "Validation error",
          error: error.details[0].message,
          status: 400,
        };
      }

      const sekolah = this.sekolahRepository.create({
        nama_sekolah: reqBody.nama_sekolah,
        nomor_telepon: reqBody.nomor_telepon,
        email: reqBody.email,
        website: reqBody.website,
        alamat: reqBody.alamat,
        logo: reqBody.logo,
        status: reqBody.status,
      });

      await this.sekolahRepository.save(sekolah);

      return {
        message: "Sekolah successfully Created!",
        data: sekolah,
      };
    } catch (err) {
      console.error("Error in create method:", err);
      throw new Error("Something Wrong with the server");
    }
  }

  async update(reqBody?: any, id?: any): Promise<any> {
    try {
      const sekolah = await this.sekolahRepository.findOneOrFail({
        where: {
          id: id,
        },
      });

      sekolah.nama_sekolah = reqBody.nama_sekolah;
      sekolah.nomor_telepon = reqBody.nomor_telepon;
      sekolah.email = reqBody.email;
      sekolah.website = reqBody.website;
      sekolah.alamat = reqBody.alamat;
      sekolah.logo = reqBody.logo;
      sekolah.status = reqBody.status;

      const sekolahUpdate = await this.sekolahRepository.save(sekolah);
      return {
        message: "Sucessfully update Sekolah!",
        data: sekolahUpdate,
      };
    } catch (err) {
      throw new Error("Something wrong on the server!");
    }
  }

  async delete(id: any): Promise<any> {
    try {
      await this.sekolahRepository.delete(id);

      return {
        message: "Sekolah deleted successfully!",
      };
    } catch (error) {
      throw new Error("Something wrong on the server!");
    }
  }
}

export default new SekolahService();
