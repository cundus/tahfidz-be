import { DataSource } from "typeorm";
import dotenv = require("dotenv");
import { User } from "./entities/Users";
import { Profile } from "./entities/Profile";
import { Sekolah } from "./entities/Sekolah";
import { TahunAjaran } from "./entities/TahunAjaran";
import { Halaqoh } from "./entities/Halaqoh";
import { Kehadiran } from "./entities/Kehadiran";
import { Hafalan } from "./entities/Hafalan";
import { Ujian } from "./entities/Ujian";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST as string,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [
    User,
    Profile,
    Sekolah,
    TahunAjaran,
    Halaqoh,
    Kehadiran,
    Hafalan,
    Ujian,
  ],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});
