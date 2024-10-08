import axios from "../../axios/AxiosConfig";
import { fork, put, all, takeLatest } from "redux-saga/effects";
import {
  startLoading,
  stopLoading,
  getTrendingPostsSuccess,
  getTrendingPostsFailed,
  getSingleTrendingPostsSuccess,
  getSingleTrendingPostsFailed,
  clearState,
} from "./actions";
import {
  GET_TRENDING_POSTS,
  GET_SINGLE_TRENDING_POSTS,
  CLEAR_STATE,
} from "./actionTypes";

//Login User Saga

function* getAllTrendingPosts({payload}) {
  try {
    yield put(startLoading());
    const response = yield axios.get(`/user/getTrends?page=${payload.page}&size=${payload.size}`);
    yield put(getTrendingPostsSuccess(response.data));
    yield put(stopLoading());
  } catch (error) {
    yield put(getTrendingPostsFailed(error.response));
  } finally {
    yield put(stopLoading());
  }
}

function* clearStateHandler() {
  yield put(clearState());
}

function* getSingleTrendingPost(payload) {
  try {
    yield put(startLoading());
    const response = yield axios.get(
      `/user/getAllPosts?query=${parseInt(payload.payload.query)}`
    );
    yield put(getSingleTrendingPostsSuccess(response.data));
  } catch (error) {
    yield put(getSingleTrendingPostsFailed(error.response));
  } finally {
    yield put(stopLoading());
  }
}

//create post Watcher
function* watchGetAllTrendingPosts() {
  yield takeLatest(GET_TRENDING_POSTS, getAllTrendingPosts);
}

function* watchGetSingleTrendingPosts() {
  yield takeLatest(GET_SINGLE_TRENDING_POSTS, getSingleTrendingPost);
}

function* watchClearState() {
  yield takeLatest(CLEAR_STATE, clearStateHandler);
}

export default function* postSaga() {
  yield all([
    fork(watchGetAllTrendingPosts),
    fork(watchGetSingleTrendingPosts),
    fork(watchClearState),
  ]);
}
