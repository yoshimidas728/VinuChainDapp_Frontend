import produce from "immer";
import {
  UPDATE_PROFILE,
  START_LOADING,
  STOP_LOADING,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILED,
  CLEAR_STATE,
} from "./actionTypes";

const initialState = {
  theme: "white",
  isLoading: false,
  profile: {},
  errorMessage: null,
};

const Post = produce((state, action) => {
  switch (action.type) {
    //User

    case CLEAR_STATE:
      return {
        theme: "white",
        isLoading: false,
        profile: {},
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

    case UPDATE_PROFILE_SUCCESS:
      state.profile = action.payload;
      break;

    case UPDATE_PROFILE_FAILED:
      state.errorMessage = action.payload;
      break;

    default:
      break;
  }
}, initialState);

export default Post;
