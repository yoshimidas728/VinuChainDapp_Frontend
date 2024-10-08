import {
  STOP_LOADING,
  START_LOADING,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILED,
  CLEAR_STATE,
} from "./actionTypes";

//Admin
//get all author post action
export const updateProfile = (data) => {
  return {
    type: UPDATE_PROFILE,
    payload: data,
  };
};

export const clearState = () => {
  return {
    type: CLEAR_STATE,
  };
};

export const updateProfileSuccess = (data) => {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    payload: data,
  };
};

export const updateProfileFailed = (data) => {
  return {
    type: UPDATE_PROFILE_FAILED,
    payload: data,
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
