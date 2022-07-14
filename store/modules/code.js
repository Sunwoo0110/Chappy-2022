export const SET_CODE = "code/SET_CODE";
export const CHANGE_CODE = "code/CHANGE_CODE"

export const setCode = (payload) => {
    return{
        type: SET_CODE,
        payload,
    };
};

export const changeCode = (payload) => {
    return{
        type: CHANGE_CODE,
        payload,
    };
}

export const codeActions = {setCode, changeCode};

const initialState = {
    originStr: null,
    curStr: null,
    curArr: []
};

export default function reducer(state=initialState, action){
    switch(action.type){
        case SET_CODE:
            let codeStr = action.payload;
            let codeArr = codeStr.split("\r\n");

            const newState = {...state, 
                originStr: codeStr, 
                curStr: codeStr,
                curArr: codeArr, 
            };

            return newState;

        case CHANGE_CODE:
            let line = Number(action.payload.line)-1;
            let contentKey = action.payload.contentKey;
            let contentVal = action.payload.contentVal;
            let changedArr = state.curArr;
            
            if(contentKey.includes("Delete")){
                changedArr[line]="";
            }
            else{
                if(line>=changedArr.length)
                    changedArr.push(contentVal);
                else
                    changedArr[line]=contentVal;
            }
            
            let changedCode = changedArr.join("\r\n");

            return {...state,
                curStr: changedCode,
                curArr: changedArr,
            };

        default:
            return state;
    }
}
