export const GET_HINT = "hint/GET_HINT";

export const getHint = (payload: any) => {
    return{
        type: GET_HINT,
        payload,
    };
};

export const hintActions = {getHint};

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
        case GET_HINT:
            console.log(action);
            return {...state, content: action.payload.content, num: action.payload.num}

        default:
            return state;
    }
}
