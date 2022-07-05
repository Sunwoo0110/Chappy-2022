export const GET_ALL_SOLUTION = "solution/GET_ALL_SOLUTION"
export const SET_CUR_SOLUTION = "soution/GET_CUR_SOLUTION";

export const getAllSolution = (payload: any) => {
    return{
        type: GET_ALL_SOLUTION,
        payload,
    };
}

export const setCurSolution = (payload: any) => {
    return{
        type: SET_CUR_SOLUTION,
        payload,
    };
}

export const solutionActions = {getAllSolution, setCurSolution};

export interface SolutionReduxState{
    all_lines: string[];
    all_contents: string[];
    cur_num: number;
    cur_line: string|null;
    cur_content: string|null;
    remain_num: number;
}

const initialState: SolutionReduxState = {
    all_lines: [],
    all_contents: [],
    cur_num: 0,
    cur_line: null,
    cur_content: null,
    remain_num: 0,
}

export default function reducer(state=initialState, action: any){
    switch(action.type){
        case GET_ALL_SOLUTION:
            return {...state,
                all_lines: action.payload.all_lines, 
                all_contents: action.payload.all_contents, 
                cur_num: action.payload.cur_num,
                cur_line: action.payload.cur_line,
                cur_content: action.payload.cur_content,
                remain_num: action.payload.remain_num
            }
        
        case SET_CUR_SOLUTION:
            return {...state,
                cur_num: action.payload.cur_num,
                cur_line: action.payload.cur_line,
                cur_content: action.payload.cur_content,
                remain_num: action.payload.remain_num
            }    

        default:
            return state;
    }
}
