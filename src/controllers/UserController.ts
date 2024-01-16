import { Request, Response } from "express";
import UserService from "../service/UserService";
import { sendError } from "../libs/error-handler";
import { createUserValidation, loginValidation } from "../libs/user-validation";

class UserController {
  async find(req: Request, res: Response) {
    try {
      const response = await UserService.find();
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error in find method:", error);
      sendError(res, "Cannot get data Users!");
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await UserService.findOne(id);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error in findOne method:", error);
      sendError(res, "Cannot get data User!");
    }
  }

  async create(req: Request, res: Response) {
    try {
      // Validate user input
      const { error } = createUserValidation.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: "Validation error",
          details: error.details[0].message,
        });
      }

      const response = await UserService.create(req.body);
      if (response.message === "Email already registered!") {
        // Handle the case where UserService.create returns an error
        sendError(res, response.message, 400); // 400 Bad Request
        return;
      } else {
        return res.status(201).json(response); // 201 Created
      }
    } catch (err) {
      console.error("Error in create method:", err);
      sendError(res, "Cannot create data User!");
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await UserService.update(req.body, id);
      return res.status(200).json(response);
    } catch (err) {
      console.error("Error in update method:", err);
      sendError(res, "Cannot update data User!");
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await UserService.delete(id);
      return res.status(200).json(response);
    } catch (err) {
      console.error("Error in delete method:", err);
      sendError(res, "Cannot delete data User!");
    }
  }

  async login(req: Request, res: Response) {
    try {
      // Validate user input
      const { error } = loginValidation.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: "Validation error",
          details: error.details[0].message,
        });
      }

      const response = await UserService.login(req.body);

      if (
        response.message === "Email / Password is wrong!" ||
        response.message === "User not found!"
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
}

export default new UserController();
