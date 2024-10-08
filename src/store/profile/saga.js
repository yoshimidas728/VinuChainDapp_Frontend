import { fork, put, all, takeLatest } from "redux-saga/effects";
import {
  startLoading,
  stopLoading,
  updateProfileSuccess,
  updateProfileFailed,
  clearState,
} from "./actions";
import axios from "../../axios/AxiosConfig";
import { UPDATE_PROFILE, CLEAR_STATE } from "./actionTypes";

//Login User Saga

function* changeProfileSec({ payload }) {
  try {
    yield put(startLoading());
    const response = yield axios.post("/user/updateProfile", payload);
    yield put(updateProfileSuccess(response?.data));
  } catch (error) {
    yield put(updateProfileFailed(error.response));
  } finally {
    yield put(stopLoading());
  }
}

function* clearStateHandler() {
  yield put(clearState());
}

//create post Watcher
function* changeProfileHandler() {
  yield takeLatest(UPDATE_PROFILE, changeProfileSec);
}

function* watchClearState() {
  yield takeLatest(CLEAR_STATE, clearStateHandler);
}

export default function* postSaga() {
  yield all([fork(changeProfileHandler), fork(watchClearState)]);
}
