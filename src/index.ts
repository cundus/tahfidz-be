import { AppDataSource } from "./data-source";
import { Request, Response } from "express";
import express = require("express");
import bodyParser = require("body-parser");
import router from "./route";
import { v2 as cloudinary } from "cloudinary";
import dotenv = require("dotenv");
dotenv.config();

AppDataSource.initialize()
  .then(async () => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const app = express();
    const port = process.env.PORT;
    const cors = require("cors");

    app.use(cors());
    app.use(bodyParser.json());

    app.use(express.json());
    app.use("/api/", router);

    app.get("/", (req: Request, res: Response) => {
      res.send("hello world");
    });

    app.listen(port, () => {
      console.log("Server is running!");
    });
  })
  .catch((error) => console.log(error));
