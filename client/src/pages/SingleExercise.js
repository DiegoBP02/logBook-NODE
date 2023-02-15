import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Wrapper from "../assets/wrappers/SingleExercise";
import { useAppContext } from "../context/appContext";
import { Navbar, SingleExerciseForm, Loading } from "../components";

const initialState = {
  exercise: "",
  reps: "",
  weight: "",
  rir: "",
};

const Exercises = () => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const { date, muscleId, workoutId } = useParams();
  const {
    getExercises,
    sets,
    addSet,
    isLoading,
    handleRemove,
    getWorkouts,
    authFetch,
    language,
  } = useAppContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSetRemove = () => {
    handleRemove({ workoutId, muscleId, date });
    getWorkouts({ id: muscleId });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      date,
      muscleId,
      exercise: values.exercise,
      sets: [
        {
          reps: values.reps,
          weight: values.weight,
          rir: values.rir,
        },
      ],
    };

    addSet({ data, date, muscleId });
  };

  const handleExerciseRemove = async (id) => {
    try {
      await authFetch.delete(`/exercise/${id}`);
      getExercises({ date, muscleId });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await getExercises({ date, muscleId });
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <Wrapper>
        <Navbar />
        <Loading />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Navbar />
      <Link to="/" className="btn" style={{ margin: "0.5rem 0 1.5rem 0" }}>
        {language === "en" ? "Back Home" : "Voltar ao menu principal"}
      </Link>
      {sets.length === 0 ? (
        <h5>
          {language === "en"
            ? "No sets to display..."
            : "Nenhuma série adicionada..."}
        </h5>
      ) : (
        <>
          <article
            className="properties marginBottom"
            style={{ paddingBottom: "1rem" }}
          >
            <p>{language === "en" ? "Set" : "Série"}</p>
            <p>{language === "en" ? "Exercise" : "Exercício"}</p>
            <p>{language === "en" ? "Reps" : "Repetições"}</p>
            <p>{language === "en" ? "Weight" : "Peso"}</p>
            <p>RIR</p>
          </article>
          {sets &&
            sets.length > 0 &&
            sets.map((set, exerciseIndex) => {
              return (
                <div key={exerciseIndex}>
                  {set.sets.map((exerciseProperty, setIndex) => (
                    <div key={setIndex} className="properties">
                      <p>{exerciseIndex + 1}</p>
                      <p>{set.exercise}</p>
                      <p>{exerciseProperty.reps}</p>
                      <p>{exerciseProperty.weight}</p>
                      <p>{exerciseProperty.rir}</p>
                      <p
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => handleExerciseRemove(set._id)}
                      >
                        X
                      </p>
                    </div>
                  ))}
                </div>
              );
            })}
          {isLoading && (
            <h5 style={{ textAlign: "center", marginTop: "0.5rem" }}>
              {language === "en" ? "Loading..." : "Carregando"}
            </h5>
          )}
        </>
      )}
      <SingleExerciseForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        values={values}
        muscleId={muscleId}
        handleRemove={handleSetRemove}
      />
    </Wrapper>
  );
};

export default Exercises;
