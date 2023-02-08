import moment from "moment-timezone";
import { Link } from "react-router-dom";

const Workouts = ({ workouts, id }) => {
  {
    workouts?.map((workoutProperty, index) => {
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
          to={`/singleExercise/${workoutProperty.date}/${id}/${workoutProperty._id}`}
          key={index}
          style={{ backgroundColor: color }}
          className="singleWorkout"
        >
          <b>{dayOfWeek}</b>
          <b>{formattedDate}</b>
        </Link>
      );
    });
  }
};
export default Workouts;
