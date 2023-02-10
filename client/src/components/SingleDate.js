import { useParams } from "react-router-dom";
import Exercises from "../pages/SingleExercise";

const SingleDate = () => {
  const createdAt = new Date().toISOString();
  const { id } = useParams();

  return <Exercises createdAt={createdAt} id={id} />;
};
export default SingleDate;
