import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import FormRow from "./FormRow";
import Navbar from "./Navbar";

const initialState = {
  exercise: "",
  reps: "",
  weight: "",
  rir: "",
};

const Exercises = () => {
  const [sets, setSets] = useState([]);
  const [values, setValues] = useState(initialState);
  const { date, muscleId } = useParams();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
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

  if (sets.length === 0) {
    return (
      <>
        <Navbar />
        <Wrapper>
          <h5>No sets to display...</h5>
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
            </div>
          </form>
        </Wrapper>
      </>
    );
  }

  return (
    <Wrapper>
      <Navbar />
      {sets &&
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
        })}
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
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: var(--fluid-width);
  max-width: var(--max-width);
  margin: 0 auto;
  .form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    padding: 0.5rem 0.625rem;
    background-color: #e0e0e0;
  }
  .formWrapper {
    display: flex;
    gap: 1rem;
  }
  .btn {
    width: fit-content;
  }
`;
export default Exercises;
