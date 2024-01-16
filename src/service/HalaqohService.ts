import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Halaqoh } from "../entities/Halaqoh";
import { createHalaqohValidation } from "../libs/halaqoh-validation";

class HalaqohService {
  private readonly halaqohRepository: Repository<Halaqoh> =
    AppDataSource.getRepository(Halaqoh);

  async find(): Promise<any> {
    try {
      const halaqoh = await this.halaqohRepository.find();
      return {
        message: "Successfully Get Halaqoh",
        data: halaqoh,
      };
    } catch (err) {
      throw new Error("Something Wrong with the server");
    }
  }

  async findOne(id: any): Promise<any> {
    try {
      const halaqoh = await this.halaqohRepository.findOne({
        where: {
          id: id,
        },
      });
      return {
        message: "Successfully Get Halaqoh",
        data: halaqoh,
      };
    } catch (err) {
      throw new Error("Something Wrong with the server");
    }
  }

  async create(reqBody: any): Promise<any> {
    try {
      const { error } = createHalaqohValidation.validate(reqBody);
      if (error) {
        return {
          message: "Validation error",
          error: error.details[0].message,
          status: 400,
        };
      }

      const halaqoh = this.halaqohRepository.create({
        nama_halaqoh: reqBody.nama_halaqoh,
        tahun_ajaran: reqBody.tahun_ajaran,
        nama_guru: reqBody.nama_guru,
        nama_anggota: reqBody.nama_anggota,
        status: reqBody.status,
      });

      await this.halaqohRepository.save(halaqoh);

      return {
        message: "Halaqoh successfully Created!",
        data: halaqoh,
      };
    } catch (err) {
      console.error("Error in create method:", err);
      throw new Error("Something Wrong with the server");
    }
  }

  async update(reqBody?: any, id?: any): Promise<any> {
    try {
      const halaqoh = await this.halaqohRepository.findOneOrFail({
        where: {
          id: id,
        },
      });

      halaqoh.nama_halaqoh = reqBody.nama_halaqoh;
      halaqoh.tahun_ajaran = reqBody.tahun_ajaran;
      halaqoh.nama_guru = reqBody.nama_guru;
      halaqoh.nama_anggota = reqBody.nama_anggota;
      halaqoh.status = reqBody.status;

      const halaqohUpdate = await this.halaqohRepository.save(halaqoh);
      return {
        message: "Sucessfully update Halaqoh!",
        data: halaqohUpdate,
      };
    } catch (err) {
      throw new Error("Something wrong on the server!");
    }
  }

  async delete(id: any): Promise<any> {
    try {
      await this.halaqohRepository.delete(id);

      return {
        message: "Halaqoh deleted successfully!",
      };
    } catch (error) {
      throw new Error("Something wrong on the server!");
    }
  }
}

export default new HalaqohService();
