import { sendError } from "../libs/error-handler";
import UserService from "../service/UserService";
import { Request, Response } from "express";

class UserController {
  async find(req: Request, res: Response) {
    try {
      let { role, page = 1, pageSize = 10 } = req.query;
      if (role === "") role = null;

      const parsedPage = parseInt(page as string, 10);
      const parsedPageSize = parseInt(pageSize as string, 10);

      if (
        isNaN(parsedPage) ||
        isNaN(parsedPageSize) ||
        parsedPage < 1 ||
        parsedPageSize < 1
      ) {
        return res.status(400).json({ error: "Invalid pagination parameters" });
      }

      const response = await UserService.findAll(
        role,
        parsedPage,
        parsedPageSize
      );
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error in find method:", error);
      sendError(res, "Cannot get data Users!");
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const response = await UserService.findOne(id);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error in find method:", error);
      sendError(res, "Cannot get data Users!");
    }
  }

  async create(req: Request, res: Response) {
    try {
      const filename = res.locals.filename;

      const response = await UserService.create(req.body, filename);
      return res.status(201).json(response);
    } catch (error) {
      sendError(res, "Cannot create data User!");
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const filename = res.locals.filename;
      const response = await UserService.update(id, req.body, filename);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error in find method:", error);
      sendError(res, "Cannot get data Users!");
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const response = await UserService.delete(id);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error in find method:", error);
      sendError(res, "Cannot get data Users!");
    }
  }

  async login(req: Request, res: Response) {
    try {
      // Validate user input
      //   const { error } = loginValidation.validate(req.body);
      //   if (error) {
      //     return res.status(400).json({
      //       error: "Validation error",
      //       details: error.details[0].message,
      //     });
      //   }

      const response = await UserService.login(req.body);

      if (
        response.message === "Email / Password is wrong!" ||
        response.message === "User not found!" ||
        response.message === "Role is not correct!"
      ) {
        sendError(res, "Email / Password is wrong!", 401); // 401 Unauthorized
        return;
      }

      return res.status(200).json(response);
    } catch (err) {
      console.error("Error in login method:", err);
      sendError(res, "Failed login users!");
    }
  }

  async dummy(req: Request, res: Response) {
    try {
      const random = new Date().getTime();
      const { role } = req.query;
      const dummyData = {
        username: `john_doe${random}`,
        password: "password123",
        role: role, // or 'guru' or 'siswa'
        nama_lengkap: "John Doe",
        alamat: "123 Main Street",
        email: `john.doe@example.com`,
        jenis_kelamin: "male",
        nomor_induk: "123456",
        nomor_telepon: "123-456-7890",
        posisi: "teacher",
        tanggal_bergabung: "2024-01-30", // Date in YYYY-MM-DD format
        tanggal_lahir: "1990-01-01", // Date in YYYY-MM-DD format
        tempat_lahir: "Cityville",
        foto: "path/to/photo.jpg",
        status: "active",
        // Additional fields for 'siswa' role
        nama_ayah: "Doe Sr.",
        nama_ibu: "Doe Mrs.",
        nomor_telepon_ayah: "111-222-3333",
        nomor_telepon_ibu: "444-555-6666",
        pekerjaan_ayah: "Engineer",
        pekerjaan_ibu: "Doctor",
      };

      const response = await UserService.create(dummyData);
      return res.status(201).json(response);
    } catch (error) {
      sendError(res, "Cannot create data User!");
    }
  }

  async check(req: Request, res: Response) {
    try {
      const jwtUser = res.locals.loginSession;
      const response = await UserService.check(jwtUser);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error in find method:", error);
      sendError(res, "Cannot get data Users!");
    }
  }
}

export default new UserController();
