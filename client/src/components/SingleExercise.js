import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";

const Exercises = () => {
  const [sets, setSets] = useState([]);
  const { date, muscleId } = useParams();

  const getExercises = async () => {
    try {
      const { data } = await axios.get(`/api/v1/exercise/${date}/${muscleId}`);
      const res = data.exercises;
      setSets(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExercises();
  }, []);

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
                  Set {exerciseIndex + 1} : {exerciseProperty.reps} reps,{" "}
                  {exerciseProperty.weight}
                  kg, RIR:{exerciseProperty.rir}
                </div>
              ))}
            </div>
          );
        })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: var(--fluid-width);
  max-width: var(--max-width);
  margin: 0 auto;
`;
export default Exercises;
