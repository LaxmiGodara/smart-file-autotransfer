

# Performance Report – Week 1

## Dataset
- Students: 10,000 rows seeded (6 names × 5 subjects, random marks 0–100).

## Tests & Results
- Pagination GET /api/students?page=1&limit=100 → 120–250 ms.
- Pagination GET /api/students?limit=1000 → 1.8–2.6 s (acceptable for admin view).
- Aggregation GET /api/analytics/subject-average → 80–150 ms.

## Optimizations Done
- Indexes on roll, subject.
- Projection `.select("roll name subject marks")`.
- Seed script uses `insertMany`.

## Next Optimizations
- Use `.lean()` on heavy read routes.
- Add compound index `{ roll: 1, subject: 1 }` if the query pattern needs it.

