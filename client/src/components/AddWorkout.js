const AddWorkout = ({ handleClick }) => {
  return (
    <div className="singleWorkout addWorkout" onClick={handleClick}>
      <b>+</b>
      <span>Add Workout</span>
    </div>
  );
};
export default AddWorkout;
