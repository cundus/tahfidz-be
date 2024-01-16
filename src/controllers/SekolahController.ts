import { Request, Response } from "express";
import { sendError } from "../libs/error-handler";
import SekolahService from "../service/SekolahService";

class SekolahController {
  async find(req: Request, res: Response) {
    try {
      const response = await SekolahService.find();
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error in find method:", error);
      sendError(res, "Cannot get data sekolah!");
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await SekolahService.findOne(id);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error in findOne method:", error);
      sendError(res, "Cannot get data sekolah!");
    }
  }

  async create(req: Request, res: Response) {
    try {
      const response = await SekolahService.create(req.body);
      return res.status(201).json(response);
    } catch (err) {
      console.error("Error in create method:", err);
      sendError(res, "Cannot create sekolah!");
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await SekolahService.update(req.body, id);
      return res.status(200).json(response);
    } catch (err) {
      console.error("Error in update method:", err);
      sendError(res, "Cannot update data sekolah!");
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await SekolahService.delete(id);
      return res.status(200).json(response);
    } catch (err) {
      console.error("Error in delete method:", err);
      sendError(res, "Cannot delete data sekolah!");
    }
  }
}

export default new SekolahController();
