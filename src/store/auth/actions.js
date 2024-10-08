import {
  STOP_LOADING,
  START_LOADING,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  ADMIN_LOGIN,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILED,
  USER_FLUSH,
  CLEAR_STATE,
} from "./actionTypes";

//login admin action
export const loginAdmin = (data, nav) => {
  return {
    type: ADMIN_LOGIN,
    payload: data,
    nav: nav,
  };
};

export const clearState = () => {
  return {
    type: CLEAR_STATE,
  };
};

//login admin success action
export const loginAdminSuccess = (data) => {
  return {
    type: ADMIN_LOGIN_SUCCESS,
    payload: data,
  };
};

//login admin failed action
export const loginAdminFailed = (data) => {
  return {
    type: ADMIN_LOGIN_FAILED,
    payload: data?.data?.message,
  };
};

//login user action
export const loginUser = (data, nav) => {
  return {
    type: LOGIN,
    payload: data,
    nav: nav,
  };
};

//login user success action
export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};

//login user failed action
export const loginFailed = (data) => {
  return {
    type: LOGIN_FAILED,
    payload: data?.data?.message,
  };
};

//login user action
export const registerUser = (data, nav) => {
  return {
    type: REGISTER,
    payload: data,
    nav: nav,
  };
};

//register user success action
export const registerSuccess = (data) => {
  return {
    type: REGISTER_SUCCESS,
    payload: data,
  };
};

//register user failed action
export const registerFailed = (data) => {
  return {
    type: REGISTER_FAILED,
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

export const userFlush = () => {
  return {
    type: USER_FLUSH,
  };
};
