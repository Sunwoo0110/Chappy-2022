import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import counter from "./counter";
import code from "./code";
import hint from "./hint";
import feedback from "./feedback";

const rootReducer = combineReducers({
    counter,
    code,
    hint,
    feedback,
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
