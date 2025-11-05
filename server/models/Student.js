// models placeholder 
// 👉 Step 1: Import mongoose
// Mongoose helps us define the structure (schema) of the data we store in MongoDB.
// Think of it like setting “rules” for what each document (record) in the collection should look like.
import mongoose from "mongoose";


// 👉 Step 2: Create a schema for students
// A schema defines the *shape* of each document inside the “students” collection.
// Example document after applying this schema:
// {
//   name: "Laxmi",
//   roll: "2025A",
//   subject: "Math",
//   marks: 95
// }
const studentSchema = new mongoose.Schema(
  {
    // "name" field: a string, required, and trimmed to remove extra spaces
    name: { type: String, required: true, trim: true },

    // "roll" field: a string, required, and indexed (faster searching)
    roll: { type: String, required: true, index: true },

    // "subject" field: a string, required
    subject: { type: String, required: true },

    // "marks" field: a number, required, between 0 and 100
    marks: { type: Number, required: true, min: 0, max: 100 }
  },

  // Optional schema settings
  // "timestamps: true" automatically adds createdAt and updatedAt fields
  { timestamps: true }
);


// 👉 Step 3: Create a model
// A model acts as a bridge between our code and the actual MongoDB collection.
// "Student" → will become "students" collection name automatically (Mongoose pluralizes it).
export default mongoose.model("Student", studentSchema);

