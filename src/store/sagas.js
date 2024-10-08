import { all } from "redux-saga/effects";
import authSaga from "./auth/saga";
import postSaga from "./post/saga";
import authorizeSaga from "./autorization/saga";
import tendingPostsSage from "./trending_blogs/saga";
import themeSage from "./theme/saga";
import dashboardSaga from "./dashboard/saga";
import profileSaga from "./profile/saga";

export default function* rootSaga() {
  yield all([
    authSaga(),
    postSaga(),
    authorizeSaga(),
    tendingPostsSage(),
    themeSage(),
    dashboardSaga(),
    profileSaga(),
  ]);
}
