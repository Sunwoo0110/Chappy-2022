export const SET_VAL = "validation/SET_VAL";
// export const SET_TC = "run/SET_CLCIK";

export const setVal = (payload) => {
    return{
        type: SET_VAL,
        payload,
    };
};

// export const setC = (payload) => {
//     return{
//         type: SET_TC,
//         payload,
//     };
// };

export const validataionActions = {setVal};

const initialState = {
    num: 0,
    click: false,

}

export default function reducer(state=initialState, action){
    switch(action.type){
        case SET_VAL:
            return {...state, num: action.payload.num, click: action.payload.click}

        // case SET_TC:
        //     return {...state,
        //         all_result: action.payload.all_result,
        //         score: action.payload.score
        //     }

        default:
            return state;
    }
}
