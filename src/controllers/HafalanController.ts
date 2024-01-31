import { Request, Response } from "express";
import { sendError } from "../libs/error-handler";
import HafalanService from "../service/HafalanService";

class HafalanController {
  async find(req: Request, res: Response) {
    try {
      let { page = 1, pageSize = 10, type } = req.query;

      if (type === "") type = null;

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
      const response = await HafalanService.findAll(
        parsedPage,
        parsedPageSize,
        type
      );
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error in find method:", error);
      sendError(res, "Cannot get data Hafalan!");
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await HafalanService.findOne(id);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error in findOne method:", error);
      sendError(res, "Cannot get data Hafalan!");
    }
  }

  async create(req: Request, res: Response) {
    try {
      let { type } = req.query;

      if (type === "") type = null;
      const response = await HafalanService.create(req.body, type);
      return res.status(201).json(response);
    } catch (err) {
      console.error("Error in create method:", err);
      sendError(res, "Cannot create Hafalan!");
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const response = await HafalanService.update(req.body, id);
      return res.status(200).json(response);
    } catch (err) {
      console.error("Error in update method:", err);
      sendError(res, "Cannot update data halaqoh!");
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await HafalanService.delete(id);
      return res.status(200).json(response);
    } catch (err) {
      console.error("Error in delete method:", err);
      sendError(res, "Cannot delete data halaqoh!");
    }
  }
}

export default new HafalanController();
