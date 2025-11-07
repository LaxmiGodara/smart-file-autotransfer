import Student from "../models/Student.js";

// GET /api/analytics/subject-average
export const getSubjectAverage = async (req, res) => {
  try {
    // Group by subject and calculate average marks
    const result = await Student.aggregate([
      { $group: { _id: "$subject", averageMarks: { $avg: "$marks" } } },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({
      success: true,
      message: "Average marks by subject",
      data: result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error calculating averages",
      error: err.message
    });
  }
};
