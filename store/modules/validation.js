export const SET_VAL = "validation/SET_VAL";
export const SET_DECO = "validation/SET_DECO";

export const setVal = (payload) => {
    return{
        type: SET_VAL,
        payload,
    };
};

export const setDeco = (payload) => {
    return{
        type: SET_DECO,
        payload,
    };
};

export const validationActions = {setVal, setDeco};

const initialState = {
    num: 0,
    click: false,
    deco: [],

}

export default function reducer(state=initialState, action){

    switch(action.type){
        case SET_VAL:
            return {...state, num: action.payload.num, click: action.payload.click}

        case SET_DECO:
            return {...state,
                deco: action.payload.deco
            }

        default:
            return state;
    }

}
