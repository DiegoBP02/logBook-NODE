import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Wrapper from "../assets/wrappers/SingleExercise";
import FormRow from "./FormRow";
import Navbar from "./Navbar";
import SingleExerciseForm from "./SingleExerciseForm";

const initialState = {
  exercise: "",
  reps: "",
  weight: "",
  rir: "",
};

const Exercises = () => {
  const [sets, setSets] = useState([]);
  const [values, setValues] = useState(initialState);
  const { date, muscleId, workoutId } = useParams();

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

  const getExercises = async () => {
    try {
      const { data } = await axios.get(`/api/v1/exercise/${date}/${muscleId}`);
      const res = data.exercises;
      setSets(res);
    } catch (error) {
      console.log(error);
    }
  };

  const addSet = async () => {
    try {
      const setData = {
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
      await axios.post(`/api/v1/exercise`, setData);
      getExercises();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addSet();
  };

  useEffect(() => {
    getExercises();
  }, []);

  return (
    <Wrapper>
      <Navbar />
      {sets.length === 0 ? (
        <h4>No jobs to display ...</h4>
      ) : (
        sets &&
        sets.length > 0 &&
        sets.map((set, exerciseIndex) => {
          return (
            <div key={exerciseIndex}>
              {set.sets.map((exerciseProperty, setIndex) => (
                <div key={setIndex}>
                  {exerciseIndex + 1}: {set.exercise} : {exerciseProperty.reps}{" "}
                  reps, {exerciseProperty.weight}
                  kg, RIR:{exerciseProperty.rir}
                </div>
              ))}
            </div>
          );
        })
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
