import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import bicepsImg from "../assets/images/muscles/biceps.svg";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Dashboard";

const Dashboard = () => {
  const { getMuscles, muscles } = useAppContext();

  useEffect(() => {
    getMuscles();
  }, []);

  {
    JSON.stringify(muscles);
  }

  return (
    <Wrapper>
      {muscles.map(({ name: muscle, _id: muscleId }, index) => {
        return (
          <Link
            to={`/singleMuscle/${muscleId}`}
            className="singleMuscle"
            key={index}
          >
            {muscle}
            <img src={bicepsImg} alt="" />
          </Link>
        );
      })}
    </Wrapper>
  );
};

export default Dashboard;
