// routes placeholder 
// 👉 Step 1: Import required modules
// - express: to create the router and define routes
// - multer: to handle file uploads
// - handleFileUpload: the controller function that processes uploaded files
import express from "express";
import multer from "multer";
import { handleFileUpload } from "../controllers/uploadController.js";


// 👉 Step 2: Create a new router instance
// Routers help organize your routes into separate modules
const router = express.Router();


// 👉 Step 3: Configure Multer for file storage
// diskStorage() lets us control where and how uploaded files are saved on the server
const storage = multer.diskStorage({
  // destination → defines the folder where files will be stored
  destination: (req, file, cb) => cb(null, "server/uploads"),

  // filename → defines how the uploaded file will be named
  // Here we use Date.now() to make each filename unique
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});


// 👉 Step 4: Filter allowed file types
// This function ensures only .xlsx (Excel) files can be uploaded
const fileFilter = (req, file, cb) => {
  const type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  
  // If file type matches .xlsx → accept the file
  if (file.mimetype === type) return cb(null, true);

  // Otherwise, reject it with an error message
  cb(new Error("Only .xlsx files are allowed"));
};


// 👉 Step 5: Create the multer upload instance
// Configure storage, file type filter, and max upload size (2 MB)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2 MB limit
});


// 👉 Step 6: Define the upload route
// - POST request to "/"
// - upload.single("file") handles a single file upload (field name must be 'file')
// - handleFileUpload will process the uploaded file (controller logic)
router.post("/", upload.single("file"), handleFileUpload);


// 👉 Step 7: Export the router
// So it can be used in server.js (mounted at /api/upload)
export default router;

