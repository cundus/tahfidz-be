// routes.ts
import * as express from "express";
import { Request, Response } from "express";
import UserController from "../controllers/UserController";
import auth from "../middleware/auth";
// import PostController from "../controllers/PostController";

import TahunAjaranController from "../controllers/TahunAjaranController";
import SekolahController from "../controllers/SekolahController";
import HalaqohController from "../controllers/HalaqohController";
import KehadiranController from "../controllers/KehadiranController";
import HafalanController from "../controllers/HafalanController";
import UjianController from "../controllers/UjianController";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("This is Api!");
});

// User routes
router.get("/users", UserController.find);
router.get("/users/:id", UserController.findOne);
router.put("/users/:id", UserController.update);
router.delete("/users/:id", UserController.delete);
router.post("/users", UserController.create);
router.post("/login", UserController.login);
router.post("/users/dummy", UserController.dummy);

// // Post routes
// router.get("/posts", PostController.find);
// router.get("/posts/:id", PostController.findOne);
// router.post("/posts", auth, PostController.create);
// router.patch("/posts/:id", auth, PostController.update);
// router.delete("/posts/:id", auth, PostController.delete);

// Tahun Ajaran routes
router.get("/tahunAjaran", TahunAjaranController.find);
router.get("/tahunAjaran/:id", TahunAjaranController.findOne);
router.post("/tahunAjaran", TahunAjaranController.create);
router.put("/tahunAjaran/:id", TahunAjaranController.update);
router.delete("/tahunAjaran/:id", TahunAjaranController.delete);
router.post("/tahunAjaran/dummy", TahunAjaranController.dummy);

// Sekolah routes
router.get("/sekolah", SekolahController.find);
router.get("/sekolah/:id", SekolahController.findOne);
router.post("/sekolah", SekolahController.create);
router.put("/sekolah/:id", SekolahController.update);
router.delete("/sekolah/:id", SekolahController.delete);

// Halaqoh routes
router.get("/halaqoh", HalaqohController.find);
router.get("/halaqoh/:id", HalaqohController.findOne);
router.post("/halaqoh", HalaqohController.create);
router.put("/halaqoh/:id", HalaqohController.update);
router.delete("/halaqoh/:id", HalaqohController.delete);

// kehadiran routes
router.get("/kehadiran", KehadiranController.find);
router.get("/kehadiran/:id", KehadiranController.findOne);
router.post("/kehadiran", KehadiranController.create);
router.put("/kehadiran", KehadiranController.update);
router.delete("/kehadiran/:id", KehadiranController.delete);

// Hafalan routes
router.get("/hafalan", HafalanController.find);
router.get("/hafalan/:id", HafalanController.findOne);
router.post("/hafalan", HafalanController.create);
router.put("/hafalan/:id", HafalanController.update);
router.delete("/hafalan/:id", HafalanController.delete);

// Ujian routes
router.get("/ujian", UjianController.find);
router.get("/ujian/:id", UjianController.findOne);
router.post("/ujian", UjianController.create);
router.put("/ujian/:id", UjianController.update);
router.delete("/ujian/:id", UjianController.delete);

export default router;
