import { Repository } from "typeorm";
import { User } from "../entities/Users";
import { AppDataSource } from "../data-source";
import * as bcrypt from "bcrypt";

class seedDB {
  private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async userSeed() {
    const password = await bcrypt.hash("admin", 10);

    const user = this.userRepository.create({
      username: "admin",
      password: password,
      role: "admin",
    });

    await this.userRepository.save(user);

    console.log("User seeded successfully!");
  }
}

AppDataSource.initialize()
  .then(async () => {
    async function seed() {
      const seeder = new seedDB();
      await seeder.userSeed();
      console.log("User seeding completed!");
    }

    seed()
      .then(() => process.exit(0))
      .catch((error) => {
        console.error("Error seeding database:", error);
        process.exit(1);
      });
  })
  .catch((error) => console.log(error));
