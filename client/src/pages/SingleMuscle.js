import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar, Modal, Workouts } from "../components";
import { AddWorkout } from "../components";
import Wrapper from "../assets/wrappers/SingleMuscle";

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
        <Workouts workouts={workouts} id={id} />
        <AddWorkout handleClick={handleClick} />
      </Wrapper>
      {showModal && (
        <Modal
          handleSubmit={handleSubmit}
          handleClick={handleClick}
          handleChange={handleChange}
          selected={selected}
          handleSelect={handleSelect}
        />
      )}
    </>
  );
};

export default SingleMuscle;
