export const SET_RUN = "run/SET_RUN";

export const setRun = (payload) => {
    return{
        type: SET_RUN,
        payload,
    };
};

export const runActions = {setRun};

const initialState = {
    result: null,
}

export default function reducer(state=initialState, action){
    switch(action.type){
        case SET_RUN:
            return {...state, result: action.payload.result}

        default:
            return state;
    }
}
