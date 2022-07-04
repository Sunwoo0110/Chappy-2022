import { all, call, put, takeLatest } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import * as feedbackActions from "../feedback";
import { FeedbackReduxState } from '../feedback';

function* postFeedbackAPI(postData) {
    return axios.post('http://localhost:4000/feedback/get_feedback', {
        //feedback api 완성되면 연결
        //postData
    });
}

function* loadFeedback(action){
    try{
        const result = yield call(postFeedbackAPI, action.data);
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

        let payload: FeedbackReduxState = {
            res: result.data,
            num: cnt,
        };
        yield put(
            feedbackActions.getFeedback(payload)
        );
    } catch(e){
        console.log(e);
        let payload: FeedbackReduxState = {
            res: "Server Error",
            num: 0,
        };
        yield put(
            feedbackActions.getFeedback(payload)
        );
    }
}

function* sagaFeedback(): Generator {
    yield all([takeLatest(feedbackActions.GET_FEEDBACK, loadFeedback)]);
}

export default sagaFeedback
