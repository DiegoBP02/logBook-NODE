import moment from "moment";
import "moment/locale/pt";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const Workouts = ({ workouts, id }) => {
  const { language } = useAppContext();

  if (language === "pt") {
    moment.locale("pt");
  } else {
    moment.locale("en");
  }
  return workouts?.map((workoutProperty, index) => {
    const workoutPropertyDate = workoutProperty.date;
    const momentObject = moment.utc(workoutPropertyDate);
    const formattedDate = momentObject.format("DD/MM/YYYY");
    const dayOfWeek = momentObject.format("dddd");

    return (
      <Link
        to={`/singleExercise/${workoutProperty.date}/${id}/${workoutProperty._id}`}
        key={index}
        className="singleWorkout"
      >
        <b>{dayOfWeek}</b>
        <b>{formattedDate}</b>
      </Link>
    );
  });
};

export default Workouts;
