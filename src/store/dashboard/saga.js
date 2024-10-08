import axios from "../../axios/AxiosConfig";
import { fork, put, all, takeLatest } from "redux-saga/effects";
import {
  startLoading,
  stopLoading,
  getOwnPostSuccess,
  getOwnPostFailed,
  deleteOwnPostSuccess,
  deleteOwnPostFailed,
  editOwnPostSuccess,
  editOwnPostFailed,
  clearState,
} from "./actions";
import {
  GET_OWN_BLOGS,
  DELETE_OWN_BLOGS,
  EDIT_OWN_BLOGS,
  CLEAR_STATE,
} from "./actionTypes";

//Login User Saga

function* getOwnPostApiHandler({ payload, nav }) {
  try {
    console.log("this runs up man");
    yield put(startLoading());
    const response = yield axios.get("/user/getBlogs");
    console.log("this is the response: ", response?.data);
    yield put(getOwnPostSuccess(response.data));
  } catch (error) {
    yield put(getOwnPostFailed(error.response));
  } finally {
    yield put(stopLoading());
  }
}

function* deleteOwnPostApiHandler({ payload, nav }) {
  try {
    console.log("this runs up man");
    yield put(startLoading());
    const response = yield axios.delete(
      `/user/deletePost?postId=${payload.id}`
    );
    console.log("this is the response: ", response?.data);
    yield put(deleteOwnPostSuccess(response.data));
  } catch (error) {
    yield put(deleteOwnPostFailed(error.response));
  } finally {
    yield put(stopLoading());
  }
}

function* clearStateHandler() {
  yield put(clearState());
}

function* editOwnPostApiHandler({ payload, nav }) {
  try {
    yield put(startLoading());
    const response = yield axios.post(`/user/editPost`, payload);
    yield put(editOwnPostSuccess(response?.data));
  } catch (error) {
    yield put(editOwnPostFailed(error.response));
  } finally {
    yield put(stopLoading());
  }
}

function* getOwnPostWatcher() {
  yield takeLatest(GET_OWN_BLOGS, getOwnPostApiHandler);
}

function* deleteOwnPostWatcher() {
  yield takeLatest(DELETE_OWN_BLOGS, deleteOwnPostApiHandler);
}

function* editOwnPostWatcher() {
  yield takeLatest(EDIT_OWN_BLOGS, editOwnPostApiHandler);
}

function* watchClearState() {
  yield takeLatest(CLEAR_STATE, clearStateHandler);
}

export default function* postSaga() {
  yield all([
    fork(getOwnPostWatcher),
    fork(deleteOwnPostWatcher),
    fork(editOwnPostWatcher),
    fork(watchClearState),
  ]);
}
