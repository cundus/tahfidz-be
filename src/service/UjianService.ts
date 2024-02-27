import { Repository } from "typeorm";
import { Halaqoh } from "../entities/Halaqoh";
import { User } from "../entities/Users";
import { Ujian } from "../entities/Ujian";
import { AppDataSource } from "../data-source";

class UjianService {
  private readonly halaqohRepository: Repository<Halaqoh> =
    AppDataSource.getRepository(Halaqoh);
  private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User);
  private readonly ujianRepository: Repository<Ujian> =
    AppDataSource.getRepository(Ujian);

  async findAll(page?: any, pageSize?: any, siswaId?:any) {
    try {
      const ujian = await this.ujianRepository.find({
        where: {
          user: {
            id: siswaId
          },
        },
        relations: [
          "user",
          "user.profile",
          "halaqoh",
          "halaqoh.guru",
          "halaqoh.guru.profile",
        ],
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      return {
        message: "ujian Successfully Retrieved",
        ujian,
      };
    } catch (error) {
      console.error({ message: error });
      throw error;
    }
  }

  async findOne(id: any): Promise<any> {
    try {
      const ujian = await this.ujianRepository.findOne({
        where: { id },
        relations: [
          "user",
          "user.profile",
          "halaqoh.guru",
          "halaqoh.guru.profile",
        ], // Specify the relations you want to load
      });

      if (!ujian) {
        return {
          message: "ujian not found",
        };
      }

      return {
        message: "Ujian Successfully Retrieved",
        ujian,
      };
    } catch (error) {
      console.error({ message: error });
      throw error;
    }
  }

  async create(reqBody: any) {
    try {
      console.log("Request Body:", reqBody);

      const halaqohId = reqBody.halaqohId;
      const siswaId = reqBody.siswaId;

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

      const ujian = this.ujianRepository.create({
        tanggal: reqBody.tanggal,
        juz: reqBody.juz,
        kesalahan_hafalan: reqBody.kesalahan_hafalan,
        kesalahan_tajwid: reqBody.kesalahan_tajwid,
        keterangan: reqBody.keterangan,
        nilai_hafalan: reqBody.nilai_hafalan,
        nilai_tajwid: reqBody.nilai_tajwid,
        total_nilai: reqBody.total_nilai,
        penguji: reqBody.penguji,
        user: siswa,
        halaqoh: halaqoh,
      });

      await this.ujianRepository.save(ujian);

      return {
        message: "Successfully Created Ujian data",
        ujian,
      };
    } catch (error) {
      console.error({ message: error });
      throw error;
    }
  }

  async update(reqBody?: any, id?: any) {
    try {
      console.log("Request Body:", reqBody);

      const ujian = await this.ujianRepository.findOne({
        where: {
          id: id,
        },
      });

      if (!ujian) {
        return {
          message: "Ujian didn't exist",
        };
      }

      ujian.tanggal = reqBody.tanggal || ujian.tanggal;
      ujian.juz = reqBody.juz || ujian.juz;
      ujian.kesalahan_hafalan =
        reqBody.kesalahan_hafalan || ujian.kesalahan_hafalan;
      ujian.kesalahan_tajwid =
        reqBody.kesalahan_tajwid || ujian.kesalahan_tajwid;
      ujian.nilai_hafalan = reqBody.nilai_hafalan || ujian.nilai_hafalan;
      ujian.nilai_tajwid = reqBody.nilai_tajwid || ujian.nilai_tajwid;
      ujian.keterangan = reqBody.keterangan || ujian.keterangan;
      ujian.total_nilai = reqBody.total_nilai || ujian.total_nilai;
      ujian.penguji = reqBody.penguji || ujian.penguji;
      ujian.user = reqBody.siswaId || ujian.user;
      ujian.halaqoh = reqBody.halaqohId || ujian.halaqoh;

      await this.ujianRepository.save(ujian);

      return {
        message: "Successfully Updated ujian data",
        ujian,
      };
    } catch (error) {
      console.error("Error updating ujian:", error.message || error);
      throw new Error("Failed to update hafalan data");
    }
  }

  async delete(id: any): Promise<any> {
    try {
      const ujian = await this.ujianRepository.findOne({
        where: {
          id: id,
        },
      });

      if (!ujian) {
        return {
          message: "ujian not found",
        };
      }

      await this.ujianRepository.remove(ujian);

      return {
        message: "ujian deleted successfully!",
      };
    } catch (error) {
      throw new Error("Something wrong on the server!");
    }
  }
}

export default new UjianService();
