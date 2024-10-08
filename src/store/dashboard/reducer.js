import produce from "immer";
import {
  GET_OWN_BLOGS_SUCCESS,
  GET_OWN_BLOGS_FAILED,
  DELETE_OWN_BLOGS_SUCCESS,
  DELETE_OWN_BLOGS_FAILED,
  EDIT_OWN_BLOGS_FAILED,
  EDIT_OWN_BLOGS_SUCCESS,
  START_LOADING,
  STOP_LOADING,
  CLEAR_STATE,
} from "./actionTypes";
import { toast } from "react-hot-toast";

const initialState = {
  blogs: [],
  errorMessage: "",
  editPostId: 0,
};

const Dashboard = produce((state, action) => {
  switch (action.type) {
    //User

    case CLEAR_STATE:
      return {
        blogs: [],
        errorMessage: "",
        editPostId: 0,
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

    case GET_OWN_BLOGS_SUCCESS:
      console.log("this is the action.payload: ", { payload: action.payload });
      state.errorMessage = null;
      state.blogs = action?.payload;
      break;

    case DELETE_OWN_BLOGS_SUCCESS:
      console.log("Blog delete");
      toast.success("Blog deleted Successfully");
      break;

    case DELETE_OWN_BLOGS_FAILED:
      state.errorMessage = action.payload;
      break;

    case EDIT_OWN_BLOGS_SUCCESS:
      console.log("Blog delete");
      toast.success("Blog deleted Successfully");
      state.editPostId = action?.payload;
      break;

    case EDIT_OWN_BLOGS_FAILED:
      state.errorMessage = action.payload;
      break;

    case GET_OWN_BLOGS_FAILED:
      state.errorMessage = action.payload;
      break;

    default:
      break;
  }
}, initialState);

export default Dashboard;
