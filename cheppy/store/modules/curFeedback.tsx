export const GET_CUR_FEEDBACK = "feedback/GET_CUR_FEEDBACK";

export const getCurFeedback = (payload: any) => {
    return{
        type: GET_CUR_FEEDBACK,
        payload,
    };
}

export const curFeedbackActions = {getCurFeedback};

export interface CurFeedbackReduxState{
    content: string|null;
    num: number;
}

const initialState: CurFeedbackReduxState = {
    content: null,
    num: 0,   
}

export default function reducer(state=initialState, action: any){
    switch(action.type){
        case GET_CUR_FEEDBACK:
            
    }
}
