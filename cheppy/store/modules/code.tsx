export const SET_CODE = "code/SET_CODE";
export const CHANGE_CODE = "code/CHANGE_CODE"

export const setCode = (payload_set: any) => {
    return{
        type: SET_CODE,
        payload_set,
    };
};

export const changeCode = (payload_change: any) => {
    return{
        type: SET_CODE,
        payload_change,
    };
}

export const codeActions = {setCode, changeCode};

interface CodeReduxState{
    content: string|null;
}

const initialState: CodeReduxState = {
    content: null,
};

export default function reducer(state=initialState, action: any){
    switch(action.type){
        case SET_CODE:
            const newState = {...state, content: action.payload_set};
            return newState;

        case CHANGE_CODE:
            let line: number = Number(action.payload_change.line);
            let content: string = action.payload_change.content;

            return {...state,
            };

        default:
            return state;
    }
}
