import { Repository } from "typeorm";
import { Halaqoh } from "../entities/Halaqoh";
import { Kehadiran } from "../entities/Kehadiran";
import { User } from "../entities/Users";
import { AppDataSource } from "../data-source";

class KehadiranService {
  private readonly halaqohRepository: Repository<Halaqoh> =
    AppDataSource.getRepository(Halaqoh);
  private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User);
  private readonly kehadiranRepository: Repository<Kehadiran> =
    AppDataSource.getRepository(Kehadiran);

  async findAll(page?: any, pageSize?: any, halaqoh?: any) {
    try {
      const kehadiran = await this.kehadiranRepository.find({
        where: {
          halaqoh: {
            id: halaqoh,
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
        message: "kehadiran Successfully Retrieved",
        kehadiran,
      };
    } catch (error) {
      console.error({ message: error });
      throw error;
    }
  }

  async findOne(id: any): Promise<any> {
    try {
      const kehadiran = await this.kehadiranRepository.findOne({
        where: { id },
        relations: [
          "user",
          "user.profile",
          "halaqoh",
          "halaqoh.guru",
          "halaqoh.guru.profile",
        ], // Specify the relations you want to load
      });

      if (!kehadiran) {
        return {
          message: "kehadiran not found",
        };
      }

      return {
        message: "kehadiran Successfully Retrieved",
        kehadiran,
      };
    } catch (error) {
      console.error({ message: error });
      throw error;
    }
  }

  async create(reqBody?: any, meet?: any) {
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
          message: `Siswa with ID ${siswa} not found`,
        };
      }

      const hafalan = this.kehadiranRepository.create({
        meet: `Meet ${meet}`,
        status: reqBody.status,
        tanggal: reqBody.tanggal,
        user: siswa,
        halaqoh: halaqoh,
      });

      await this.kehadiranRepository.save(hafalan);

      return {
        message: "Successfully Created Hafalan data",
        hafalan,
      };
    } catch (error) {
      throw new Error("Something wrong on the server!");
    }
  }

  async update(reqBody?: any[], meet?: any, halaqohId?: any): Promise<any> {
    try {
      const updateResults = [];

      for (const item of reqBody) {
        const { id, status, tanggal } = item;

        const kehadiran = await this.kehadiranRepository.findOneOrFail({
          where: {
            meet: `Meet ${meet}`,
            halaqoh: {
              id: halaqohId,
            },
            user: {
              id: id,
            },
          },
        });

        if (!kehadiran) {
          updateResults.push({
            id: id,
            message: "kehadiran not found",
          });
          continue; // Continue to the next iteration if kehadiran is not found
        }

        kehadiran.status = status || kehadiran.status;
        kehadiran.tanggal = tanggal || kehadiran.tanggal;

        const kehadiranUpdate = await this.kehadiranRepository.save(kehadiran);
        updateResults.push({
          id: id,
          message: "Successfully updated kehadiran data!",
          kehadiran: kehadiranUpdate,
        });
      }

      return updateResults;
    } catch (err) {
      throw new Error("Something wrong on the server!");
    }
  }

  async delete(id: any): Promise<any> {
    try {
      const kehadiran = await this.kehadiranRepository.findOne({
        where: {
          id: id,
        },
      });

      if (!kehadiran) {
        return {
          message: "Kehadiran not found",
        };
      }

      await this.kehadiranRepository.remove(kehadiran);

      return {
        message: "Kehadiran deleted successfully!",
      };
    } catch (error) {
      throw new Error("Something wrong on the server!");
    }
  }
}

export default new KehadiranService();
