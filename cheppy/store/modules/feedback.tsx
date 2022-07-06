export const GET_ALL_FEEDBACK = "feedback/GET_ALL_FEEDBACK"
export const SET_CUR_FEEDBACK = "feedback/SET_CUR_FEEDBACK";

export const getAllFeedback = (payload: any) => {
    return{
        type: GET_ALL_FEEDBACK,
        payload,
    };
}

export const setCurFeedback = () => {
    return{
        type: SET_CUR_FEEDBACK,
    };
}

export const solutionActions = {getAllFeedback, setCurFeedback};

export interface FeedbackReduxState{
    all_lines: string[];
    all_contents_key: string[];
    all_contents_val: string[];
    cur_num: number;
    cur_line: string|null;
    cur_content_key: string|null;
    cur_content_val: string|null;
    remain_num: number;
}

const initialState: FeedbackReduxState = {
    all_lines: [],
    all_contents_key: [],
    all_contents_val: [],
    cur_num: 0,
    cur_line: null,
    cur_content_key: null,
    cur_content_val: null,
    remain_num: 0,
}

export default function reducer(state=initialState, action: any){
    switch(action.type){
        case GET_ALL_FEEDBACK:
            return {...state,
                all_lines: action.payload.all_lines, 
                all_contents_key: action.payload.all_contents_key, 
                all_contents_val: action.payload.all_contents_val, 
                cur_num: action.payload.cur_num,
                cur_line: action.payload.cur_line,
                cur_content_key: action.payload.cur_content_key,
                cur_content_val: action.payload.cur_content_val,
                remain_num: action.payload.remain_num
            }
        
        case SET_CUR_FEEDBACK:
            if(state.remain_num==1){
                return {...state,
                    remain_num: state.remain_num - 1,
                }
            }

            const cur = state.cur_num + 1;
            return {...state,
                cur_num: cur,
                cur_line: state.all_lines[cur],
                cur_content_key: state.all_contents_key[cur],
                cur_content_val: state.all_contents_val[cur],
                remain_num: state.remain_num - 1,
            }    

        default:
            return state;
    }
}
