import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import counter from "./counter";
import code from "./code";
import hint from "./hint";
import feedback from "./feedback";
import run from "./run";
import validation from "./validation";

const rootReducer = combineReducers({
    counter,
    code,
    hint,
    feedback,
    run,
    validation,
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

export default reducer;
