const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    muscleId: {
      type: mongoose.Types.ObjectId,
      ref: "Muscle",
      required: true,
    },
    muscle: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", WorkoutSchema);
