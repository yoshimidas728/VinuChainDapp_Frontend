import produce from "immer";
import { CHANGE_THEME, START_LOADING, STOP_LOADING } from "./actionTypes";

const initialState = {
  theme: "white",
  isLoading: false,
  errorMessage: null,
};

const Post = produce((state, action) => {
  switch (action.type) {
    //User
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

    case CHANGE_THEME:
      state.theme = state.theme === "white" ? "black" : "white";
      break;

    default:
      break;
  }
}, initialState);

export default Post;
