const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  exercise: {
    type: String,
    required: true,
  },
  sets: [
    {
      reps: { type: Number, required: true },
      weight: { type: Number, required: true },
      rir: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
