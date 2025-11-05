// controller placeholder 
// 👉 Step 1: Import required modules
// - XLSX: helps us read and convert Excel (.xlsx) files into JSON.
// - fs: used to delete files after processing (cleanup).
// - path: helps handle file paths safely.
// - Student: our Mongoose model for the "students" collection.
// - asyncHandler: catches async errors so we don't need try...catch everywhere.
import XLSX from "xlsx";
import fs from "fs";
import path from "path";
import Student from "../models/Student.js";
import { asyncHandler} from "../middleware/asyncHandler.js";


// 👉 Step 2: Define controller function to handle uploaded files
// The asyncHandler automatically catches errors and passes them to the global error handler.
export const handleFileUpload= asyncHandler(async (req, res) => {
  
  // 👉 Step 3: Check if a file was uploaded
  // If no file is uploaded, return 400 (Bad Request)
  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  // 👉 Step 4: Get the file path of the uploaded file
  const filePath = req.file.path;


  // 👉 Step 5: Read and parse the Excel file
  // readFile() → reads Excel file into a workbook object
  // SheetNames[0] → gets the first sheet in the workbook
  // sheet_to_json() → converts sheet data into JSON array (rows)
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: "" });


  // 👉 Step 6: Validate required columns
  // The Excel must have these column headers: Name, Roll, Subject, Marks
  const required = ["Name", "Roll", "Subject", "Marks"];

  // Filter missing columns by checking the first row’s keys
  const missingCols = required.filter((col) => !Object.keys(rows[0] || {}).includes(col));

  if (missingCols.length) {
    // If columns are missing, delete the uploaded file and send an error
    fs.unlinkSync(filePath);
    res.status(400);
    throw new Error(`Missing columns: ${missingCols.join(", ")}`);
  }


  // 👉 Step 7: Prepare valid documents and track errors
  const docs = [];
  const errors = [];

  for (const [idx, r] of rows.entries()) {
    // Extract and clean each field
    const name = String(r.Name).trim();
    const roll = String(r.Roll).trim();
    const subject = String(r.Subject).trim();
    const marks = Number(r.Marks);

    // Validate data
    if (!name || !roll || !subject || Number.isNaN(marks)) {
      errors.push({ row: idx + 2, issue: "Empty or invalid fields" }); // +2 for header and 1-based index
      continue;
    }

    if (marks < 0 || marks > 100) {
      errors.push({ row: idx + 2, issue: "Marks out of range 0-100" });
      continue;
    }

    // If valid, add to docs array
    docs.push({ name, roll, subject, marks });
  }


  // 👉 Step 8: Insert valid documents into MongoDB
  // insertMany() → bulk insert all valid records
  if (docs.length) {
    await Student.insertMany(docs, { ordered: false });
  }


  // 👉 Step 9: Delete the uploaded Excel file after processing
  fs.unlinkSync(filePath);


  // 👉 Step 10: Send response with summary details
  // Includes total rows, successful inserts, failed records, sample data, and error details.
  return res.status(200).json({
    message: "File processed",
    totalRows: rows.length,
    inserted: docs.length,
    failed: errors.length,
    sample: rows.slice(0, 2), // first two rows as preview
    errors
  });
});
