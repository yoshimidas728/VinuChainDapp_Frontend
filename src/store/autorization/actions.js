import {
  STOP_LOADING,
  START_LOADING,
  AUTHOR_APPROVED,
  AUTHOR_APPROVED_SUCCESS,
  AUTHOR_APPROVED_FAILED,
  BECOME_AUTHOR,
  BECOME_AUTHOR_SUCCESS,
  BECOME_AUTHOR_FAILED,
  BLOCK_AUTHOR,
  BLOCK_AUTHOR_SUCCESS,
  BLOCK_AUTHOR_FAILED,
  POST_APPROVED,
  POST_APPROVED_SUCCESS,
  POST_APPROVED_FAILED,
} from "./actionTypes";

//Admin
//author approved action
export const approveAuthor = (data) => {
  return {
    type: AUTHOR_APPROVED,
    payload: data,
  };
};

export const approvePost = (data) => {
  return {
    type: POST_APPROVED,
    payload: data,
  };
};

export const approvePostSuccess = (data) => {
  return {
    type: POST_APPROVED_SUCCESS,
    payload: data,
  };
};

export const approvePostFailed = (data) => {
  return {
    type: POST_APPROVED_FAILED,
    payload: data,
  };
};

//author approved success action
export const approveAuthorSuccess = (data) => {
  return {
    type: AUTHOR_APPROVED_SUCCESS,
    payload: data?.data?.message,
  };
};

//author approved failed action
export const approveAuthorFailed = (data) => {
  return {
    type: AUTHOR_APPROVED_FAILED,
    payload: data?.data?.message,
  };
};

export const blockAuthor = (data) => {
  return {
    type: BLOCK_AUTHOR,
    payload: data,
  };
};

//author blockd success action
export const blockAuthorSuccess = (data) => {
  return {
    type: BLOCK_AUTHOR_SUCCESS,
    payload: data,
  };
};

//author blockd failed action
export const blockAuthorFailed = (data) => {
  return {
    type: BLOCK_AUTHOR_FAILED,
    payload: data?.data?.message,
  };
};

export const becomeAuthor = (data) => {
  return {
    type: BECOME_AUTHOR,
    payload: data,
  };
};

//author becomed success action
export const becomeAuthorSuccess = (data) => {
  return {
    type: BECOME_AUTHOR_SUCCESS,
    payload: data,
  };
};

//author becomed failed action
export const becomeAuthorFailed = (data) => {
  return {
    type: BECOME_AUTHOR_FAILED,
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
