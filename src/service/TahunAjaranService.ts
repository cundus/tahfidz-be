import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { TahunAjaran } from "../entities/TahunAjaran";
import { createTahunAjaranValidation } from "../libs/tahunAjaran-validation";

class TahunAjaranService {
  private readonly tahunAjaranRepository: Repository<TahunAjaran> =
    AppDataSource.getRepository(TahunAjaran);

  async find(): Promise<any> {
    try {
      const tahunAjaran = await this.tahunAjaranRepository.find();
      return {
        message: "Successfully Get Tahun Ajaran",
        data: tahunAjaran,
      };
    } catch (err) {
      throw new Error("Something Wrong with the server");
    }
  }

  async findOne(id: any): Promise<any> {
    try {
      const tahunAjaran = await this.tahunAjaranRepository.findOne({
        where: {
          id: id,
        },
      });
      return {
        message: "Successfully Get Tahun Ajaran",
        data: tahunAjaran,
      };
    } catch (err) {
      throw new Error("Something Wrong with the server");
    }
  }

  async create(reqBody: any): Promise<any> {
    try {
      const { error } = createTahunAjaranValidation.validate(reqBody);
      if (error) {
        return {
          message: "Validation error",
          error: error.details[0].message,
          status: 400,
        };
      }

      const tahunAjaran = this.tahunAjaranRepository.create({
        nama_tahun_ajaran: reqBody.nama_lengkap,
        status: reqBody.status,
      });

      await this.tahunAjaranRepository.save(tahunAjaran);

      return {
        message: "Tahun Ajaran successfully Tahun Ajaran!",
        data: tahunAjaran,
      };
    } catch (err) {
      console.error("Error in create method:", err);
      throw new Error("Something Wrong with the server");
    }
  }

  async update(reqBody?: any, id?: any): Promise<any> {
    try {
      const tahunAjaran = await this.tahunAjaranRepository.findOneOrFail({
        where: {
          id: id,
        },
      });

      tahunAjaran.nama_tahun_ajaran = reqBody.nama_lengkap;
      tahunAjaran.status = reqBody.status;

      const tahunAjaranUpdate = await this.tahunAjaranRepository.save(
        tahunAjaran
      );
      return {
        message: "Sucessfully update Tahun Ajaran!",
        data: tahunAjaranUpdate,
      };
    } catch (err) {
      throw new Error("Something wrong on the server!");
    }
  }

  async delete(id: any): Promise<any> {
    try {
      await this.tahunAjaranRepository.delete(id);

      return {
        message: "Tahun Ajaran deleted successfully!",
      };
    } catch (error) {
      throw new Error("Something wrong on the server!");
    }
  }
}

export default new TahunAjaranService();
