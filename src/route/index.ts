// routes.ts
import * as express from "express";
import { Request, Response } from "express";
import UserController from "../controllers/UserController";
import auth from "../middleware/auth";
import PostController from "../controllers/PostController";
import SiswaController from "../controllers/SiswaController";
import GuruController from "../controllers/GuruController";
import OperatorController from "../controllers/OperatorController";
import TahunAjaranController from "../controllers/TahunAjaranController";
import SekolahController from "../controllers/SekolahController";
import HalaqohController from "../controllers/HalaqohController";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("This is Api!");
});

// User routes
router.get("/users", UserController.find);
router.get("/users/:id", UserController.findOne);
router.patch("/users/:id", auth, UserController.update);
router.delete("/users/:id", auth, UserController.delete);
router.post("/register", UserController.create);
router.post("/login", UserController.login);

// Post routes
router.get("/posts", PostController.find);
router.get("/posts/:id", PostController.findOne);
router.post("/posts", auth, PostController.create);
router.patch("/posts/:id", auth, PostController.update);
router.delete("/posts/:id", auth, PostController.delete);

// Siswa routes
router.get("/siswa", SiswaController.find);
router.get("/siswa/:id", SiswaController.findOne);
router.post("/siswa", auth, SiswaController.create);
router.patch("/siswa/:id", auth, SiswaController.update);
router.delete("/siswa/:id", auth, SiswaController.delete);

// Guru routes
router.get("/guru", GuruController.find);
router.get("/guru/:id", GuruController.findOne);
router.post("/guru", auth, GuruController.create);
router.patch("/guru/:id", auth, GuruController.update);
router.delete("/guru/:id", auth, GuruController.delete);

// Guru routes
router.get("/operator", OperatorController.find);
router.get("/operator/:id", OperatorController.findOne);
router.post("/operator", auth, OperatorController.create);
router.patch("/operator/:id", auth, OperatorController.update);
router.delete("/operator/:id", auth, OperatorController.delete);

// Tahun Ajaran routes
router.get("/tahunAjaran", TahunAjaranController.find);
router.get("/tahunAjaran/:id", TahunAjaranController.findOne);
router.post("/tahunAjaran", auth, TahunAjaranController.create);
router.patch("/tahunAjaran/:id", auth, TahunAjaranController.update);
router.delete("/tahunAjaran/:id", auth, TahunAjaranController.delete);

// Sekolah routes
router.get("/sekolah", SekolahController.find);
router.get("/sekolah/:id", SekolahController.findOne);
router.post("/sekolah", auth, SekolahController.create);
router.patch("/sekolah/:id", auth, SekolahController.update);
router.delete("/sekolah/:id", auth, SekolahController.delete);

// Halaqoh routes
router.get("/halaqoh", HalaqohController.find);
router.get("/halaqoh/:id", HalaqohController.findOne);
router.post("/halaqoh", auth, HalaqohController.create);
router.patch("/halaqoh/:id", auth, HalaqohController.update);
router.delete("/halaqoh/:id", auth, HalaqohController.delete);

export default router;
