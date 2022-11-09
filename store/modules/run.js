export const SET_RUN = "run/SET_RUN";
export const SET_TC = "run/SET_TC";

export const setRun = (payload) => {
    return{
        type: SET_RUN,
        payload,
    };
};

export const setTC = (payload) => {
    return{
        type: SET_TC,
        payload,
    };
};
export const runActions = {setRun, setTC};

const initialState = {
    result: null,
    all_result: [],
    score: 0,
}

export default function reducer(state=initialState, action){
    switch(action.type){
        case SET_RUN:
            return {...state, result: action.payload.result}

        case SET_TC:
            return {...state,
                all_result: action.payload.all_result,
                score: action.payload.score
            }

        default:
            return state;
    }
}
