// 👉 Step 1: Import required modules
// - mongoose: connects Node.js to MongoDB
// - dotenv: loads environment variables (like MONGO_URI)
// - Student: our model to interact with the 'students' collection
import mongoose from "mongoose";
import dotenv from "dotenv";
import Student  from "../models/Student.js";


// 👉 Step 2: Configure dotenv to load environment variables
dotenv.config();


// 👉 Step 3: Define sample data arrays
// These arrays will be used to randomly assign subjects and names
const subjects = ["Maths", "Science", "English", "History", "Geography"];
const names = ["Ravi", "Priya", "Ananya", "Karan", "Manoj", "Divya"];


// 👉 Step 4: Create a function to generate random student data
// This function creates 10,000 fake student objects with random names, subjects, and marks
const generateData = () => {
  const data = [];

  // Loop from 1 to 10,000 to create each record
  for (let i = 1; i <10000; i++) {

    // Pick a random name from the names array
    const name = names[Math.floor(Math.random() * names.length)];

    // Create a roll number like R00001, R00002, etc.
    const roll = "R" + String(i).padStart(5, "0");

    // Pick a random subject from the subjects array
    const subject = subjects[Math.floor(Math.random() * subjects.length)];

    // Generate random marks between 0 and 100
    const marks = Math.floor(Math.random() * 101);

    // Push the record into the data array
    data.push({ name, roll, subject, marks });
  }

  // Return all generated records
  return data;
};


// 👉 Step 5: Define the main seeding function
// This function connects to MongoDB, clears old data, and inserts new data
const seedData = async () => {
  try {
    // Connect to MongoDB using environment variable MONGO_URI
    await mongoose.connect(process.env.MONGO_URI);

    // Delete all existing records in the Student collection
    await Student.deleteMany({});

    // Insert 10,000 new random records
    await Student.insertMany(generateData());

    console.log("✅ 10K records inserted successfully!");
    process.exit(); // Exit the process after success

  } catch (err) {
    // If any error occurs, log it and exit with an error code (1)
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
};


// 👉 Step 6: Run the seeding function
seedData();
