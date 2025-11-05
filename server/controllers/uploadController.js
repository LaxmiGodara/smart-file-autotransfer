import { validateRows } from "../utils/validateRows.js";
import Student from "../models/Student.js";

export const handleFileUpload = asyncHandler(async (req, res) => {
  const workbook = XLSX.readFile(req.file.path);
  const sheet = workbook.SheetNames[0];
  const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

  const { valid, invalid } = validateRows(rows);

  if (!valid.length) {
    fs.unlinkSync(req.file.path);
    res.status(400);
    throw new Error("No valid records found in uploaded file");
  }

  await Student.insertMany(valid, { ordered: false });
  fs.unlinkSync(req.file.path);

  res.status(200).json({
    message: "Upload completed",
    totalRows: rows.length,
    inserted: valid.length,
    invalid: invalid.length,
    invalidSample: invalid.slice(0, 3)
  });
});
