import { useAppContext } from "../context/appContext";

const AddWorkout = ({ handleClick }) => {
  const { language } = useAppContext();
  return (
    <div className="singleWorkout addWorkout" onClick={handleClick}>
      <b>+</b>
      <span>{language === "en" ? "Add Workout" : "Adicionar treino"}</span>
    </div>
  );
};
export default AddWorkout;
