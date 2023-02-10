import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar, Modal, Workouts, Loading } from "../components";
import { AddWorkout } from "../components";
import Wrapper from "../assets/wrappers/SingleMuscle";
import { useAppContext } from "../context/appContext";

const SingleMuscle = () => {
  const { getWorkouts, workouts, isLoading, addWorkout } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState("");
  const { id } = useParams();
  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString("pt-br", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      formatMatcher: "basic",
    });

    const [day, month, year] = formattedDate.split("/");
    const transformedDate = [year, month, day].join("-");

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
    addWorkout({ date, muscleId: id });
    setDate("");
  };

  useEffect(() => {
    getWorkouts({ id });
  }, []);

  if (isLoading)
    return (
      <>
        <Navbar />
        <Loading />
      </>
    );

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
