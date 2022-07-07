export const SET_HINT = "hint/SET_HINT";

export const setHint = (payload: any) => {
    return{
        type: SET_HINT,
        payload,
    };
};

export const hintActions = {setHint};

export interface HintReduxState{
    content: JSON|null|string|object;
    num: number;
}

const initialState: HintReduxState = {
    content: null,
    num: 0,
}

export default function reducer(state=initialState, action: any){
    switch(action.type){
        case SET_HINT:
            return {...state, content: action.payload.content, num: action.payload.num}

        default:
            return state;
    }
}
