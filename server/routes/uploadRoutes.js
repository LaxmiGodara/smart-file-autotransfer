import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { handleFileUpload } from "../controllers/uploadController.js";

// Custom error to clearly signal invalid file types during filtering
class FileTypeError extends Error {
  constructor(message) {
    super(message);
    this.name = "FileTypeError";
    this.statusCode = 415;
  }
}

const router = express.Router();

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Absolute uploads directory: server/uploads
const uploadDir = path.join(__dirname, "..", "uploads");

// Ensure directory exists at startup
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage using absolute path
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    // Commented fix: prevent path traversal and normalize filenames
    const safeOriginalName = path.basename(file.originalname).replace(/\s+/g, "_");
    cb(null, `${Date.now()}-${safeOriginalName}`);
  }
});

// Allow only .xlsx
const XLSX_MIME = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const fileFilter = (req, file, cb) => {
  const hasValidMime = file.mimetype === XLSX_MIME;
  const hasValidExt = path.extname(file.originalname).toLowerCase() === ".xlsx";
  if (hasValidMime && hasValidExt) return cb(null, true);
  // Commented fix: differentiate file type errors so we can send 415 instead of 500
  cb(new FileTypeError("Only .xlsx files are allowed"));
};

// 2 MB file limit
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }
});

// Optional guard for wrong content-type to give clearer 400
const ensureMultipart = (req, res, next) => {
  const ct = req.headers["content-type"] || "";
  if (!ct.includes("multipart/form-data")) {
    return res.status(400).json({ success: false, message: "Use multipart/form-data with field 'file'" });
  }
  next();
};

// POST /api/upload
router.post("/", ensureMultipart, (req, res, next) => {
  // Commented fix: wrap multer to convert its errors into consistent HTTP responses
  upload.single("file")(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(413).json({ success: false, message: "File larger than 2 MB" });
        }
        return res.status(400).json({ success: false, message: err.message || "Upload failed" });
      }
      if (err instanceof FileTypeError) {
        return res.status(err.statusCode).json({ success: false, message: err.message });
      }
      return next(err);
    }
    return handleFileUpload(req, res, next);
  });
});

export default router;