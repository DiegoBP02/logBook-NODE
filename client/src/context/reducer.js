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
} from "./actions";
import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values!",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  if (action.type === SETUP_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      userLoading: false,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_CURRENT_USER_BEGIN) {
    return {
      ...state,
      userLoading: true,
      showAlert: false,
    };
  }
  if (action.type === GET_CURRENT_USER_SUCCESS) {
    return {
      ...state,
      userLoading: false,
      user: action.payload.user,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      userLoading: false,
    };
  }
  if (action.type === GET_MUSCLES_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === GET_MUSCLES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      muscles: action.payload,
    };
  }
  if (action.type === GET_MUSCLES_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_WORKOUTS_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === GET_WORKOUTS_SUCCESS) {
    return { ...state, isLoading: false, workouts: action.payload };
  }
  if (action.type === GET_WORKOUTS_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === ADD_WORKOUT_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === ADD_WORKOUT_SUCCESS) {
    return { ...state, isLoading: false };
  }
  if (action.type === ADD_WORKOUT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_EXERCISES_BEGIN) {
    return {
      ...state,
      exerciseLoading: true,
    };
  }
  if (action.type === GET_EXERCISES_SUCCESS) {
    return {
      ...state,
      exerciseLoading: false,
      sets: action.payload,
    };
  }
  if (action.type === GET_EXERCISES_ERROR) {
    return {
      ...state,
      exerciseLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === ADD_SET_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === ADD_SET_SUCCESS) {
    return { ...state, isLoading: false };
  }
  if (action.type === ADD_SET_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
