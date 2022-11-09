import { configureStore } from '@reduxjs/toolkit';
// import { createWrapper } from "next-redux-wrapper";
import logger from 'redux-logger';

// import reducer from "./modules";
import {reducer,persistedReducer} from "./modules";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
// import thunkMiddleware from 'redux-thunk';
// import createSagaMiddleware from "redux-saga";
// import rootSaga from './modules/sagas';

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== "production") {
      const { composeWithDevTools } = require("redux-devtools-extension");
      return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
  };
  
// const initStore = () => {
//   // const sageMiddleware = createSagaMiddleware();
//   // const store = createStore(reducer, bindMiddleware([sageMiddleware]));
//   // store.sagaTask = sageMiddleware.run(rootSaga);

//   const store = createStore(reducer, bindMiddleware([]));

//   return store;
// };
// export const wrapper = createWrapper(initStore);

const makeStore = ({ isServer }) => {
  if (isServer) {
    //If it's on server side, create a store
    return createStore(reducer, bindMiddleware([thunkMiddleware]));
  } else {
    //If it's on client side, create a store which will persist
    const { persistStore } = require('redux-persist');

    const store = createStore(
      persistedReducer,
      bindMiddleware([])
    ); // Creating the store again

    store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

    return store;
  }
};

export const wrapper = createWrapper(makeStore);

// const makeConfiguredStore = (reducer) => createStore(reducer, undefined, bindMiddleware([]));
// const makeStore = () => {
//   const isServer = typeof window === 'undefined';

//   if (isServer) {
//     return makeConfiguredStore(reducer);
//   } else {
//     // we need it only on client side
//     const store = makeConfiguredStore(persistedReducer);
//     let persistor = persistStore(store);
//     return { persistor, ...store };
//   }
// };

// export const wrapper = createWrapper(makeStore, {
//   debug: process.env.NODE_ENV !== 'production',
// });
