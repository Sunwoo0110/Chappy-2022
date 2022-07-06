import { all, call, put, takeLatest } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import * as hintActions from "../hint";
import { HintReduxState } from '../hint';

function* postHintAPI(postData) {
    return axios.post('http://localhost:4000/feedback/get_feedback', {
        //feedback api 완성되면 연결
        //postData
    });
}

function* loadHint(action){
    try{
        const result = yield call(postHintAPI, action.data);
        console.log("postFeedback success");
        console.log(result.data);
        let cnt = 0;
        const hint = Object.keys(result.data).map((line) => (
            result.data[line].map((contents) => (
                Object.keys(contents).map((content) => (
                    cnt++
                ))
            ))
        ));

        let payload: HintReduxState = {
            content: result.data,
            num: cnt,
        };
        yield put(
            hintActions.getHint(payload)
        );
    } catch(e){
        console.log(e);
        let payload: HintReduxState = {
            content: "Server Error",
            num: 0,
        };
        yield put(
            hintActions.getHint(payload)
        );
    }
}

function* sagaHint(): Generator {
    yield all([takeLatest(hintActions.GET_HINT, loadHint)]);
}

export default sagaHint
