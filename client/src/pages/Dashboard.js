import { Link } from "react-router-dom";
import { useEffect } from "react";
import bicepsImg from "../assets/images/muscles/biceps.svg";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Dashboard";
import { Loading } from "../components";
import USAFlag from "../assets/images/flags/USA.svg";
import BrazilFlag from "../assets/images/flags/Brazil.svg";

const Dashboard = () => {
  const { getMuscles, muscles, isLoading, language, handleLanguageSwitch } =
    useAppContext();

  const muscleTranslations = {
    biceps: "bíceps",
    triceps: "tríceps",
    chest: "peitoral",
    back: "costas",
    legs: "pernas",
    shoulders: "ombros",
  };
  const getMuscleName = (englishName) => {
    return language === "en" ? englishName : muscleTranslations[englishName];
  };

  useEffect(() => {
    getMuscles();
  }, []);

  {
    JSON.stringify(muscles);
  }

  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <button onClick={handleLanguageSwitch} className="btn languageBtn">
            {language === "en" ? (
              <img src={BrazilFlag} alt="" className="flagImg" />
            ) : (
              <img src={USAFlag} alt="" className="flagImg" />
            )}
            {language === "en" ? "Português" : "English"}
          </button>
          <main className="muscles">
            {muscles.map(({ name: muscle, _id: muscleId }, index) => {
              return (
                <Link
                  to={`/singleMuscle/${muscleId}`}
                  className="singleMuscle"
                  key={index}
                >
                  {getMuscleName(muscle)}
                  <img src={bicepsImg} alt="" />
                </Link>
              );
            })}
          </main>
        </>
      )}
    </Wrapper>
  );
};

export default Dashboard;
