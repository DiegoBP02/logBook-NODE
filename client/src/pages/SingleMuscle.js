import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { AddWorkout } from "../components";
import moment from "moment-timezone";

const SingleMuscle = () => {
  const [workouts, setWorkouts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState("");
  const { id } = useParams();
  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC",
      formatMatcher: "basic",
    });

    const [day, month, year] = formattedDate.split("/");
    const transformedDate = [year, day, month].join("-");

    setSelected(!selected);
    setDate(transformedDate);
  };

  const handleClick = () => {
    setShowModal(!showModal);
  };

  const handleChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleClick();
    addWorkout();
  };

  const addWorkout = async () => {
    try {
      await axios.post(`/api/v1/workout`, { date, muscleId: id });
      setDate("");
      getWorkouts();
    } catch (error) {
      console.log(error);
    }
  };

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
        {workouts?.map((workoutProperty, index) => {
          const workoutPropertyDate = workoutProperty.date;
          const momentObject = moment.utc(workoutPropertyDate);
          const formattedDate = momentObject.format("DD/MM/YYYY");
          const day = momentObject.date();
          const dayOfWeek = momentObject.format("dddd");
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
              className="singleWorkout"
            >
              <b>{dayOfWeek}</b>
              <b>{formattedDate}</b>
            </Link>
          );
        })}
        <AddWorkout handleClick={handleClick} />
      </Wrapper>
      {showModal && (
        <Modal>
          <form onSubmit={handleSubmit}>
            <div className="formWrapper">
              <h5>Add New Workout</h5>
              <button
                type="button"
                onClick={handleClick}
                className="btn closeButton"
              >
                X
              </button>
              <input
                type="date"
                name="date"
                id="date"
                className="form-input dateInput"
                onChange={(e) => handleChange(e)}
              ></input>

              <div className="checkboxWrapper">
                <input
                  type="checkbox"
                  name="currentDate"
                  id="currentDate"
                  checked={selected}
                  onChange={handleSelect}
                />
                <label htmlFor="currentDate">Current Date</label>
              </div>

              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </Modal>
      )}
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
  .singleWorkout {
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
  .addWorkout {
    background-color: #888888;
    border: 3px solid #000000;
  }
  .addWorkout b {
    font-size: 3rem;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
  transition: var(--transition);
  .formWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #dfdfdf;
    padding: 2rem;
    border-radius: 1rem;
    gap: 1rem;
    position: relative;
  }
  .formWrapper h5 {
    margin-bottom: 0;
  }
  .closeButton {
    align-self: flex-end;
    background: none;
    box-shadow: none;
    color: red;
    font-weight: 900;
    position: absolute;
    top: 0.375rem;
    right: 0.375rem;
  }
  .dateInput:focus {
    outline: none;
    border: 1.5px solid #000;
  }
  .title {
    display: flex;
  }
  .checkboxWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .checkboxWrapper input {
    margin-right: 0.25rem;
  }
`;
export default SingleMuscle;
