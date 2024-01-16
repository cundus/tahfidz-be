// PostService.ts
import { Repository } from "typeorm";
import { Post } from "../entities/Posts";
import { AppDataSource } from "../data-source";
import { createPostValidation } from "../libs/post-validation";

class PostService {
  private readonly postRepository: Repository<Post> =
    AppDataSource.getRepository(Post);

  async find(): Promise<any> {
    try {
      const posts = await this.postRepository.find({
        relations: ["user"],
      });
      return {
        message: "Successfully Get Posts",
        posts: posts,
      };
    } catch (err) {
      throw new Error("Something Wrong with the server");
    }
  }

  async findOne(id: any): Promise<any> {
    try {
      const post = await this.postRepository.findOne({
        where: {
          id: id,
        },
      });
      return {
        message: "Successfully Get Post",
        post: post,
      };
    } catch (err) {
      throw new Error("Something Wrong with the server");
    }
  }

  async update(reqBody?: any, id?: any): Promise<any> {
    try {
      const post = await this.postRepository.findOneOrFail({
        where: {
          id: id,
        },
      });

      post.title = reqBody.title;
      post.content = reqBody.content;

      const postUpdate = await this.postRepository.save(post);
      return {
        message: "Sucessfully update post data!",
        post: postUpdate,
      };
    } catch (err) {
      throw new Error("Something wrong on the server!");
    }
  }

  async delete(id: any): Promise<any> {
    try {
      await this.postRepository.delete(id);

      return {
        message: "Post deleted successfully!",
      };
    } catch (error) {
      throw new Error("Something wrong on the server!");
    }
  }

  async create(postBody: any, userId: any): Promise<any> {
    try {
      console.log(userId);

      // Validate post input
      const { error } = createPostValidation.validate(postBody);
      if (error) {
        return {
          message: "Validation error",
          error: error.details[0].message,
        };
      }

      const post = this.postRepository.create({
        title: postBody.title,
        content: postBody.content,
        user: userId.user.id,
      });

      await this.postRepository.save(post);

      return {
        message: "Post successfully created!",
        post: post,
      };
    } catch (err) {
      console.error("Error in create method:", err);
      throw new Error("Something Wrong with the server");
    }
  }
}

export default new PostService();
