import {
    compose,
    applyMiddleware,
    legacy_createStore as createStore,
  } from 'redux';//
  import { persistStore, persistReducer } from 'redux-persist';//
  import storage from 'redux-persist/lib/storage';//
  import rootReducer from './reducers';
  import createSagaMiddleware from 'redux-saga';//
  import rootSaga from './sagas';
  import { createBrowserHistory } from 'history';//
  
  const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['_persist'],
  };//
  
  const history = createBrowserHistory();//
  
  const persistedReducer = persistReducer(persistConfig, rootReducer(history));
  const sagaMiddleware = createSagaMiddleware();
  
  const middlewares = [sagaMiddleware];
  
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  function configureStore(initialState) {
    const store = createStore(
      persistedReducer,
      initialState,
      composeEnhancers(applyMiddleware(...middlewares))
    );
    sagaMiddleware.run(rootSaga);
    return store;
  }
  
  const store = configureStore();
  
  const persistor = persistStore(store);
  
  export { store, persistor, history };
  