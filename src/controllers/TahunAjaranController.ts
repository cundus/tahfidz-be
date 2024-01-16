import { Request, Response } from "express";
import { sendError } from "../libs/error-handler";
import TahunAjaranService from "../service/TahunAjaranService";

class TahunAjaranController {
  async find(req: Request, res: Response) {
    try {
      const response = await TahunAjaranService.find();
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error in find method:", error);
      sendError(res, "Cannot get data tahun ajaran!");
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await TahunAjaranService.findOne(id);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error in findOne method:", error);
      sendError(res, "Cannot get data tahun ajaran!");
    }
  }

  async create(req: Request, res: Response) {
    try {
      const response = await TahunAjaranService.create(req.body);
      return res.status(201).json(response);
    } catch (err) {
      console.error("Error in create method:", err);
      sendError(res, "Cannot create tahun ajaran!");
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await TahunAjaranService.update(req.body, id);
      return res.status(200).json(response);
    } catch (err) {
      console.error("Error in update method:", err);
      sendError(res, "Cannot update data tahun ajaran!");
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await TahunAjaranService.delete(id);
      return res.status(200).json(response);
    } catch (err) {
      console.error("Error in delete method:", err);
      sendError(res, "Cannot delete data tahun ajaran!");
    }
  }
}

export default new TahunAjaranController();
