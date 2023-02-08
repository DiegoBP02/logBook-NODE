import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Wrapper from "../assets/wrappers/SingleExercise";
import { useAppContext } from "../context/appContext";
import FormRow from "./FormRow";
import Navbar from "./Navbar";
import SingleExerciseForm from "./SingleExerciseForm";
import { Loading } from "../components";

const initialState = {
  exercise: "",
  reps: "",
  weight: "",
  rir: "",
};

const Exercises = () => {
  const [values, setValues] = useState(initialState);
  const { date, muscleId, workoutId } = useParams();
  const { getExercises, sets, addSet, isLoading, exerciseLoading } =
    useAppContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleRemove = async () => {
    try {
      await axios.delete(`/api/v1/workout/${workoutId}/${muscleId}/${date}`);
    } catch (error) {
      console.log(error);
    }
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

  if (exerciseLoading)
    return (
      <>
        <Navbar />
        <Loading />
      </>
    );

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
        handleRemove={handleRemove}
      />
    </Wrapper>
  );
};

export default Exercises;
