import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import postSaga from './post';
import userSaga from './user';
import airplaneSage from './airplane';
import hotelSaga from './hotel';
import addotherSaga from './addother';
import companySaga from './company';
import contactSaga from './contact';
import bookingSaga from './booking';
import optionSaga from './option';
import partySaga from './party';
import busSaga from './bus';

axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(airplaneSage),
    fork(postSaga),
    fork(userSaga),
    fork(hotelSaga),
    fork(addotherSaga),
    fork(companySaga),
    fork(contactSaga),
    fork(bookingSaga),
    fork(optionSaga),
    fork(partySaga),
    fork(busSaga),
  ]);
}