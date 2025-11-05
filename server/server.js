// 👉 Step 1: Import necessary modules
// The "express" module is used to create a web server.
// The "dotenv" module loads environment variables from a .env file (like PORT, MONGO_URI).
// The "cors" module enables communication between frontend and backend (Cross-Origin Resource Sharing).
// The "mongoose" module is used to connect and interact with MongoDB.
// The "uploadRoutes" file will contain all routes related to uploading files.
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// 👉 Step 2: Configure environment variables
// This line makes all the variables inside the .env file available as process.env.VARIABLE_NAME
dotenv.config();

// 👉 Step 3: Initialize Express app
// The "express()" function returns an Express app that we can configure and run.
const app = express();

// 👉 Step 4: Add core middlewares
// Middleware functions are executed before the route handlers.
// - cors() allows requests from different origins (like frontend running on another port).
// - express.json() allows Express to understand JSON data coming in requests.
app.use(cors());
app.use(express.json());

app.use(notFound);
app.use(errorHandler);


// 👉 Step 5: Define API routes
// This line means: whenever a request starts with "/api/upload",
// Express should hand over the request to the uploadRoutes file.
app.use("/api/upload", uploadRoutes);

// 👉 Step 6: Connect to MongoDB and start the server
// We wrap it inside an async function because connecting to MongoDB returns a Promise.
const start = async () => {
  try {
    // Connect to MongoDB using Mongoose
    // process.env.MONGO_URI is the database URL stored inside the .env file.
    // dbName option specifies which database to use.
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "smart_file_autotransfer"
    });

    console.log("✅ MongoDB connected");

    // Get the port number from environment variables or default to 5000
    const port = process.env.PORT || 5000;

    // Start the Express server
    // The app.listen() function starts the server and listens for requests on the given port.
    app.listen(port, () => console.log(`🚀 Server running on ${port}`));

  } catch (err) {
    // If MongoDB fails to connect, this block will execute.
    console.error("❌ DB connection error:", err.message);

    // process.exit(1) means stop the application (with error code 1).
    process.exit(1);
  }
};

// 👉 Step 7: Call the start() function to actually start the process
start();
