import produce from "immer";
import {
  GET_TRENDING_POSTS_SUCCESS,
  GET_TRENDING_POSTS_FAILED,
  GET_SINGLE_TRENDING_POSTS_SUCCESS,
  GET_SINGLE_TRENDING_POSTS_FAILED,
  START_LOADING,
  STOP_LOADING,
  CLEAR_STATE,
} from "./actionTypes";

const initialState = {
  trending_blogs: [],
  single_trending_post: {},
  single_trending_post_related_posts: [],
  isLoading: false,
  errorMessage: null,
};

const Post = produce((state, action) => {
  switch (action.type) {
    //User

    case CLEAR_STATE:
      return {
        trending_blogs: [],
        single_trending_post: {},
        single_trending_post_related_posts: [],
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

    case GET_TRENDING_POSTS_FAILED:
      state.errorMessage = action.payload;
      break;

    case GET_SINGLE_TRENDING_POSTS_FAILED:
      state.errorMessage = action.payload;
      state.single_trending_post = {};
      break;

    case GET_TRENDING_POSTS_SUCCESS:
      // console.log("action.payload", action.payload);
      state.trending_blogs = action.payload.data;
      state.errorMessage = null;
      break;

    case GET_SINGLE_TRENDING_POSTS_SUCCESS:
      // console.log("action.payload for getting single post: ", action.payload);
      state.single_trending_post = action?.payload?.data?.post;
      state.single_trending_post_related_posts = action?.payload?.data?.relatedPosts;
      state.errorMessage = null;
      break;

    default:
      break;
  }
}, initialState);

export default Post;
