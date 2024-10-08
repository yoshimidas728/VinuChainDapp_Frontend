import {
  STOP_LOADING,
  START_LOADING,
  GET_OWN_BLOGS,
  GET_OWN_BLOGS_SUCCESS,
  GET_OWN_BLOGS_FAILED,
  DELETE_OWN_BLOGS,
  DELETE_OWN_BLOGS_SUCCESS,
  DELETE_OWN_BLOGS_FAILED,
  EDIT_OWN_BLOGS,
  EDIT_OWN_BLOGS_FAILED,
  EDIT_OWN_BLOGS_SUCCESS,
  CLEAR_STATE,
} from "./actionTypes";

//Admin
//get all author post action
export const getOwnPost = (data, nav) => {
  return {
    type: GET_OWN_BLOGS,
    payload: data,
    nav: nav,
  };
};

//get all author post success action
export const getOwnPostSuccess = (data) => {
  return {
    type: GET_OWN_BLOGS_SUCCESS,
    payload: data?.data,
  };
};

//get all author post failed action
export const getOwnPostFailed = (data) => {
  return {
    type: GET_OWN_BLOGS_FAILED,
    payload: data?.data?.message,
  };
};

export const deleteOwnPost = (data, nav) => {
  return {
    type: DELETE_OWN_BLOGS,
    payload: data,
    nav: nav,
  };
};

//get all author post success action
export const deleteOwnPostSuccess = (data) => {
  return {
    type: DELETE_OWN_BLOGS_SUCCESS,
    payload: data?.data,
  };
};

//get all author post failed action
export const deleteOwnPostFailed = (data) => {
  return {
    type: DELETE_OWN_BLOGS_FAILED,
    payload: data?.data?.message,
  };
};

export const editOwnPost = (data, nav) => {
  return {
    type: EDIT_OWN_BLOGS,
    payload: data,
    nav: nav,
  };
};

export const clearState = () => {
  return {
    type: CLEAR_STATE,
  };
};

//get all author post success action
export const editOwnPostSuccess = (data) => {
  return {
    type: EDIT_OWN_BLOGS_SUCCESS,
    payload: data?.id,
  };
};

//get all author post failed action
export const editOwnPostFailed = (data) => {
  return {
    type: EDIT_OWN_BLOGS_FAILED,
    payload: data?.data?.message,
  };
};

//start loading action
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
