import { combineReducers } from "@reduxjs/toolkit";
// import storage from 'redux-persist/lib/storage'
import storage from "../storage";
import { persistReducer } from "redux-persist";
import { HYDRATE } from "next-redux-wrapper";
import counter from "./counter";
import code from "./code";
import hint from "./hint";
import feedback from "./feedback";
import run from "./run";
import validation from "./validation";
import user from "./user";

const rootReducer = combineReducers({
    counter,
    code,
    hint,
    feedback,
    run,
    validation,
    user,
});

const reducer = (state, action) => {
    if(action.type === HYDRATE){
        return{
            ...state,
            ...action.payload
        };
    }
    return rootReducer(state, action);
}

const persistConfig = {
    key: 'root',
    // whitelist: ['user'], // only counter will be persisted, add other reducers if needed
    storage, // if needed, use a safer storage
  };

const persistedReducer = persistReducer(persistConfig, reducer);

export {reducer, persistedReducer}
