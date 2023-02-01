const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  muscle: {
    type: String,
    required: true,
  },
  muscleId: {
    type: mongoose.Types.ObjectId,
    ref: "Muscle",
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  exercise: {
    type: String,
    required: true,
  },
  sets: [
    {
      reps: { type: Number, required: true },
      weight: { type: Number, required: true },
      rir: { type: Number, required: true, default: 0 },
    },
  ],
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
