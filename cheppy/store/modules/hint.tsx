export const POST_HINT = "hint/POST_HINT";

export const postHint = (payload: any) => {
    return{
        type: POST_HINT,
        payload,
    };
};

export const hintActions = {postHint};

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
        case POST_HINT:
            return {...state, content: action.payload.content, num: action.payload.num}

        default:
            return state;
    }
}
