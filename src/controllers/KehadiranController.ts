import { Request, Response } from "express";
import { sendError } from "../libs/error-handler";
import KehadiranService from "../service/KehadiranService";

class KehadiranController {
  async find(req: Request, res: Response) {
    try {
      let { page = 1, pageSize = 10, halaqoh } = req.query;

      const parsedPage = parseInt(page as string, 10);
      const parsedPageSize = parseInt(pageSize as string, 10);

      if (halaqoh === "") halaqoh = null;

      if (
        isNaN(parsedPage) ||
        isNaN(parsedPageSize) ||
        parsedPage < 1 ||
        parsedPageSize < 1
      ) {
        return res.status(400).json({ error: "Invalid pagination parameters" });
      }
      const response = await KehadiranService.findAll(
        parsedPage,
        parsedPageSize,
        halaqoh
      );
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error in find method:", error);
      sendError(res, "Cannot get data kehadiran!");
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await KehadiranService.findOne(id);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error in findOne method:", error);
      sendError(res, "Cannot get data kehadiran!");
    }
  }

  //   async create(req: Request, res: Response) {
  //     try {
  //       const response = await KehadiranService.create(req.body);
  //       return res.status(201).json(response);
  //     } catch (err) {
  //       console.error("Error in create method:", err);
  //       sendError(res, "Cannot create halaqoh!");
  //     }
  //   }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;

      let { meet, halaqohId } = req.query;
      const response = await KehadiranService.update(req.body, meet, halaqohId);
      return res.status(200).json(response);
    } catch (err) {
      console.error("Error in update method:", err);
      sendError(res, "Cannot update data halaqoh!");
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await KehadiranService.delete(id);
      return res.status(200).json(response);
    } catch (err) {
      console.error("Error in delete method:", err);
      sendError(res, "Cannot delete data halaqoh!");
    }
  }
}

export default new KehadiranController();
