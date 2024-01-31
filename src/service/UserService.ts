import { Repository } from "typeorm";
import { User } from "../entities/Users";
import { AppDataSource } from "../data-source";
import { Profile } from "../entities/Profile";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

class UserService {
  private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User);

  private readonly profileRepository: Repository<Profile> =
    AppDataSource.getRepository(Profile);

  private async createUserAndProfile(reqBody: any, role: string) {
    const password = await bcrypt.hash(reqBody.password, 10);

    const user = this.userRepository.create({
      password: password,
      username: reqBody.username,
      role: role,
    });

    const profile = this.profileRepository.create({
      nama_lengkap: reqBody.nama_lengkap,
      alamat: reqBody.alamat,
      email: reqBody.email,
      jenis_kelamin: reqBody.jenis_kelamin,
      nomor_induk: reqBody.nomor_induk,
      nomor_telepon: reqBody.nomor_telepon,
      posisi: reqBody.posisi,
      tanggal_bergabung: reqBody.tanggal_bergabung,
      tanggal_lahir: reqBody.tanggal_lahir,
      tempat_lahir: reqBody.tempat_lahir,
      foto: reqBody.foto,
      status: reqBody.status,
      ...(role === "siswa" && {
        nama_ayah: reqBody.nama_ayah,
        nama_ibu: reqBody.nama_ibu,
        nomor_telepon_ayah: reqBody.nomor_telepon_ayah,
        nomor_telepon_ibu: reqBody.nomor_telepon_ibu,
        pekerjaan_ayah: reqBody.pekerjaan_ayah,
        pekerjaan_ibu: reqBody.pekerjaan_ibu,
      }),
      // user: user, // Associate the profile with the user
    });

    user.profile = profile; // Associate the user with the profile

    await this.userRepository.save(user);

    await this.profileRepository.update(profile.id, {
      user: user,
    });
    // await this.profileRepository.save(profile);

    return { user, profile };
  }

  async findAll(role?: any, page?: any, pageSize?: any, includeHalaqoh?: any) {
    try {
      let queryBuilder = this.userRepository
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.profile", "profile")
        .leftJoin("user.guruOfHalaqoh", "guruOfHalaqoh")
        .leftJoin("user.siswaOfHalaqoh", "siswaOfHalaqoh");

      if (includeHalaqoh === "true") {
        queryBuilder = queryBuilder.where(
          "guruOfHalaqoh.id IS NULL AND siswaOfHalaqoh.id IS NULL"
        );
      }

      if (role) {
        queryBuilder = queryBuilder.andWhere("user.role = :role", {
          role: role,
        });
      }

      const users = await queryBuilder
        .skip((page - 1) * pageSize)
        .take(pageSize)
        .getMany();

      return {
        message: "Users Successfully FindAll",
        users: users,
      };
    } catch (error) {
      console.error({ message: error });
      throw error;
    }
  }

  async findOne(id: any) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: id,
        },
        relations: ["profile"],
      });

      if (!user) {
        return {
          message: "User not found",
        };
      }

      return {
        message: "User Successfully FindOne",
        user: user,
      };
    } catch (error) {
      console.error({ message: error });
      throw error;
    }
  }

  async create(reqBody: any) {
    try {
      let message: string, role: string;
      if (reqBody.role === "operator") {
        message = "Operator Successfully Created!";
        role = "operator";
      } else if (reqBody.role === "guru") {
        message = "Guru Successfully Created!";
        role = "guru";
      } else {
        message = "Siswa Successfully Created!";
        role = "siswa";
      }

      const { user, profile } = await this.createUserAndProfile(reqBody, role);

      return {
        message,
        user,
        profile,
      };
    } catch (error) {
      console.error({ message: error });
    }
  }

  async update(userId: number, reqBody: any) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: userId,
        },
        relations: ["profile"],
      });

      if (!user) {
        return {
          message: "User not found",
        };
      }

      user.username = reqBody.username || user.username;
      user.password = reqBody.password || user.password;

      const profile = user.profile;
      if (profile) {
        profile.nama_lengkap = reqBody.nama_lengkap || profile.nama_lengkap;
        profile.alamat = reqBody.alamat || profile.alamat;
        profile.email = reqBody.email || profile.email;
        profile.foto = reqBody.foto || profile.foto;
        profile.jenis_kelamin = reqBody.jenis_kelamin || profile.jenis_kelamin;
        profile.nama_ayah = reqBody.nama_ayah || profile.nama_ayah;
        profile.nama_ibu = reqBody.nama_ibu || profile.nama_ibu;
        profile.nama_lengkap = reqBody.nama_lengkap || profile.nama_lengkap;
        profile.nomor_induk = reqBody.nomor_induk || profile.nomor_induk;
        profile.nomor_telepon = reqBody.nomor_telepon || profile.nomor_telepon;
        profile.nomor_telepon_ayah =
          reqBody.nomor_telepon_ayah || profile.nomor_telepon_ayah;
        profile.nomor_telepon_ibu =
          reqBody.nomor_telepon_ibu || profile.nomor_telepon_ibu;
        profile.pekerjaan_ayah =
          reqBody.pekerjaan_ayah || profile.pekerjaan_ayah;
        profile.pekerjaan_ibu = reqBody.pekerjaan_ibu || profile.pekerjaan_ibu;
        profile.posisi = reqBody.posisi || profile.posisi;
        profile.status = reqBody.status || profile.status;
        profile.tanggal_bergabung =
          reqBody.tanggal_bergabung || profile.tanggal_bergabung;
        profile.tanggal_lahir = reqBody.tanggal_lahir || profile.tanggal_lahir;
        profile.tempat_lahir = reqBody.tempat_lahir || profile.tempat_lahir;

        await this.profileRepository.save(profile);
      }

      await this.userRepository.save(user);

      return {
        message: "User and Profile Successfully Updated",
        user: user,
      };
    } catch (error) {
      console.error({ message: error });
      throw error;
    }
  }

  async delete(id: any) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: id,
        },
      });

      if (!user) {
        return {
          message: "User not found",
        };
      }

      await this.userRepository.remove(user);

      return {
        message: "User Successfully Deleted",
      };
    } catch (error) {
      console.error({ message: error });
      throw error;
    }
  }

  async login(reqBody?: any): Promise<any> {
    // try {
    const user = await this.userRepository.findOne({
      where: {
        username: reqBody.username,
      },
      relations: ["profile"],
    });

    if (user === null || user === undefined) {
      // Customize the response when user is not found
      return {
        message: "User not found!",
      };
    }

    if (user.role !== reqBody.role) {
      return {
        message: "Role is not correct!",
      };
    }

    const isPassValid = await bcrypt.compare(reqBody.password, user.password);

    if (!isPassValid) {
      return {
        message: "Email / Password is wrong!",
      };
    }

    const key = process.env.JWT_SECRET as string;

    const token = jwt.sign({ user }, key, { expiresIn: "1d" });

    return {
      message: "Login successfully!",
      user: user,
      token: token,
    };
    // } catch (err) {
    //   throw new Error("Something wrong on the server!");
    // }
  }
}

export default new UserService();
