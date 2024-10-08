import produce from "immer";
import { toast } from "react-hot-toast";
import {
  START_LOADING,
  STOP_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILED,
  USER_FLUSH,
  CLEAR_STATE,
} from "./actionTypes";

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  errorMessage: null,
};

const Auth = produce((state, action) => {
  switch (action.type) {
    case CLEAR_STATE:
      return {
        user: null,
        token: null,
        isLoading: false,
        errorMessage: null,
      };
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case STOP_LOADING:
      return {
        ...state,
        isLoading: false,
      };

    case USER_FLUSH:
      state.user = null;
      state.token = null;
      break;

    case ADMIN_LOGIN_SUCCESS:
      console.log("action.payload", action.payload);
      localStorage.setItem("token", action.payload.data.token);
      localStorage.setItem("role", action.payload.data.user.role);
      toast.success("Loggedin Successfully");
      state.user = action.payload.data.user;
      state.errorMessage = null;
      break;

    case ADMIN_LOGIN_FAILED:
      state.errorMessage = action.payload;
      break;

    case LOGIN_SUCCESS:
      console.log("action.payload", action.payload);
      localStorage.setItem("token", action.payload.data.token);
      localStorage.setItem("role", action.payload.data.user.role);
      localStorage.setItem("id", action.payload.data.user.id);
      toast.success("Loggedin Successfully");
      state.user = action.payload.data.user;
      state.errorMessage = null;
      break;

    case LOGIN_FAILED:
      state.errorMessage = action.payload;
      break;
    case REGISTER_SUCCESS:
      console.log("action.payload", action.payload);
      toast.success("Signup Successfully");

      break;
    case REGISTER_FAILED:
      state.errorMessage = action.payload;
      break;

    default:
      break;
  }
}, initialState);

export default Auth;
