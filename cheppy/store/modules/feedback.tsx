import axios from "axios";
import internal from "stream";

export const GET_FEEDBACK = "feedback/GET_FEEDBACK";

export const getFeedback = (payload: any) => {
    return{
        type: GET_FEEDBACK,
        payload,
    };
};

export const feedbackActions = {getFeedback};

export interface FeedbackReduxState{
    res: JSON|null|string|object;
    num: number;
}

// const initialState: JSON|null = null;
const initialState: FeedbackReduxState = {
    res: null,
    num: 0,
}

export default function reducer(state=initialState, action: any){
    switch(action.type){
        case GET_FEEDBACK:
            console.log(action);
            return {...state, res: action.payload.res, num: action.payload.num}

            // axios.post('http://localhost:4000/feedback/get_feedback', {
            //     //feedback api 완성되면 연결
            //     //actions.payload
            // })
            // .then((res) => {
            //     console.log("postFeedback success");
            //     console.log(res.data);
            //     let cnt = 0;
            //     const hint = Object.keys(res.data).map((line) => (
            //         res.data[line].map((contents) => (
            //             Object.keys(contents).map((content) => (
            //                 cnt++
            //             ))
            //         ))
            //     ));
            //     let newState = {...state, res: res.data, num: cnt};
            //     return newState;        
            // })
            // .catch(error => {
            //     console.log("postFeedback failed");
            //     console.log(error.response);
            //     let newState = {...state, res: "Server Error", num:0};
            //     return newState;
            // })

        default:
            return state;
    }
}
