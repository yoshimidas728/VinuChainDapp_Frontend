import { combineReducers } from "redux";
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// Front
// import Layout from './layout/reducer';

// Authentication Module
import auth from "./auth/reducer";
import post from "./post/reducer";
import authorize from "./autorization/reducer";
import trendingPost from "./trending_blogs/reducer";
import themeReducer from "./theme/reducer";
import dashboardReducer from "./dashboard/reducer";
import profileReducer from "./profile/reducer";

// import persistReducer from 'redux-persist/es/pesistReducer';
// import AuthReducer

// const authPersistConfig = {
//     key: 'auth',
//     storage: storage,
//     keyPrefix: 'redux-',
//     whitelist: ['auth']
//   };

const rootReducer = () =>
  combineReducers({
    auth,
    post,
    authorize,
    trendingPost,
    themeReducer,
    dashboardReducer,
    profileReducer,
  });

export default rootReducer;
