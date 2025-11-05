 
// 👉 Step 1: Define a middleware for handling 404 (Not Found) routes
// This function runs when no route matches the incoming request.
// Example: if the user visits a URL that doesn’t exist like "/api/random",
// this function sends a 404 response with a message.
import { logError } from "./logger.js";



export const notFound = (req, res, next) => {
  // Set the HTTP status code to 404 (Not Found)
  res.status(404).json({ message: "Route not found" });
};


// 👉 Step 2: Define a middleware for handling general errors
// This one catches any errors thrown in async routes or other parts of the app.
// Express automatically passes the "err" object here when next(err) is called.
export const errorHandler = (err, req, res, next) => {

   logError({ route: req.originalUrl, message: err.message });
  res.status(res.statusCode || 500).json({ message: err.message });
  // Determine the status code:
  // If a status code is already set and not 200, use it;
  // otherwise, default to 500 (Internal Server Error)
  const status = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  // Send a JSON response with error details
  res.status(status).json({
    // Show the actual error message or a generic one
    message: err.message|| "Server error",

    // For security, in production mode we hide the full error stack trace.
    // In development, we show the actual stack for debugging.
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack
  });
};

