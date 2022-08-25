export const SET_USER = "user/SET_USER"

export const setUser = (payload) => {
    return{
        type: SET_USER,
        payload,
    };
}

export const userActions = {setUser};

const initialState = {
    id: null,
}

export default function reducer(state=initialState, action){
    switch(action.type){
        case SET_USER:
            return {...state, id: action.payload.id}

            default:
            return state;
    }
}
