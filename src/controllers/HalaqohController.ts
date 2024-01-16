import { Request, Response } from "express";
import { sendError } from "../libs/error-handler";
import HalaqohService from "../service/HalaqohService";

class HalaqohController {
  async find(req: Request, res: Response) {
    try {
      const response = await HalaqohService.find();
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error in find method:", error);
      sendError(res, "Cannot get data halaqoh!");
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await HalaqohService.findOne(id);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error in findOne method:", error);
      sendError(res, "Cannot get data halaqoh!");
    }
  }

  async create(req: Request, res: Response) {
    try {
      const response = await HalaqohService.create(req.body);
      return res.status(201).json(response);
    } catch (err) {
      console.error("Error in create method:", err);
      sendError(res, "Cannot create halaqoh!");
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await HalaqohService.update(req.body, id);
      return res.status(200).json(response);
    } catch (err) {
      console.error("Error in update method:", err);
      sendError(res, "Cannot update data halaqoh!");
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await HalaqohService.delete(id);
      return res.status(200).json(response);
    } catch (err) {
      console.error("Error in delete method:", err);
      sendError(res, "Cannot delete data halaqoh!");
    }
  }
}

export default new HalaqohController();
