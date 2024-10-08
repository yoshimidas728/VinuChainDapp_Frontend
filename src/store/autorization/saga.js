import axios from "../../axios/AxiosConfig";
import { fork, put, all, takeLatest } from "redux-saga/effects";
import {
  approveAuthorSuccess,
  approveAuthorFailed,
  startLoading,
  stopLoading,
  becomeAuthorSuccess,
  becomeAuthorFailed,
  blockAuthorSuccess,
  blockAuthorFailed,
  approvePostSuccess,
  approvePostFailed,
} from "./actions";
import {
  AUTHOR_APPROVED,
  BECOME_AUTHOR,
  BLOCK_AUTHOR,
  POST_APPROVED,
} from "./actionTypes";

//Login User Saga

function* approveAuthor({ payload }) {
  try {
    yield put(startLoading());
    const response = yield axios.post("/admin/author/approve", payload);
    yield put(approveAuthorSuccess(response.data));
  } catch (error) {
    yield put(approveAuthorFailed(error.response));
  } finally {
    yield put(stopLoading());
  }
}

function* approvePost({ payload }) {
  try {
    yield put(startLoading());
    const response = yield axios.post("/admin/author/approvePost", payload);
    yield put(approvePostSuccess(response.data));
  } catch (error) {
    yield put(approvePostFailed(error.response));
  } finally {
    yield put(stopLoading());
  }
}
function* toggleBlockAuthor({ payload }) {
  try {
    yield put(startLoading());
    const response = yield axios.post("/admin/author/blockUser", payload);
    yield put(blockAuthorSuccess(response.data));
  } catch (error) {
    yield put(blockAuthorFailed(error.response));
  } finally {
    yield put(stopLoading());
  }
}

function* requestAuthor({ payload }) {
  try {
    yield put(startLoading());
    const response = yield axios.post("/user/becomeAuthor", payload);
    yield put(becomeAuthorSuccess(response.data));
  } catch (error) {
    yield put(becomeAuthorFailed(error.response));
  } finally {
    yield put(stopLoading());
  }
}

//get All Authors
function* watchApproveAuthors() {
  yield takeLatest(AUTHOR_APPROVED, approveAuthor);
}

function* watchBlockAuthors() {
  yield takeLatest(BLOCK_AUTHOR, toggleBlockAuthor);
}

function* watchrequestAuthors() {
  yield takeLatest(BECOME_AUTHOR, requestAuthor);
}

function* watchrequestPost() {
  yield takeLatest(POST_APPROVED, approvePost);
}

export default function* postSaga() {
  yield all([
    fork(watchApproveAuthors),
    fork(watchrequestAuthors),
    fork(watchBlockAuthors),
    fork(watchrequestPost),
  ]);
}
