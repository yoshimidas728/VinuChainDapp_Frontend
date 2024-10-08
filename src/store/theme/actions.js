import {
  STOP_LOADING,
  START_LOADING,
  CHANGE_THEME
} from "./actionTypes";

//Admin
//get all author post action
export const changeTheme = () => {
  return {
    type: CHANGE_THEME,
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
