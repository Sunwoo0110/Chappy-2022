import { all, call, fork } from 'redux-saga/effects';
import sagaHint from './sagaHint';

export default function* rootSaga(){
    yield all([fork(sagaHint)])
}
