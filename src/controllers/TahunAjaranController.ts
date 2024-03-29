import { Request, Response } from "express";
import { sendError } from "../libs/error-handler";
import TahunAjaranService from "../service/TahunAjaranService";

class TahunAjaranController {
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
      const response = await TahunAjaranService.find(page, pageSize);
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

  async dummy(req: Request, res: Response) {
    try {
      const dummyData = {
        nama_tahun_ajaran: `TA 2020 - 2021 Ganjil`,
        status: true,
      };

      const response = await TahunAjaranService.create(dummyData);
      return res.status(201).json(response);
    } catch (error) {
      sendError(res, "Cannot create data User!");
    }
  }
}

export default new TahunAjaranController();
