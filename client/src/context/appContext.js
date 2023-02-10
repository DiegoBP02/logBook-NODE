import React, { useEffect, useReducer, useContext } from "react";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  GET_MUSCLES_BEGIN,
  GET_MUSCLES_SUCCESS,
  GET_MUSCLES_ERROR,
  GET_WORKOUTS_BEGIN,
  GET_WORKOUTS_SUCCESS,
  GET_WORKOUTS_ERROR,
  ADD_WORKOUT_BEGIN,
  ADD_WORKOUT_SUCCESS,
  ADD_WORKOUT_ERROR,
  GET_EXERCISES_BEGIN,
  GET_EXERCISES_SUCCESS,
  GET_EXERCISES_ERROR,
  ADD_SET_BEGIN,
  ADD_SET_SUCCESS,
  ADD_SET_ERROR,
  REMOVE_SET_BEGIN,
  REMOVE_SET_SUCCESS,
  REMOVE_SET_ERROR,
} from "./actions";
import reducer from "./reducer";
import axios from "axios";

export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: null,
  muscles: [],
  userLoading: false,
  workouts: [],
  sets: [],
};

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        console.log("Unauthorized error!");
        // logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const response = await authFetch.post(`/auth/${endPoint}`, currentUser);
      const { user } = response.data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          alertText,
        },
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });
    try {
      const { data } = await authFetch("/auth/getCurrentUser");
      const { user } = data;

      dispatch({ type: GET_CURRENT_USER_SUCCESS, payload: { user } });
    } catch (error) {
      if (error.response.status === 401) return;
      logoutUser();
    }
  };

  const getMuscles = async () => {
    dispatch({ type: GET_MUSCLES_BEGIN });
    try {
      const { data } = await authFetch.get("/muscle");
      const musclesData = data.muscles.map(({ name, _id }) => ({ name, _id }));
      dispatch({
        type: GET_MUSCLES_SUCCESS,
        payload: musclesData,
      });
    } catch (error) {
      dispatch({
        type: GET_MUSCLES_ERROR,
        payload: { msg: error.response.data.msg },
      });
      console.log(error);
    }
  };

  const logoutUser = async () => {
    await authFetch("/auth/logout");
    dispatch({ type: LOGOUT_USER });
  };

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const getWorkouts = async ({ id }) => {
    dispatch({ type: GET_WORKOUTS_BEGIN });
    try {
      const { data } = await authFetch.get(`/workout/${id}`);
      dispatch({ type: GET_WORKOUTS_SUCCESS, payload: data.workouts });
    } catch (error) {
      dispatch({
        type: GET_WORKOUTS_ERROR,
        payload: { msg: error.response.data.msg },
      });
      console.log(error);
    }
  };

  const addWorkout = async ({ date, muscleId }) => {
    dispatch({ type: ADD_WORKOUT_BEGIN });
    try {
      await authFetch.post(`/workout`, { date, muscleId });
      dispatch({ type: ADD_WORKOUT_SUCCESS });
      await getWorkouts({ id: muscleId });
    } catch (error) {
      dispatch({
        type: ADD_WORKOUT_ERROR,
        payload: { msg: error.response.data.msg },
      });
      console.log(error);
    }
  };

  const getExercises = async ({ date, muscleId }) => {
    dispatch({ type: GET_EXERCISES_BEGIN });
    try {
      const { data } = await authFetch.get(`/exercise/${date}/${muscleId}`);
      dispatch({ type: GET_EXERCISES_SUCCESS, payload: data.exercises });
    } catch (error) {
      dispatch({
        type: GET_EXERCISES_ERROR,
        payload: { msg: error.response.data.msg },
      });
      console.log(error);
    }
  };

  const addSet = async ({ data, date, muscleId }) => {
    dispatch({ type: ADD_SET_BEGIN });
    try {
      await authFetch.post(`/exercise`, data);
      dispatch({ type: ADD_SET_SUCCESS });
      await getExercises({ date, muscleId });
    } catch (error) {
      dispatch({
        type: ADD_SET_ERROR,
        payload: { msg: error.response.data.msg },
      });
      console.log(error);
    }
  };

  const handleRemove = async ({ workoutId, muscleId, date }) => {
    try {
      await authFetch.delete(`/workout/${workoutId}/${muscleId}/${date}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        logoutUser,
        getMuscles,
        getWorkouts,
        addWorkout,
        getExercises,
        addSet,
        handleRemove,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
