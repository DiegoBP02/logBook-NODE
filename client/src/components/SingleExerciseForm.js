import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import FormRow from "./FormRow";

const SingleExerciseForm = ({
  handleChange,
  handleSubmit,
  values,
  muscleId,
  handleRemove,
}) => {
  const { language } = useAppContext();
  return (
    <form onSubmit={handleSubmit}>
      <div className="form">
        <div className="formWrapper">
          <FormRow
            type="text"
            name="exercise"
            value={values.exercise}
            handleChange={handleChange}
            labelText={language === "en" ? "exercise" : "exercício"}
          />
          <FormRow
            type="number"
            name="reps"
            value={values.reps}
            handleChange={handleChange}
            labelText={language === "en" ? "reps" : "repetições"}
            min="1"
          />
          <FormRow
            type="number"
            name="weight"
            value={values.weight}
            handleChange={handleChange}
            labelText={language === "en" ? "weight" : "peso"}
            min="1"
            step=".01"
          />
          <FormRow
            type="number"
            labelText="RIR"
            name="rir"
            value={values.rir}
            handleChange={handleChange}
            min="0"
          />
        </div>
        <button type="submit" className="btn">
          {language === "en" ? "Add Set" : "Adicionar série"}
        </button>
        <Link
          to={`/singleMuscle/${muscleId}`}
          style={{ color: "red" }}
          onClick={handleRemove}
          className="removeBtn"
        >
          {language === "en" ? "Remove workout" : "Remover treino"}
        </Link>
      </div>
    </form>
  );
};
export default SingleExerciseForm;
