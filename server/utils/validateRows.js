// validateRows validates an array of student row objects, separating valid and invalid entries with detailed checks and comments
export const validateRows = (rows) => {
  // valid: stores all rows that pass checks and can be inserted to DB
  const valid = [];
  // invalid: stores information about each row that failed validation
  const invalid = [];

  // Iterate through each row in the input array, preserving the index for line reporting
  rows.forEach((r, i) => {
    // Extract and trim the "Name" field (if missing, set as empty string)
    const name = String(r.Name || "").trim();
    // Extract and trim the "Roll" field (if missing, set as empty string)
    const roll = String(r.Roll || "").trim();
    // Extract and trim the "Subject" field (if missing, set as empty string)
    const subject = String(r.Subject || "").trim();
    // Convert the "Marks" field to a number (may become NaN if not a valid numeric string)
    const marks = Number(r.Marks);

    // Check if any required field is empty or if marks is not a valid number
    if (!name || !roll || !subject || Number.isNaN(marks)) {
      // Push an object describing the problem (row number and issue) to invalid
      // Add 2 to the index to compensate for header row and 0-based index
      invalid.push({ row: i + 2, issue: "Empty or invalid fields" });
    } 
    // Check if marks are outside of the valid range (0-100)
    else if (marks < 0 || marks > 100) {
      // Mark as invalid if marks are out of proper boundaries
      invalid.push({ row: i + 2, issue: "Marks out of range (0–100)" });
    } 
    // If passed all checks, consider this row valid
    else {
      // Push the cleaned and verified object onto the valid array for later use
      valid.push({ name, roll, subject, marks });
    }
  });

  // Return an object with separate lists for valid and invalid rows
  return { valid, invalid };
};
