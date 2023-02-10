import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Wrapper from "../assets/wrappers/SingleExercise";
import { useAppContext } from "../context/appContext";
import { Navbar, SingleExerciseForm, Loading } from "../components";

const initialState = {
  exercise: "",
  reps: "",
  weight: "",
  rir: "",
};

const Exercises = () => {
  const [values, setValues] = useState(initialState);
  const { date, muscleId, workoutId } = useParams();
  const { getExercises, sets, addSet, isLoading, handleRemove, getWorkouts } =
    useAppContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSetRemove = () => {
    handleRemove({ workoutId, muscleId, date });
    getWorkouts({ id: muscleId });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      date,
      muscleId,
      exercise: values.exercise,
      sets: [
        {
          reps: values.reps,
          weight: values.weight,
          rir: values.rir,
        },
      ],
    };

    addSet({ data, date, muscleId });
  };

  useEffect(() => {
    getExercises({ date, muscleId });
  }, []);

  return (
    <Wrapper>
      <Navbar />
      {sets.length === 0 ? (
        <h5>No sets to display...</h5>
      ) : (
        <>
          <article
            className="properties marginBottom"
            style={{ paddingBottom: "1rem" }}
          >
            <p>Set</p>
            <p>Exercise name</p>
            <p>Reps</p>
            <p>Weight</p>
            <p>RIR</p>
          </article>
          {sets &&
            sets.length > 0 &&
            sets.map((set, exerciseIndex) => {
              return (
                <div key={exerciseIndex}>
                  {set.sets.map((exerciseProperty, setIndex) => (
                    <div key={setIndex} className="properties">
                      <p>{exerciseIndex + 1}</p>
                      <p>{set.exercise}</p>
                      <p>{exerciseProperty.reps}</p>
                      <p>{exerciseProperty.weight}</p>
                      <p>{exerciseProperty.rir}</p>
                    </div>
                  ))}
                </div>
              );
            })}
          {isLoading && (
            <h5 style={{ textAlign: "center", marginTop: "0.5rem" }}>
              Loading...
            </h5>
          )}
        </>
      )}
      <SingleExerciseForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        values={values}
        muscleId={muscleId}
        handleRemove={handleSetRemove}
      />
    </Wrapper>
  );
};

export default Exercises;
