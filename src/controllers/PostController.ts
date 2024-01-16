// PostController.ts
import { Request, Response } from "express";
import PostService from "../service/PostService";
import { sendError } from "../libs/error-handler";

class PostController {
  async find(req: Request, res: Response) {
    try {
      const response = await PostService.find();
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error in find method:", error);
      sendError(res, "Cannot get data Posts!");
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await PostService.findOne(id);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error in findOne method:", error);
      sendError(res, "Cannot get data Post!");
    }
  }

  async create(req: Request, res: Response) {
    try {
      const userId = res.locals.loginSession;
      const response = await PostService.create(req.body, userId);
      return res.status(201).json(response);
    } catch (err) {
      console.error("Error in create method:", err);
      sendError(res, "Cannot create post!");
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await PostService.update(req.body, id);
      return res.status(200).json(response);
    } catch (err) {
      console.error("Error in update method:", err);
      sendError(res, "Cannot update data Post!");
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await PostService.delete(id);
      return res.status(200).json(response);
    } catch (err) {
      console.error("Error in delete method:", err);
      sendError(res, "Cannot delete data Post!");
    }
  }
}

export default new PostController();
