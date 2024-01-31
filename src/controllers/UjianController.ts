import { Request, Response } from "express";
import { sendError } from "../libs/error-handler";
import UjianService from "../service/UjianService";

class UjianController {
  async find(req: Request, res: Response) {
    try {
      let { page = 1, pageSize = 10 } = req.query;

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
      const response = await UjianService.findAll(parsedPage, parsedPageSize);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error in find method:", error);
      sendError(res, "Cannot get data Ujian!");
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await UjianService.findOne(id);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error in findOne method:", error);
      sendError(res, "Cannot get data Ujian!");
    }
  }

  async create(req: Request, res: Response) {
    try {
      const response = await UjianService.create(req.body);
      return res.status(201).json(response);
    } catch (err) {
      console.error("Error in create method:", err);
      sendError(res, "Cannot create Ujian!");
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const response = await UjianService.update(req.body, id);
      return res.status(200).json(response);
    } catch (err) {
      console.error("Error in update method:", err);
      sendError(res, "Cannot update data Ujian!");
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await UjianService.delete(id);
      return res.status(200).json(response);
    } catch (err) {
      console.error("Error in delete method:", err);
      sendError(res, "Cannot delete data Ujian!");
    }
  }
}

export default new UjianController();
