import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import SingleDate from "../components/SingleDate";

const SingleMuscle = () => {
  const [workouts, setWorkouts] = useState([]);
  const { id } = useParams();

  const getWorkouts = async () => {
    try {
      const { data } = await axios.get(`/api/v1/workout/${id}`);
      setWorkouts(data.workouts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWorkouts();
  }, []);
  return (
    <>
      <Navbar />
      <Wrapper>
        {workouts.map((workoutProperty, index) => {
          const daysOfWeek = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          const date = new Date(workoutProperty.date);
          const options = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          };
          const formattedDate = date
            .toLocaleDateString("en-GB", options)
            .replace(/-/g, "/");
          const day = date.getDay();
          const dayOfWeek = daysOfWeek[date.getDay()];
          let color = "";
          switch (day) {
            case 0:
              color = "#606060";
              break;
            case 1:
              color = "#707070 ";
              break;
            case 2:
              color = "#808080";
              break;
            case 3:
              color = "#909090";
              break;
            case 4:
              color = "#A0A0A0";
              break;
            case 5:
              color = "#B0B0B0";
              break;
            case 6:
              color = "#C0C0C0";
              break;
            default:
              color = "#000000";
          }
          return (
            <Link
              to={`/singleExercise/${workoutProperty.date}/${id}`}
              key={index}
              style={{ backgroundColor: color }}
              className="singleDate"
            >
              <b>{dayOfWeek}</b>
              <b>{formattedDate}</b>
            </Link>
          );
        })}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: var(--fluid-width);
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 1rem;
  margin-top: 4rem;
  .singleDate {
    height: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: var(--borderRadius);
    flex-direction: column;
    cursor: pointer;
    text-decoration: none;
  }
`;
export default SingleMuscle;
