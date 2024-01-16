import { Repository } from "typeorm";
import { User } from "../entities/Users";
import { AppDataSource } from "../data-source";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { createUserValidation } from "../libs/user-validation";

class UserService {
  private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async find() {
    try {
      const users = await this.userRepository.find();
      return {
        message: "Successfully Get Users",
        users: users,
      };
    } catch (err) {
      throw new Error("Something Wrong with the server");
    }
  }

  async findOne(id: any) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: id,
        },
      });
      return {
        message: "Successfully Get User",
        user: user,
      };
    } catch (err) {
      throw new Error("Something Wrong with the server");
    }
  }

  async create(reqBody: any): Promise<any> {
    try {
      // Validate user input
      const { error } = createUserValidation.validate(reqBody);
      if (error) {
        return {
          message: "Validation error",
          error: error.details[0].message,
        };
      }

      const isEmailAvailable = await this.userRepository.findOne({
        where: {
          email: reqBody.email,
        },
      });

      if (isEmailAvailable) {
        return {
          message: "Email already registered!",
        };
      }

      const password = await bcrypt.hash(reqBody.password, 10);

      const user = this.userRepository.create({
        email: reqBody.email,
        username: reqBody.username,
        password: password,
      });

      await this.userRepository.save(user);

      const key = process.env.JWT_SECRET as string;

      const token = jwt.sign({ user }, key, { expiresIn: "1d" });

      return {
        message: "User successfully registered!",
        user: user,
        token: token,
      };
    } catch (err) {
      console.error("Error in create method:", err);
      throw new Error("Something Wrong with the server");
    }
  }

  async update(reqBody?: any, id?: any) {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: {
          id: id,
        },
      });

      user.email = reqBody.email;
      user.username = reqBody.username;

      const userUpdate = await this.userRepository.save(user);
      return {
        message: "Sucessfully update user data!",
        user: userUpdate,
      };
    } catch (err) {
      throw new Error("Something wrong on the server!");
    }
  }

  async delete(id: any) {
    try {
      await this.userRepository.delete(id);

      return {
        message: "Data results deleted!",
      };
    } catch (error) {
      throw new Error("Something wrong on the server!");
    }
  }

  async login(reqBody?: any): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: reqBody.email,
        },
        select: ["id", "username", "email", "password"],
      });

      if (user === null || user === undefined) {
        // Customize the response when user is not found
        return {
          message: "User not found!",
        };
      }

      const isPassValid = await bcrypt.compare(reqBody.password, user.password);

      if (!isPassValid) {
        return {
          message: "Email / Password is wrong!",
        };
      }

      const key = process.env.JWT_SECRET as string;

      const token = jwt.sign({ user }, key, { expiresIn: "1d" });

      return {
        message: "Login successfully!",
        user: user,
        token: token,
      };
    } catch (err) {
      throw new Error("Something wrong on the server!");
    }
  }
}

export default new UserService();
