import { NextFunction, Request, Response } from "express";
const multer = require("multer");

export function upload(fieldName: string) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
      const Suffix = Date.now();
      cb(null, file.fieldname + "-" + Suffix + ".png");
    },
  });

  const uploadFile = multer({ storage: storage }).single(fieldName);

  return (req: Request, res: Response, next: NextFunction) => {
    uploadFile(req, res, function (err) {
      if (err) {
        return res.status(400).json({ err });
      }

      if (req.file) {
        res.locals.filename = req.file.filename;
      }
      next();
    });
  };
}
