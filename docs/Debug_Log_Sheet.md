 
| Date       | Area          | Symptom                                   | Root Cause                         | Fix Applied                                | Status |
|------------|---------------|-------------------------------------------|------------------------------------|--------------------------------------------|--------|
| 2025-10-25 | Upload API    | 400: Missing columns                      | Excel header mismatch              | Header check + clear error message         | Fixed  |
| 2025-10-25 | Seeding       | Slow insert for 10K on first run          | Atlas network + no index           | Built indexes; retry after index           | Fixed  |
| 2025-10-25 | Pagination    | High mem with large limit                 | Large payload + no .lean()         | Added projection + consider .lean()        | Fixed  |

