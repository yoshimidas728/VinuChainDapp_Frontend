import { fork, put, all, takeLatest } from "redux-saga/effects";
import {
  startLoading,
  stopLoading,
  changeTheme,
} from "./actions";
import {
  CHANGE_THEME
} from "./actionTypes";

//Login User Saga

function* changeThemeFunc() {
  yield put(changeTheme());
}


//create post Watcher
function* changeThemeHandler() {
  yield takeLatest(CHANGE_THEME, changeThemeFunc);
}


export default function* postSaga() {
  yield all([
    // fork(changeThemeHandler),
  ]);
}
