import produce from "immer";
import { toast } from "react-hot-toast";
import {
  START_LOADING,
  STOP_LOADING,
  AUTHOR_APPROVED_SUCCESS,
  AUTHOR_APPROVED_FAILED,
  BECOME_AUTHOR_SUCCESS,
  BECOME_AUTHOR_FAILED,
  BLOCK_AUTHOR_SUCCESS,
  BLOCK_AUTHOR_FAILED,
  POST_APPROVED_SUCCESS,
  POST_APPROVED_FAILED,
} from "./actionTypes";

const initialState = {
  authors: null,
  isLoading: false,
  errorMessage: null,
};

const Authorize = produce((state, action) => {
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

    case POST_APPROVED_SUCCESS:
      if (action.payload?.success) {
        toast.success("Post approved!");
      }
      break;

    case POST_APPROVED_FAILED:
      state.errorMessage = action.payload;
      break;
    case AUTHOR_APPROVED_SUCCESS:
      console.log("action.payload", action.payload);
      toast.success(" Successfully");
      state.errorMessage = null;
      break;

    case AUTHOR_APPROVED_FAILED:
      state.errorMessage = action.payload;
      break;

    case BLOCK_AUTHOR_SUCCESS:
      console.log("action.payload", action.payload);
      toast.success(" Successfully");
      state.errorMessage = null;
      break;

    case BLOCK_AUTHOR_FAILED:
      state.errorMessage = action.payload;
      break;

    case BECOME_AUTHOR_SUCCESS:
      console.log("action.payload", action.payload);
      toast.success(action.payload.message);
      state.errorMessage = null;
      break;

    case BECOME_AUTHOR_FAILED:
      state.errorMessage = action.payload;
      break;

    default:
      break;
  }
}, initialState);

export default Authorize;
