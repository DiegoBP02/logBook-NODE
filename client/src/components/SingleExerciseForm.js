import { Link } from "react-router-dom";
import FormRow from "./FormRow";

const SingleExerciseForm = ({
  handleChange,
  handleSubmit,
  values,
  muscleId,
  handleRemove,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form">
        <div className="formWrapper">
          <FormRow
            type="text"
            name="exercise"
            value={values.exercise}
            handleChange={handleChange}
            labelText="exercise"
          />
          <FormRow
            type="number"
            name="reps"
            value={values.reps}
            handleChange={handleChange}
            labelText="reps"
            min="1"
          />
          <FormRow
            type="number"
            name="weight"
            value={values.weight}
            handleChange={handleChange}
            labelText="weight"
            min="1"
          />
          <FormRow
            type="number"
            labelText="rir"
            name="rir"
            value={values.rir}
            handleChange={handleChange}
            min="0"
          />
        </div>
        <button type="submit" className="btn">
          Add Exercise
        </button>
        <Link
          to={`/singleMuscle/${muscleId}`}
          style={{ color: "red" }}
          onClick={handleRemove}
          className="removeBtn"
        >
          Remove Workout
        </Link>
      </div>
    </form>
  );
};
export default SingleExerciseForm;
