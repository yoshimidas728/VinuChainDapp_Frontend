import produce from "immer";
import { toast } from "react-hot-toast";
import {
  CREATE_POST_FAILED,
  CREATE_POST_SUCCESS,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILED,
  GET_ALL_AUTHOR_APPROVED_FAILED,
  GET_ALL_AUTHOR_APPROVED_SUCCESS,
  GET_ALL_AUTHOR_FAILED,
  GET_ALL_AUTHOR_PENDING_FAILED,
  GET_ALL_AUTHOR_PENDING_SUCCESS,
  GET_ALL_AUTHOR_POST_FAILED,
  GET_ALL_AUTHOR_POST_SUCCESS,
  GET_ALL_AUTHOR_SUCCESS,
  GET_LIKE_POST_FAILED,
  GET_LIKE_POST_SUCCESS,
  LIKE_POST_FAILED,
  LIKE_POST_SUCCESS,
  START_LOADING,
  STOP_LOADING,
  GET_ALL_POST,
  GET_ALL_POST_FAILED,
  GET_FILTER_POSTS_SUCCESS,
  GET_FILTER_POSTS_FAILED,
  GET_ALL_POST_SUCCESS,
  GET_POST_COMMENTS_SUCCESS,
  GET_POST_COMMENTS_FAILED,
  GET_APPROVAL_POSTS_SUCCESS,
  GET_APPROVAL_POSTS_FAILED,
  CLEAR_STATE,
} from "./actionTypes";

const initialState = {
  authors: null,
  approvalPosts: [],
  isLoading: false,
  likes: null,
  likesDetails:[],
  errorMessage: null,
  comments: [],
  allPosts: [],
  technologyBlogs: [],
  InnovationBlogs: [],
  financeBlogs: [],
  newsBlogs: [],
  tag1Blogs: [],
  artsBlogs: [],
  categoryBlogs: [],
};

const Post = produce((state, action) => {
  switch (action.type) {
    //User

    case CLEAR_STATE:
      return {
        authors: null,
        approvalPosts: [],
        isLoading: false,
        likes: null,
        likesDetails:[],
        errorMessage: null,
        comments: [],
        allPosts: [],
        technologyBlogs: [],
        InnovationBlogs: [],
        financeBlogs: [],
        newsBlogs: [],
        tag1Blogs: [],
        artsBlogs: [],
        categoryBlogs: [],
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

    case GET_APPROVAL_POSTS_SUCCESS:
      // console.log(
      //   "this is the action.payload: GET_APPROVAL_POSTS_SUCCESS: ",
      //   action.payload
      // );
      state.errorMessage = null;
      state.approvalPosts = action?.payload?.data;
      break;

    case GET_APPROVAL_POSTS_FAILED:
      state.errorMessage = action.payload;
      break;

    case GET_FILTER_POSTS_SUCCESS:
      if (action.payload?.tag === "Technology") {
        state.technologyBlogs = action.payload?.data;
        state.categoryBlogs = action.payload?.data;
        break;
      }
      if (action.payload?.tag === "Innovation") {
        state.InnovationBlogs = action.payload?.data;
        state.categoryBlogs = action.payload?.data;
        break;
      }
      if (action.payload?.tag === "Finance") {
        state.financeBlogs = action.payload?.data;
        state.categoryBlogs = action.payload?.data;
        break;
      }
      if (action.payload?.tag === "News") {
        state.newsBlogs = action.payload?.data;
        state.categoryBlogs = action.payload?.data;
        break;
      }
      if (action.payload?.tag === "Arts") {
        state.artsBlogs = action.payload?.data;
        state.categoryBlogs = action.payload?.data;
        break;
      }
      if (action.payload?.tag === "Travel") {
        state.tag1Blogs = action.payload?.data;
        state.categoryBlogs = action.payload?.data;
        break;
      }

      state.categoryBlogs = action.payload?.data;
      break;

    case GET_ALL_POST_SUCCESS:
      // console.log("this is the action.payload: ", { payload: action.payload });
      state.errorMessage = null;
      state.allPosts = action?.payload?.post;
      break;

    case GET_ALL_POST_FAILED:
      state.errorMessage = action.payload;
      break;

    case GET_FILTER_POSTS_FAILED:
      state.errorMessage = action.payload;
      break;

    case CREATE_POST_SUCCESS:
      // console.log("action.payload", action.payload);
      toast.success("Successfully Created Post");
      state.errorMessage = null;
      break;

    case GET_POST_COMMENTS_SUCCESS:
      toast.success(" Successfully");
      state.comments = action?.payload?.data?.comment;
      break;

    case GET_POST_COMMENTS_FAILED:
      state.errorMessage = action.payload;

      break;

    case CREATE_COMMENT_SUCCESS:
      // console.log("action.payload", action.payload);
      toast.success("Comment Added Successfully");
      state.errorMessage = null;
      break;

    case CREATE_COMMENT_FAILED:
      if (action?.payload?.data?.data?.message === "Token Not Valid") {
        toast.error("Please Log In First");
      }
      state.errorMessage = action.payload;
      break;

    case CREATE_POST_FAILED:
      state.errorMessage = action.payload;
      break;

    case LIKE_POST_SUCCESS:
      // console.log("action.payload", action.payload);
      toast.success(" Successfully");
      state.errorMessage = null;
      break;

    case LIKE_POST_FAILED:
      state.errorMessage = action.payload;
      break;

    case GET_LIKE_POST_SUCCESS:
      state.likes = action?.payload?.data?.like?.length;
      state.likesDetails = action?.payload?.data?.like;

      state.errorMessage = null;
      break;

    case GET_LIKE_POST_FAILED:
      state.errorMessage = action.payload;
      break;
    //ADMIN
    case GET_ALL_AUTHOR_POST_SUCCESS:
      // console.log("action.payload", action.payload);
      state.errorMessage = null;
      break;

    case GET_ALL_AUTHOR_POST_FAILED:
      state.errorMessage = action.payload;
      break;

    case GET_ALL_AUTHOR_SUCCESS:
      // console.log("action.payload", action.payload);
      state.authors = action.payload.data.getAllauthors;
      state.errorMessage = null;
      break;

    case GET_ALL_AUTHOR_FAILED:
      state.errorMessage = action.payload;
      break;

    case GET_ALL_AUTHOR_PENDING_SUCCESS:
      // console.log("action.payload", action.payload.data.getAllauthors);
      state.authors = action.payload.data.getAllauthors;
      state.errorMessage = null;
      break;

    case GET_ALL_AUTHOR_PENDING_FAILED:
      state.errorMessage = action.payload;
      break;

    default:
      break;
  }
}, initialState);

export default Post;
