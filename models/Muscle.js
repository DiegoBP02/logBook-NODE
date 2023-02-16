import mongoose from "mongoose";

const MuscleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

MuscleSchema.virtual("exercise", {
  ref: "Exercise",
  localField: "_id",
  foreignField: "muscleId",
  justOne: false,
});
export default mongoose.model("Muscle", MuscleSchema);
