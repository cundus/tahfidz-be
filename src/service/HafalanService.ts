import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Halaqoh } from "../entities/Halaqoh";
import { User } from "../entities/Users";
import { Hafalan } from "../entities/Hafalan";

class HafalanService {
  private readonly halaqohRepository: Repository<Halaqoh> =
    AppDataSource.getRepository(Halaqoh);
  private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User);
  private readonly hafalanRepository: Repository<Hafalan> =
    AppDataSource.getRepository(Hafalan);

  async findAll(page?: any, pageSize?: any, type?: any) {
    try {
      const hafalan = await this.hafalanRepository.find({
        where: {
          type: type,
        },
        relations: [
          "user",
          "user.profile",
          "halaqoh.guru",
          "halaqoh.guru.profile",
        ],
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      return {
        message: "Hafalan Successfully Retrieved",
        hafalan,
      };
    } catch (error) {
      console.error({ message: error });
      throw error;
    }
  }

  async findOne(id: any): Promise<any> {
    try {
      const hafalan = await this.hafalanRepository.findOne({
        where: { id },
        relations: [
          "user",
          "user.profile",
          "halaqoh.guru",
          "halaqoh.guru.profile",
        ], // Specify the relations you want to load
      });

      if (!hafalan) {
        return {
          message: "Hafalan not found",
        };
      }

      return {
        message: "Hafalan with Users Successfully Retrieved",
        hafalan,
      };
    } catch (error) {
      console.error({ message: error });
      throw error;
    }
  }

  async create(reqBody: any, type?: any) {
    try {
      console.log("Request Body:", reqBody);

      const halaqohId = reqBody.halaqohId;
      const siswaId = reqBody.siswaId;

      if (!type) {
        return {
          message: "Type must be defined!",
        };
      }

      // Find halaqoh
      const halaqoh = await this.halaqohRepository.findOne({
        where: {
          id: halaqohId,
        },
      });

      if (!halaqoh) {
        return {
          message: `Halaqoh user with ID ${halaqohId} not found`,
        };
      }
      // Find siswa user
      const siswa = await this.userRepository.findOne({
        where: {
          id: siswaId,
        },
      });

      if (!siswa) {
        return {
          message: `Halaqoh user with ID ${siswa} not found`,
        };
      }

      const hafalan = this.hafalanRepository.create({
        baris: reqBody.baris,
        ayat_awal: reqBody.ayat_awal,
        ayat_akhir: reqBody.ayat_akhir,
        surat_awal: reqBody.surat_awal,
        surat_akhir: reqBody.surat_akhir,
        nilai_hafalan: reqBody.nilai_hafalan,
        nilai_tajwid: reqBody.nilai_tajwid,
        type: type,
        user: siswa,
        halaqoh: halaqoh,
      });

      await this.hafalanRepository.save(hafalan);

      return {
        message: "Successfully Created Hafalan data",
        hafalan,
      };
    } catch (error) {
      console.error({ message: error });
      throw error;
    }
  }

  async update(reqBody?: any, id?: any) {
    try {
      console.log("Request Body:", reqBody);

      const hafalan = await this.hafalanRepository.findOne({
        where: {
          id: id,
        },
      });

      if (!hafalan) {
        return {
          message: "Hafalan didn't exist",
        };
      }

      hafalan.baris = reqBody.baris || hafalan.baris;
      hafalan.ayat_awal = reqBody.ayat_awal || hafalan.ayat_awal;
      hafalan.ayat_akhir = reqBody.ayat_akhir || hafalan.ayat_akhir;
      hafalan.surat_awal = reqBody.surat_awal || hafalan.surat_awal;
      hafalan.surat_akhir = reqBody.surat_akhir || hafalan.surat_akhir;
      hafalan.nilai_hafalan = reqBody.nilai_hafalan || hafalan.nilai_hafalan;
      hafalan.nilai_tajwid = reqBody.nilai_tajwid || hafalan.nilai_tajwid;
      hafalan.user = reqBody.siswaId || hafalan.user;
      hafalan.halaqoh = reqBody.halaqohId || hafalan.halaqoh;
      hafalan.type = hafalan.type;

      await this.hafalanRepository.save(hafalan);

      return {
        message: "Successfully Updated Hafalan data",
        hafalan,
      };
    } catch (error) {
      console.error("Error updating hafalan:", error.message || error);
      throw new Error("Failed to update hafalan data");
    }
  }

  async delete(id: any): Promise<any> {
    try {
      const hafalan = await this.hafalanRepository.findOne({
        where: {
          id: id,
        },
      });

      if (!hafalan) {
        return {
          message: "hafalan not found",
        };
      }

      await this.hafalanRepository.remove(hafalan);

      return {
        message: "hafalan deleted successfully!",
      };
    } catch (error) {
      throw new Error("Something wrong on the server!");
    }
  }
}

export default new HafalanService();
