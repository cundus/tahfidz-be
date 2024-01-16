import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Operator } from "../entities/Operator";
import { createOperatorValidation } from "../libs/operator-validation";

class OperatorService {
  private readonly operatorRepository: Repository<Operator> =
    AppDataSource.getRepository(Operator);

  async find(): Promise<any> {
    try {
      const operator = await this.operatorRepository.find();
      return {
        message: "Successfully Get Operator",
        data: operator,
      };
    } catch (err) {
      throw new Error("Something Wrong with the server");
    }
  }

  async findOne(id: any): Promise<any> {
    try {
      const operator = await this.operatorRepository.findOne({
        where: {
          id: id,
        },
      });
      return {
        message: "Successfully Get Operator",
        data: operator,
      };
    } catch (err) {
      throw new Error("Something Wrong with the server");
    }
  }

  async create(reqBody: any): Promise<any> {
    try {
      const { error } = createOperatorValidation.validate(reqBody);
      if (error) {
        return {
          message: "Validation error",
          error: error.details[0].message,
          status: 400,
        };
      }

      const operator = this.operatorRepository.create({
        nama_lengkap: reqBody.nama_lengkap,
        username: reqBody.username,
        password: reqBody.password,
        NIO: reqBody.NIO,
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

      await this.operatorRepository.save(operator);

      return {
        message: "Operator successfully created!",
        data: operator,
      };
    } catch (err) {
      console.error("Error in create method:", err);
      throw new Error("Something Wrong with the server");
    }
  }

  async update(reqBody?: any, id?: any): Promise<any> {
    try {
      const operator = await this.operatorRepository.findOneOrFail({
        where: {
          id: id,
        },
      });

      operator.nama_lengkap = reqBody.nama_lengkap;
      operator.username = reqBody.username;
      operator.password = reqBody.password;
      operator.NIO = reqBody.NIO;
      operator.tempat_lahir = reqBody.tempat_lahir;
      operator.tanggal_lahir = reqBody.tanggal_lahir;
      operator.jenis_kelamin = reqBody.jenis_kelamin;
      operator.email = reqBody.email;
      operator.nomor_telepon = reqBody.nomor_telepon;
      operator.posisi = reqBody.posisi;
      operator.tanggal_bergabung = reqBody.tanggal_bergabung;
      operator.alamat = reqBody.alamat;
      operator.foto = reqBody.foto;
      operator.status = reqBody.status;

      const operatorUpdate = await this.operatorRepository.save(operator);
      return {
        message: "Sucessfully update Operator!",
        data: operatorUpdate,
      };
    } catch (err) {
      throw new Error("Something wrong on the server!");
    }
  }

  async delete(id: any): Promise<any> {
    try {
      await this.operatorRepository.delete(id);

      return {
        message: "Operator deleted successfully!",
      };
    } catch (error) {
      throw new Error("Something wrong on the server!");
    }
  }
}

export default new OperatorService();
