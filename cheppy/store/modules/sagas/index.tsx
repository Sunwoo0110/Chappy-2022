import { all, call, fork } from 'redux-saga/effects';
import sagaFeedback from './sagaFeedback';

export default function* rootSaga(){
    yield all([fork(sagaFeedback)])
}
