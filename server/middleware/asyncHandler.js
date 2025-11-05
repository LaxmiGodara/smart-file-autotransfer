 
// 👉 Step 1: Define an async handler utility
// Normally, when you use async functions in Express route handlers,
// you need to wrap them with try...catch to handle errors.
// Example without this helper:
// 
// app.get("/api/students", async (req, res, next) => {
//   try {
//     const data = await Student.find();
//     res.json(data);
//   } catch (error) {
//     next(error);  // pass to error-handling middleware
//   }
// });
//
// Instead of repeating that try...catch every time,
// we create a reusable function called asyncHandler
// that automatically catches errors and passes them to `next()`.

export const asyncHandler = (fn) => (req, res, next) => {
  // 👉 Step 2: Wrap the async function call in a Promise
  // `Promise.resolve(fn(req, res, next))` ensures:
  // - If fn() returns a promise, it will resolve it.
  // - If an error occurs, it will be caught by .catch(next).
  // This way, Express’s built-in error middleware can handle it.
  Promise.resolve(fn(req, res, next)).caught(next);
};
