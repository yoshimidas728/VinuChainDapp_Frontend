import axios from "../../axios/AxiosConfig";
import { fork, put, all, takeLatest } from "redux-saga/effects";
import {
  loginAdminFailed,
  loginAdminSuccess,
  loginFailed,
  loginSuccess,
  registerFailed,
  registerSuccess,
  startLoading,
  stopLoading,
  clearState,
} from "./actions";
import { ADMIN_LOGIN, CLEAR_STATE, LOGIN, REGISTER } from "./actionTypes";

//Login Admin Saga

function* loginAdmin({ payload, nav }) {
  try {
    yield put(startLoading());
    const response = yield axios.post("/admin/login", payload);
    yield put(loginAdminSuccess(response.data));
    nav("/");
  } catch (error) {
    yield put(loginAdminFailed(error.response));
  } finally {
    yield put(stopLoading());
  }
}

function* clearStateHandler() {
  yield put(clearState());
}

//Login User Saga

function* login({ payload, nav }) {
  try {
    yield put(startLoading());
    const response = yield axios.post("/user/login", payload);
    nav("/");
    yield put(loginSuccess(response.data));
  } catch (error) {
    yield put(loginFailed(error.response));
  } finally {
    yield put(stopLoading());
  }
}

//Register User Saga

function* register({ payload, nav }) {
  try {
    yield put(startLoading());
    const response = yield axios.post("/user/signUp", payload);
    nav("/login");
    yield put(registerSuccess(response.data));
  } catch (error) {
    yield put(registerFailed(error.response));
  } finally {
    yield put(stopLoading());
  }
}

//Login Admin Watcher
function* watchLoginAdmin() {
  yield takeLatest(ADMIN_LOGIN, loginAdmin);
}

//Login User Watcher
function* watchLogin() {
  yield takeLatest(LOGIN, login);
}

//Register User Watcher
function* watchRegister() {
  yield takeLatest(REGISTER, register);
}

function* watchClearState() {
  yield takeLatest(CLEAR_STATE, clearStateHandler);
}

export default function* authSaga() {
  yield all([
    fork(watchLogin),
    fork(watchRegister),
    fork(watchLoginAdmin),
    fork(watchClearState),
  ]);
}
