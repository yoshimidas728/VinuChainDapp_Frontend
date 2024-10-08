import {
  STOP_LOADING,
  START_LOADING,
  GET_TRENDING_POSTS,
  GET_TRENDING_POSTS_SUCCESS,
  GET_TRENDING_POSTS_FAILED,
  GET_SINGLE_TRENDING_POSTS,
  GET_SINGLE_TRENDING_POSTS_SUCCESS,
  GET_SINGLE_TRENDING_POSTS_FAILED,
  CLEAR_STATE,
} from "./actionTypes";

//Admin
//get all author post action
export const getTrendingPosts = (data) => {
  return {
    type: GET_TRENDING_POSTS,
    payload: data,
  };
};

export const clearState = () => {
  return {
    type: CLEAR_STATE,
  };
};

export const getSinglePost = (data) => {
  console.log("in action", data);
  return {
    type: GET_SINGLE_TRENDING_POSTS,
    payload: data,
  };
};

//get all author post success action
export const getTrendingPostsSuccess = (data) => {
  return {
    type: GET_TRENDING_POSTS_SUCCESS,
    payload: data,
  };
};

export const getSingleTrendingPostsSuccess = (data) => {
  return {
    type: GET_SINGLE_TRENDING_POSTS_SUCCESS,
    payload: data,
  };
};

//get all author post failed action
export const getSingleTrendingPostsFailed = (data) => {
  return {
    type: GET_SINGLE_TRENDING_POSTS_FAILED,
    payload: data?.data?.message,
  };
};

export const getTrendingPostsFailed = (data) => {
  return {
    type: GET_TRENDING_POSTS_FAILED,
    payload: data?.data?.message,
  };
};

export const startLoading = (data) => ({
  type: START_LOADING,
  payload: data,
});

//stop loading action
export const stopLoading = (data) => ({
  type: STOP_LOADING,
  payload: {
    action: data,
  },
});
