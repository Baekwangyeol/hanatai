import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_AIRPLANE_REQUEST,
  LOAD_AIRPLANE_SUCCESS,
  LOAD_AIRPLANE_FAILURE,
  LOAD_AIRNUMBER_REQUEST,
  LOAD_AIRNUMBER_SUCCESS,
  LOAD_AIRNUMBER_FAILURE,
  ADD_AIRPLANE_REQUEST,
  ADD_AIRPLANE_SUCCESS,
  ADD_AIRPLANE_FAILURE,
  ADD_AIRPLANENUMBER_REQUEST,
  ADD_AIRPLANENUMBER_SUCCESS,
  ADD_AIRPLANENUMBER_FAILURE,
} from '../reducers/airplane';

function LoadAirplaneAPI(lastId) {
  return axios.get(`/airplane?lastId=${lastId || 0}`);
}

function* LoadAirplane(action) {
  try {
    const result = yield call(LoadAirplaneAPI, action.lastId);
    yield put({
      type: LOAD_AIRPLANE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_AIRPLANE_FAILURE,
      error: err.response.data,
    });
  }
}


function LoadAirnumberAPI(code) {
  return axios.get(`/airplane/${code}`);
}

function* LoadAirnumber(action) {
  try {
    const result = yield call(LoadAirnumberAPI, action.code);
    yield put({
      type: LOAD_AIRNUMBER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_AIRNUMBER_FAILURE,
      error: err.response.data,
    });
  }
}


function AddAirplaneAPI(data) {
  return axios.post('/airplane', data);
}

function* AddAirplane(action) {
  try {
    const result = yield call(AddAirplaneAPI, action.data);
    yield put({
      type: ADD_AIRPLANE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_AIRPLANE_FAILURE,
      error: err.response.data,
    });
  }
}

function AddAirplaneNumberAPI(data) {
  return axios.post(`/airplane/${data.airplaneId}/number`, data);
}

function* AddAirplaneNumber(action) {
  try {
    const result = yield call(AddAirplaneNumberAPI, action.data);
    yield put({
      type: ADD_AIRPLANENUMBER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_AIRPLANENUMBER_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddairplane() {
  yield takeLatest(ADD_AIRPLANE_REQUEST, AddAirplane);
}

function* watchLoadairplane() {
  yield takeLatest(LOAD_AIRPLANE_REQUEST, LoadAirplane);
}
function* watchAddairplaneNumber() {
  yield takeLatest(ADD_AIRPLANENUMBER_REQUEST, AddAirplaneNumber);
}
function* watchLoadairnumber() {
  yield takeLatest(LOAD_AIRNUMBER_REQUEST, LoadAirnumber);
}
export default function* airplaneSaga() {
  yield all([
    fork(watchAddairplane),
    fork(watchLoadairplane),
    fork(watchLoadairnumber),
    fork(watchAddairplaneNumber),
  ]);
}