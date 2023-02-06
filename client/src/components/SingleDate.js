import { useParams } from "react-router-dom";
import styled from "styled-components";
import Exercises from "./SingleExercise";

const SingleDate = () => {
  const createdAt = new Date().toISOString();
  const { id } = useParams();

  return <Exercises createdAt={createdAt} id={id} />;
};
export default SingleDate;
