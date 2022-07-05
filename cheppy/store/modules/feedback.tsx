export const GET_FEEDBACK = "feedback/GET_FEEDBACK";

export const getFeedback = (payload: any) => {
    return{
        type: GET_FEEDBACK,
        payload,
    };
};

export const feedbackActions = {getFeedback};

export interface FeedbackReduxState{
    content: JSON|null|string|object;
    num: number;
}

const initialState: FeedbackReduxState = {
    content: null,
    num: 0,
}

export default function reducer(state=initialState, action: any){
    switch(action.type){
        case GET_FEEDBACK:
            console.log(action);
            return {...state, content: action.payload.content, num: action.payload.num}

        default:
            return state;
    }
}
