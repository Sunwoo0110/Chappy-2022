import { configureStore } from '@reduxjs/toolkit';
// import { createWrapper } from "next-redux-wrapper";
import logger from 'redux-logger';

import reducer from "./modules";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";

// const makeStore = (context) => configureStore({ 
//     reducer,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
//     devTools: process.env.NODE_ENV !== 'production',
// });

// export const wrapper = createWrapper(makeStore, {
//     debug: process.env.NODE_ENV !== 'production',
// });

const bindMiddleware = (middleware: any) => {
    if (process.env.NODE_ENV !== "production") {
      const { composeWithDevTools } = require("redux-devtools-extension");
      return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
  };
  
const initStore = () => {
    return createStore(reducer, bindMiddleware([]));
};
  
export const wrapper = createWrapper(initStore);
