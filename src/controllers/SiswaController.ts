import { Request, Response } from "express";
import { sendError } from "../libs/error-handler";
import SiswaService from "../service/SiswaService";

class SiswaController {
  async find(req: Request, res: Response) {
    try {
      const response = await SiswaService.find();
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error in find method:", error);
      sendError(res, "Cannot get data siswa!");
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await SiswaService.findOne(id);
      if (response.message === "User not found!") {
        sendError(res, response.message, 404); // 404 Not Found
        return;
      }
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error in findOne method:", error);
      sendError(res, "Cannot get data siswa!");
    }
  }

  async create(req: Request, res: Response) {
    try {
      const response = await SiswaService.create(req.body);
      return res.status(201).json(response);
    } catch (err) {
      console.error("Error in create method:", err);
      sendError(res, "Cannot create siswa!");
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await SiswaService.update(req.body, id);
      return res.status(200).json(response);
    } catch (err) {
      console.error("Error in update method:", err);
      sendError(res, "Cannot update data siswa!");
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await SiswaService.delete(id);
      return res.status(200).json(response);
    } catch (err) {
      console.error("Error in delete method:", err);
      sendError(res, "Cannot delete data siswa!");
    }
  }
}

export default new SiswaController();
