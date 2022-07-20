export const SET_HINT = "hint/SET_HINT";

export const setHint = (payload) => {
    return{
        type: SET_HINT,
        payload,
    };
};

export const hintActions = {setHint};

const initialState = {
    content: null,
    num: 0,
}

export default function reducer(state=initialState, action){
    switch(action.type){
        case SET_HINT:
            return {...state, content: action.payload.content, num: action.payload.num}

        default:
            return state;
    }
}
