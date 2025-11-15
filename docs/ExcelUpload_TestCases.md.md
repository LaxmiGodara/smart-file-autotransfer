

# **Test Cases for Uploading Excel File**

## **1. Test Cases Table**

| Test Case ID | Scenario                              | Input Description                                      | Expected Result                                                                  | Actual Result | Status  |
| ------------ | ------------------------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------- | ------------- | ------- |
| **TC-001**   | Successful upload with all valid rows | Valid `.xlsx` file with correct headers & 5 valid rows | 200 OK, message “Upload completed”, totalRows: 5, inserted: 5, invalid: 0        |               | Pending |
| **TC-002**   | Upload with some invalid rows         | 10 rows: 7 valid, 3 invalid                            | 200 OK, totalRows: 10, inserted: 7, invalid: 3, invalidSample shows invalid rows |               | Pending |
| **TC-003**   | No file uploaded                      | No file in request                                     | 400, “No file uploaded”                                                          |               | Pending |
| **TC-004**   | Wrong content type                    | Content-Type: application/json                         | 400, “Use multipart/form-data”                                                   |               | Pending |
| **TC-005**   | Invalid format (.xls)                 | Upload `.xls` file                                     | 400, “Only .xlsx files are allowed”                                              |               | Pending |
| **TC-006**   | Invalid format (.csv)                 | Upload `.csv` file                                     | 400, “Only .xlsx files are allowed”                                              |               | Pending |
| **TC-007**   | Invalid format (.pdf)                 | Upload `.pdf` file                                     | 400, “Only .xlsx files are allowed”                                              |               | Pending |
| **TC-008**   | File size exceeds limit               | File > 2MB                                             | 413 or 400, file size error                                                      |               | Pending |
| **TC-009**   | File at exact limit                   | File exactly 2MB                                       | 200 OK, file accepted                                                            |               | Pending |
| **TC-010**   | Empty workbook                        | Excel file with no sheets                              | 400, “No sheet found”                                                            |               | Pending |
| **TC-011**   | Missing header: Name                  | Missing “Name” column                                  | 400, “Missing columns”                                                           |               | Done |
| **TC-012**   | Missing header: Roll                  | Missing “Roll” column                                  | 400, “Missing columns”                                                           |               | Done|
| **TC-013**   | Missing header: Subject               | Missing “Subject” column                               | 400, “Missing columns”                                                           |               | Done |
| **TC-014**   | Missing header: Marks                 | Missing “Marks” column                                 | 400, “Missing columns”                                                           |               | Done |
| **TC-015**   | Wrong header case                     | name, roll, subject, marks                             | 400, headers invalid                                                             |               | Pending |
| **TC-016**   | Extra headers present                 | Name, Roll, Subject, Marks + extra columns             | 200 OK, only required columns used                                               |               | Pending |
| **TC-017**   | Only headers, no data                 | No data rows                                           | 400, “No valid records found”                                                    |               | Pending |
| **TC-018**   | Empty Name field                      | Name = “”                                              | Row marked invalid                                                               |               | Pending |
| **TC-019**   | Empty Roll field                      | Roll = “”                                              | Row invalid                                                                      |               | Pending |
| **TC-020**   | Empty Subject field                   | Subject = “”                                           | Row invalid                                                                      |               | Pending |
| **TC-021**   | Empty Marks field                     | Marks = “”                                             | Row invalid                                                                      |               | Pending |
| **TC-022**   | Marks as text                         | Marks = “abc”                                          | Row invalid                                                                      |               | Pending |
| **TC-023**   | Marks negative                        | Marks = -5                                             | Row invalid                                                                      |               | Pending |
| **TC-024**   | Marks > 100                           | Marks = 105                                            | Row invalid                                                                      |               | Pending |
| **TC-025**   | Marks = 0                             | Marks within range                                     | Row valid                                                                        |               | Pending |
| **TC-026**   | Marks = 100                           | Marks within range                                     | Row valid                                                                        |               | Pending |
| **TC-027**   | Marks decimal                         | Marks = 85.5                                           | Row valid                                                                        |               | Pending |
| **TC-028**   | All rows invalid                      | 5 invalid rows                                         | 400, “No valid records found”                                                    |               | Pending |
| **TC-029**   | Name with spaces                      | “  John Doe  ”                                         | Trimmed and valid                                                                |               | Pending |
| **TC-030**   | Roll with spaces                      | “  2025A  ”                                            | Trimmed and valid                                                                |               | Pending |
| **TC-031**   | Subject with spaces                   | “  Math  ”                                             | Trimmed and valid                                                                |               | Pending |
| **TC-032**   | Marks as string number                | “95”                                                   | Converted to 95, valid                                                           |               | Pending |
| **TC-033**   | Large dataset                         | 150 valid rows                                         | 200 OK, inserted: 150                                                            |               | Pending |
| **TC-034**   | Mixed valid/invalid (50/50)           | 100 rows                                               | 200 OK, inserted: 50, invalid: 50                                                |               | Pending |
| **TC-035**   | Duplicate roll numbers                | Two rows same Roll                                     | Both accepted (no duplicate rule)                                                |               | Pending |
| **TC-036**   | Special characters in Name            | “José O’Brien”                                         | Valid                                                                            |               | Pending |
| **TC-037**   | Special characters in Roll            | “2025-A/B”                                             | Valid                                                                            |               | Pending |
| **TC-038**   | Special characters in Subject         | “Math & Science”                                       | Valid                                                                            |               | Pending |
| **TC-039**   | Very long Name                        | 200 characters                                         | Valid                                                                            |               | Pending |
| **TC-040**   | Multiple sheets                       | 3 sheets, use first sheet                              | 200 OK                                                                           |               | Pending |
| **TC-041**   | DB connection error                   | MongoDB down                                           | 500, DB error                                                                    |               | Pending |
| **TC-042**   | Temp file cleanup                     | After processing                                       | Temp file deleted                                                                |               | Pending |
| **TC-043**   | Invalid sample limited to 3           | 20 invalid rows                                        | invalidSample = 3 items                                                          |               | Pending |
| **TC-044**   | Marks string with leading zero        | “007”                                                  | Converted to 7, valid                                                            |               | Pending |
| **TC-045**   | Marks as scientific notation          | “1e2”                                                  | Converted to 100, valid                                                          |               | Pending |
| **TC-046**   | Empty string Marks                    | “”                                                     | Invalid                                                                          |               | Pending |
| **TC-047**   | Null Marks                            | null                                                   | Invalid                                                                          |               | Pending |
| **TC-048**   | Name has only spaces                  | “   ”                                                  | Invalid after trim                                                               |               | Pending |
| **TC-049**   | Concurrent uploads                    | 10 simultaneous uploads                                | All return 200                                                                   |               | Pending |
| **TC-050**   | Performance for large file            | 1000 rows                                              | Response < 5 sec                                                                 |               | Pending |

---

## **2. Test Coverage Summary**

### **Total Test Cases: 50**

### **Categories Covered**

* ✔ **File Upload Validation**
* ✔ **Header Validation**
* ✔ **Cell-level Data Validation**
* ✔ **Boundary & Edge Cases**
* ✔ **Special Characters & Formatting**
* ✔ **Database Error Handling**
* ✔ **Performance & Load Tests**
* ✔ **File Cleanup Checks**


