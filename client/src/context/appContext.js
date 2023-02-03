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
} from "./actions";
import reducer from "./reducer";
import axios from "axios";

export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: null,
  // muscles
  muscles: [],
  // get current user
  userLoading: false,
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
      const { data } = await axios.get("/api/v1/muscle");
      const musclesData = data.muscles.map(({ name, _id }) => ({ name, _id }));
      dispatch({
        type: GET_MUSCLES_SUCCESS,
        payload: musclesData,
      });
    } catch (error) {
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

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AppContext.Provider
      value={{ ...state, displayAlert, setupUser, logoutUser, getMuscles }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
