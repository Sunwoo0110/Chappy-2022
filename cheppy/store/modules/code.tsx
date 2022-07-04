import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const SET_CODE = "code/SET_CODE";

export const setCode = (payload: string) => {
    return{
        type: SET_CODE,
        payload,
    };
};

export const codeActions = {setCode};

interface CodeReduxState{
    content: string|null;
}

const initialState: CodeReduxState = {
    content: null,
};

export default function reducer(state=initialState, action: any){
    switch(action.type){
        case SET_CODE:
            const newState = {...state, content: action.payload};
            return newState;
        default:
            return state;
    }
}


// const initialState = {value: null};

// const codeSlice = createSlice({
//     name: 'code',
//     initialState,
//     reducers: {
//         setCode: (state, action: PayloadAction<string>) => {state.value},
//     },
// })

// export const {setCode} = codeSlice.actions;
// export default codeSlice.reducer;
