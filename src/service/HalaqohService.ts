import { In, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Halaqoh } from "../entities/Halaqoh";
import { createHalaqohValidation } from "../libs/halaqoh-validation";
import { User } from "../entities/Users";
import { Kehadiran } from "../entities/Kehadiran";
import { TahunAjaran } from "../entities/TahunAjaran";

type Profile = {
  id: number;
  nama_lengkap: string;
};

type TSiswa = {
  id: number;
  username: string;
  profile: Profile;
};

type TSiswaHadir = {
  id: number;
  meet: string;
  status: string;
  tanggal: string;
  createdAt: string;
  updatedAt: string;
  user: TSiswa;
};

class HalaqohService {
  private readonly halaqohRepository: Repository<Halaqoh> =
    AppDataSource.getRepository(Halaqoh);
  private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User);
  private readonly kehadiranRepository: Repository<Kehadiran> =
    AppDataSource.getRepository(Kehadiran);

  private readonly tahunAjaranRepository: Repository<TahunAjaran> =
    AppDataSource.getRepository(TahunAjaran);

  async findAll(page?: any, pageSize?: any) {
    try {
      const halaqoh = await this.halaqohRepository.find({
        relations: [
          "kehadiran",
          "guru",
          "kehadiran.user",
          "kehadiran.user.profile",
          "guru.profile",
          "tahun_ajaran",
        ],
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      const transformedData = halaqoh.map((h) => {
        // Use Set to filter out duplicate user IDs
        const uniqueUsers = new Set();
        const uniqueKehadiran = h.kehadiran.filter((k) => {
          if (uniqueUsers.has(k.user.id)) {
            return false; // If user ID is already in Set, filter it out
          } else {
            uniqueUsers.add(k.user.id); // Add user ID to Set
            return true; // Keep this kehadiran entry
          }
        });

        const uniqueUsers2 = new Set();
        const uniqueKehadiran2 = h.kehadiran.filter((k) => {
          if (uniqueUsers2.has(k.user.id)) {
            uniqueUsers2.add(k.user.id); // Add user ID to Set
          }
        });

        return {
          nama_guru: h.guru.profile.nama_lengkap,
          guru_id: h.guru.profile.id,
          id: h.id,
          nama_halaqoh: h.nama_halaqoh,
          tahun_ajaran: h.tahun_ajaran,
          status: h.status,
          siswa: uniqueKehadiran.map((k) => ({
            nama_siswa: k.user.profile.nama_lengkap,
            siswa_id: k.user.id,
            nomor_induk: k.user.profile.nomor_induk,
            kehadiran: uniqueKehadiran2.map((u) => ({
              id: u.id,
              meet: u.meet,
              status: u.status,
              siswa_id: u.user.id,
              nama_siswa: u.user.profile.nama_lengkap,
            })),
            // status: k.status,
            // meet: k.meet,
            // tanggal: k.tanggal,
          })),
        };
      });

      return {
        message: "Halaqoh with Users Successfully Retrieved",
        halaqoh: transformedData,
      };
    } catch (error) {
      console.error({ message: error });
      throw error;
    }
  }

  async findOne(id: any): Promise<any> {
    try {
      const halaqoh = await this.halaqohRepository.findOne({
        where: { id },
        relations: [
          "kehadiran",
          "guru",
          "kehadiran.user",
          "kehadiran.user.profile",
          "guru.profile",
          "tahun_ajaran",
        ], // Specify the relations you want to load
      });

      if (!halaqoh) {
        return {
          message: "Halaqoh not found",
        };
      }

      const kehadiran = await this.kehadiranRepository.find({
        relations: ["user", "halaqoh"],
      });

      if (!kehadiran) {
        return {
          message: "kehadiran not found",
        };
      }

      const uniqueUsers = new Set();
      const uniqueKehadiran = halaqoh.kehadiran.filter((k) => {
        if (uniqueUsers.has(k.user.id)) {
          return false;
        } else {
          uniqueUsers.add(k.user.id);
          return true;
        }
      });

      return {
        nama_guru: halaqoh.guru.profile.nama_lengkap,
        guru_id: halaqoh.guru.id,
        id: halaqoh.id,
        nama_halaqoh: halaqoh.nama_halaqoh,
        tahun_ajaran: halaqoh.tahun_ajaran,
        status: halaqoh.status,
        siswa: uniqueKehadiran.map((k) => ({
          nama_siswa: k.user.profile.nama_lengkap,
          siswa_id: k.user.id,
          jenis_kelamin: k.user.profile.jenis_kelamin,
          nomor_induk: k.user.profile.nomor_induk,
          kehadiran: kehadiran
            .filter((u) => u.user.id === k.user.id)
            .map((m) => ({
              id: m.id,
              meet: m.meet,
              status: m.status,
              halaqoh: m.halaqoh.id,
              tanggal: m.tanggal,
            })),
        })),
      };
    } catch (error) {
      console.error({ message: error });
      throw error;
    }
  }

  async findOneForUpdate(id: any): Promise<any> {
    try {
      const halaqoh = await this.halaqohRepository.findOne({
        where: { id },
        relations: [
          "kehadiran",
          "guru",
          "kehadiran.user",
          "kehadiran.user.profile",
          "guru.profile",
          "tahun_ajaran",
        ], // Specify the relations you want to load
      });

      if (!halaqoh) {
        return {
          message: "Halaqoh not found",
        };
      }

      // nama halaqoh: halaqoh.nama_halaqoh
      // status : halaqoh.status
      // guru : { nama_lengkap:halaqoh.guru.profile,id:halaqoh.guru.profile.nama_lengkap}
      //  untuk siswa di loop

      const dataSiswa = halaqoh.kehadiran.map((item) => {
        const data = {
          siswaId: item.user.id,
          nama_lengkap: item.user.profile.nama_lengkap,
          status: item.status,
        };

        return data;
      });

      const dataForResponse = {
        id: halaqoh.id,
        nama_halaqoh: halaqoh.nama_halaqoh,
        status: halaqoh.status,
        tahun_ajaran: halaqoh.tahun_ajaran.nama_tahun_ajaran,
        guru: {
          id: halaqoh.guru.profile.id,
          nama_lengkap: halaqoh.guru.profile.nama_lengkap,
        },
        siswa: dataSiswa,
      };

      return {
        message: "Halaqoh with Users Successfully Retrieved",
        halaqoh: dataForResponse,
      };
    } catch (error) {
      console.error({ message: error });
      throw error;
    }
  }

  async create(reqBody: any): Promise<any> {
    try {
      console.log("Request Body:", reqBody);

      const guruId = reqBody.guruId;
      const siswaIds = reqBody.siswaIds;

      if (!guruId) {
        throw new Error("Guru ID is missing or invalid");
      }

      // Find guru user
      const guru = await this.userRepository.findOne({
        where: {
          id: guruId,
        },
      });

      if (!guru) {
        throw new Error(`Guru user with ID ${guruId} not found`);
      }

      const tahunAjaran = await this.tahunAjaranRepository.findOne({
        where: {
          id: reqBody.tahun_ajaran,
        },
      });

      if (!tahunAjaran) {
        throw new Error(`Guru user with ID ${reqBody.tahun_ajaran} not found`);
      }

      // Find siswa users
      const siswaUsers = await this.userRepository.findByIds(siswaIds);

      if (siswaUsers.length !== siswaIds.length) {
        throw new Error("One or more siswa users not found");
      }

      // Create halaqoh entity
      const halaqoh = this.halaqohRepository.create({
        nama_halaqoh: reqBody.nama_halaqoh,
        tahun_ajaran: tahunAjaran,
        guru: guru,
        status: reqBody.status || false,
      });

      // Save halaqoh to the database
      await this.halaqohRepository.save(halaqoh);

      // Create kehadiran for each siswa user
      const kehadiranPromises = siswaUsers.map(async (siswa) => {
        for (let meet = 1; meet <= 5; meet++) {
          const kehadiran = this.kehadiranRepository.create({
            meet: `Meet ${meet}`,
            status: "Hadir", // Default status can be "Absent"
            tanggal: new Date(), // You may need to adjust this based on your requirements
            user: siswa,
            halaqoh: halaqoh,
          });
          await this.kehadiranRepository.save(kehadiran);
        }
      });

      await Promise.all(kehadiranPromises);

      return {
        message: "Halaqoh with Users and Kehadiran Successfully Created",
        halaqoh,
      };
    } catch (error) {
      console.error({ message: error.message });
      throw error;
    }
  }

  async update(reqBody?: any, id?: any): Promise<any> {
    try {
      console.log("Request Body:", reqBody);

      const halaqohId = id;
      const guruId = reqBody.guruId;
      const siswaIds = reqBody.siswaIds;

      if (!halaqohId) {
        throw new Error("Halaqoh ID is missing or invalid");
      }

      // Find existing halaqoh with relations to kehadiran and user
      const halaqoh = await this.halaqohRepository.findOne({
        where: {
          id: halaqohId,
        },
        relations: ["kehadiran", "kehadiran.user"],
      });

      console.log("halaqoh: ", halaqoh);

      if (!halaqoh) {
        throw new Error(`Halaqoh with ID ${halaqohId} not found`);
      }

      // Check if halaqoh has an ID
      if (!halaqoh.id) {
        throw new Error("Halaqoh ID is null");
      }

      // Extract existing siswa IDs from kehadiran
      const existingSiswaIds = Array.isArray(halaqoh.kehadiran)
        ? halaqoh.kehadiran.map((kehadiran: any) => kehadiran.user.id)
        : [];

      if (guruId) {
        // Find guru user
        const guru = await this.userRepository.findOne({
          where: {
            id: guruId,
          },
        });

        if (!guru) {
          throw new Error(`Guru user with ID ${guruId} not found`);
        }

        halaqoh.guru = guru;
      }

      halaqoh.nama_halaqoh = reqBody.nama_halaqoh || halaqoh.nama_halaqoh;
      halaqoh.tahun_ajaran = reqBody.tahun_ajaran || halaqoh.tahun_ajaran;
      halaqoh.status = reqBody.status

      // Update halaqoh entity
      const updatedHalaqoh = await this.halaqohRepository.save(halaqoh);
      console.log("Existing siswa IDs:", existingSiswaIds);
      console.log("New siswa IDs:", siswaIds);

      if (siswaIds) {
        // Find siswa users
        const siswaUsers = await this.userRepository.findByIds(siswaIds);

        if (siswaUsers.length !== siswaIds.length) {
          throw new Error("One or more siswa users not found");
        }

        // Delete kehadiran for users not included in the updated list
        const usersToDelete = existingSiswaIds.filter(
          (id) => !siswaIds.includes(id)
        );
        console.log("Users to delete:", usersToDelete); // Log users to be deleted
        if (usersToDelete.length > 0) {
          console.log("Deleting kehadiran for users:", usersToDelete);

          const deleteResult = await this.kehadiranRepository.delete({
            user: In(usersToDelete), // Use the In operator to match user IDs in the array
            halaqoh: halaqoh,
          });

          console.log("Delete result:", deleteResult); // Log the delete result

          // Ensure the delete operation is executed
          if (deleteResult.affected === 0) {
            console.log("No Kehadiran entities were deleted.");
          }
        }

        // Create kehadiran for new siswa users added to the halaqoh
        const newSiswaIds = siswaIds.filter(
          (id) => !existingSiswaIds.includes(id)
        );
        const kehadiranPromises = newSiswaIds.map(async (siswaId) => {
          // let halaqoh = await this.halaqohRepository.findOne({
          //   where: {
          //     id: halaqohId,
          //   },
          // });
          for (let meet = 1; meet <= 5; meet++) {
            const kehadiran = this.kehadiranRepository.create({
              meet: `Meet ${meet}`,
              status: "Hadir", // Default status can be "Absent"
              tanggal: new Date(), // You may need to adjust this based on your requirements
              user: siswaUsers.find((user) => user.id === siswaId),
              halaqoh: { id: updatedHalaqoh.id },
            });
            await this.kehadiranRepository.save(kehadiran);
          }
        });

        await Promise.all(kehadiranPromises);
      }

      // Update halaqoh entity properties if provided in the request body

      return {
        message: "Halaqoh Updated Successfully",
        halaqoh: updatedHalaqoh,
      };
    } catch (error) {
      console.error({ message: error.message });
      throw error;
    }
  }

  async delete(id) {
    try {
      // Find the halaqoh entity with its related kehadiran
      const halaqoh = await this.halaqohRepository.findOneOrFail({
        where: { id },
        relations: ["kehadiran"],
      });

      if (!halaqoh) {
        throw new Error(`Halaqoh with ID ${id} not found`);
      }

      // Delete related kehadiran
      if (halaqoh.kehadiran && halaqoh.kehadiran.length > 0) {
        await this.kehadiranRepository.remove(halaqoh.kehadiran);
      }

      // Now delete the halaqoh
      await this.halaqohRepository.remove(halaqoh);

      return {
        message: "Halaqoh deleted successfully!",
      };
    } catch (error) {
      console.error(error);
      throw new Error("Something went wrong while deleting the halaqoh.");
    }
  }
}

export default new HalaqohService();

[
  {
    id: 1, // siswa_id
    status: "izin",
    tanggal: "30-2-2020",
  },
  {
    id: 2,
    status: "alpha",
    tanggal: "30-2-2020",
  },
];
