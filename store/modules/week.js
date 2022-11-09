export const SET_LEARNING = "week/SET_LEARNING";
export const SET_ASSIGNMENT = "week/SET_ASSIGNMENT";

export const setLearning = (payload) => {
    return{
        type: SET_LEARNING,
        payload,
    };
};

export const setAssignment = (payload) => {
    return{
        type: SET_ASSIGNMENT,
        payload,
    };
};

export const weekActions = {setLearning, setAssignment};

const initialState = {
    learning: 0,
    assignment: 0,
}

export default function reducer(state=initialState, action){
    switch(action.type){
        case SET_LEARNING:
            return {...state, learning: action.payload.learning}

        case SET_ASSIGNMENT:
            return {...state, assignment: action.payload.assignment}

        default:
            return state;
    }
}
