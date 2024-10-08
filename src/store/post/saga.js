import axios from "../../axios/AxiosConfig";
import { fork, put, all, takeLatest } from "redux-saga/effects";
import {
  createPostFailed,
  createPostSuccess,
  createNewCommentFailed,
  getAuthorApprovedPendingFailed,
  getAuthorApprovedPendingSuccess,
  getAuthorFailed,
  getAuthorPendingFailed,
  getAuthorPendingSuccess,
  getAuthorPostFailed,
  getAuthorPostSuccess,
  getAuthorSuccess,
  getLikePost,
  getLikePostFailed,
  getLikePostSuccess,
  likePostFailed,
  likePostSuccess,
  startLoading,
  stopLoading,
  createNewCommentSuccess,
  getAllPosts,
  getAllPostSuccess,
  getAllPostFailed,
  getFilterPostsSuccess,
  getFilterPostsFailed,
  getPostsCommentsSuccess,
  getPostsCommentsFailed,
  getApprovalPostsSuccess,
  getApprovalPostsFailed,
  clearState,
} from "./actions";
import {
  CREATE_POST,
  CREATE_COMMENT,
  GET_ALL_AUTHOR,
  GET_ALL_AUTHOR_PENDING,
  GET_ALL_AUTHOR_POST,
  GET_LIKE_POST,
  LIKE_POST,
  GET_ALL_POST,
  GET_FILTER_POSTS,
  GET_POST_COMMENTS,
  GET_APPROVAL_POSTS,
  CLEAR_STATE,
} from "./actionTypes";

//Login User Saga

function* createNewPost({ payload, nav }) {
  try {
    yield put(startLoading());
    const response = yield axios.post("/user/createPost", payload);
    yield put(createPostSuccess(response.data));
  } catch (error) {
    yield put(createPostFailed(error.response));
  } finally {
    yield put(stopLoading());
  }
}

function* createNewComment({ payload, nav }) {
  try {
    yield put(startLoading());
    console.log("this runs up ");
    const response = yield axios.post("/user/createComment", payload);
    yield put(createNewCommentSuccess(response?.data?.data));
  } catch (error) {
    yield put(createNewCommentFailed(error.response));
  } finally {
    yield put(stopLoading());
  }
}

function* getAllPostsAdmin({ payload, nav }) {
  try {
    yield put(startLoading());
    const response = yield axios.get("/user/createPost");
    nav("/");
    yield put(getAuthorPostSuccess(response?.data?.data));
  } catch (error) {
    yield put(getAuthorPostFailed(error.response));
  } finally {
    yield put(stopLoading());
  }
}

function* getApprovalPostsApi() {
  try {
    yield put(startLoading());
    const response = yield axios.get("/admin/author/getAllPendingPosts");
    console.log(
      "this is the response /admin/author/getAllPendingPosts: ",
      response?.data
    );
    yield put(getApprovalPostsSuccess(response?.data));
  } catch (error) {
    yield put(getApprovalPostsFailed(error.response));
  } finally {
    yield put(stopLoading());
  }
}

function* getAllPostsHandler({ payload, nav }) {
  try {
    yield put(startLoading());
    const response = yield axios.get("/user/getAllPosts");
    yield put(getAllPostSuccess(response?.data?.data));
  } catch (error) {
    yield put(getFilterPostsFailed(error.response));
  } finally {
    yield put(stopLoading());
  }
}

function* getFilterPostsHandler({ payload, nav }) {
  try {
    yield put(startLoading());
    const response = yield axios.get(
      `/user/filterBlogs?filter=["${payload.tag}"]&page=${payload.page}&size=${payload.size}`
    );
    yield put(
      getFilterPostsSuccess({ data: response?.data?.data, tag: payload.tag })
    );
  } catch (error) {
    yield put(getAllPostFailed(error.response));
  } finally {
    yield put(stopLoading());
  }
}

function* getAllAuthor() {
  try {
    yield put(startLoading());
    const response = yield axios.get("/admin/author/getAll");
    yield put(getAuthorSuccess(response.data));
  } catch (error) {
    yield put(getAuthorFailed(error.response));
  } finally {
    yield put(stopLoading());
  }
}

function* getAllPendingRequestAuthor({ payload }) {
  console.log(
    "🚀 ~ file: saga.js:65 ~ function*getAllPendingRequestAuthor ~ payload:",
    payload
  );
  try {
    yield put(startLoading());
    const response = yield axios.get(`/admin/author/getAll?query=${payload}`);
    yield put(getAuthorApprovedPendingSuccess(response.data));
  } catch (error) {
    yield put(getAuthorApprovedPendingFailed(error.response));
  } finally {
    yield put(stopLoading());
  }
}

function* likePost({ payload }) {
  try {
    yield put(startLoading());
    const response = yield axios.post(`/user/likePost`, payload);
    console.log(
      "🚀 ~ file: saga.js:91 ~ function*likePost ~ response:",
      response
    );
    yield put(likePostSuccess(response.data));
    yield put(getLikePost(response.data.data.createLike.PostId));
  } catch (error) {
    yield put(likePostFailed(error.response));
  } finally {
    yield put(stopLoading());
  }
}

function* getLikesPost({ payload }) {
  try {
    yield put(startLoading());
    const response = yield axios.get(`/user/getAllPostLikes?query=${payload}`);
    yield put(getLikePostSuccess(response.data));
  } catch (error) {
    yield put(getLikePostFailed(error.response));
  } finally {
    yield put(stopLoading());
  }
}

function* clearStateHandler() {
  yield put(clearState());
}

function* getPostsComments({ payload }) {
  try {
    yield put(startLoading());
    const response = yield axios.get(
      `/user/getComments?query=${payload.postId}`
    );
    console.log("this is the respoonse: ", { data: response?.data });
    yield put(getPostsCommentsSuccess(response?.data));
  } catch (err) {
    yield put(getPostsCommentsFailed(err.response));
  } finally {
    yield put(stopLoading());
  }
}

function* watchGetLikePost() {
  yield takeLatest(GET_LIKE_POST, getLikesPost);
}
//get All Authors
function* watchLikePost() {
  yield takeLatest(LIKE_POST, likePost);
}

//get All Authors
function* watchGetAllAuthors() {
  yield takeLatest(GET_ALL_AUTHOR, getAllAuthor);
}

//get Author/Pending Authors
function* watchGetAuthorsApprovedPending() {
  yield takeLatest(GET_ALL_AUTHOR_PENDING, getAllPendingRequestAuthor);
}

//create post Watcher
function* watchGetAllPostAdmin() {
  yield takeLatest(GET_ALL_AUTHOR_POST, getAllPostsAdmin);
}

//create post Watcher
function* watchCreatePost() {
  yield takeLatest(CREATE_POST, createNewPost);
}

function* getAllPostsMethod() {
  yield takeLatest(GET_ALL_POST, getAllPostsHandler);
}

function* getFilterPostsMethod() {
  yield takeLatest(GET_FILTER_POSTS, getFilterPostsHandler);
}

function* watchCreateComment() {
  yield takeLatest(CREATE_COMMENT, createNewComment);
}

function* watchPostCommentHandler() {
  yield takeLatest(GET_POST_COMMENTS, getPostsComments);
}
function* watchGetApprovalPosts() {
  yield takeLatest(GET_APPROVAL_POSTS, getApprovalPostsApi);
}

function* watchClearState() {
  yield takeLatest(CLEAR_STATE, clearStateHandler);
}

export default function* postSaga() {
  yield all([
    fork(watchCreatePost),
    fork(watchCreateComment),
    fork(watchGetAllPostAdmin),
    fork(watchGetAllAuthors),
    fork(watchGetAuthorsApprovedPending),
    fork(watchLikePost),
    fork(watchGetLikePost),
    fork(getAllPostsMethod),
    fork(getFilterPostsMethod),
    fork(watchPostCommentHandler),
    fork(watchGetApprovalPosts),
    fork(watchClearState),
  ]);
}
