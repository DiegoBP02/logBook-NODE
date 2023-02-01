const mongoose = require("mongoose");

const MuscleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Muscle", MuscleSchema);
