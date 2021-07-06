import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_COUNTRY_REQUEST,
  LOAD_COUNTRY_SUCCESS,
  LOAD_COUNTRY_FAILURE,
  ADD_COUNTRY_REQUEST,
  ADD_COUNTRY_SUCCESS,
  ADD_COUNTRY_FAILURE,
  REMOVE_COUNTRY_REQUEST,
  REMOVE_COUNTRY_SUCCESS,
  REMOVE_COUNTRY_FAILURE,
  LOAD_REGION_REQUEST,
  LOAD_REGION_SUCCESS,
  LOAD_REGION_FAILURE,
  ADD_REGION_REQUEST,
  ADD_REGION_SUCCESS,
  ADD_REGION_FAILURE,
  LOAD_MESSENGER_REQUEST,
  LOAD_MESSENGER_SUCCESS,
  LOAD_MESSENGER_FAILURE,
  ADD_MESSENGER_REQUEST,
  ADD_MESSENGER_SUCCESS,
  ADD_MESSENGER_FAILURE,
} from '../reducers/addother';

function LoadCountryAPI(lastId) {
  return axios.get(`/addother/country?lastId=${lastId || 0}`);
}

function* LoadCountry(action) {
  try {
    const result = yield call(LoadCountryAPI, action.lastId);
    yield put({
      type: LOAD_COUNTRY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_COUNTRY_FAILURE,
      error: err.response.data,
    });
  }
}

function AddCountryAPI(data) {
  return axios.post('/addother/country', data);
}

function* AddCountry(action) {
  try {
    const result = yield call(AddCountryAPI, action.data);
    yield put({
      type: ADD_COUNTRY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COUNTRY_FAILURE,
      error: err.response.data,
    });
  }
}


function RemoveCountryAPI(data) {
  return axios.delete(`/addother/country/${data}`);
}

function* RemoveCountry(action) {
  try {
    const result = yield call(RemoveCountryAPI, action.data);
    yield put({
      type: REMOVE_COUNTRY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_COUNTRY_FAILURE,
      error: err.response.data,
    });
  }
}

function LoadRegionAPI(lastId) {
  return axios.get(`/addother/region?lastId=${lastId || 0}`);
}

function* LoadRegion(action) {
  try {
    const result = yield call(LoadRegionAPI, action.lastId);
    yield put({
      type: LOAD_REGION_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_REGION_FAILURE,
      error: err.response.data,
    });
  }
}

function AddRegionAPI(data) {
  return axios.post('/addother/region', data);
}

function* AddRegion(action) {
  try {
    const result = yield call(AddRegionAPI, action.data);
    yield put({
      type: ADD_REGION_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_REGION_FAILURE,
      error: err.response.data,
    });
  }
}

function LoadMessengerAPI(lastId) {
  return axios.get(`/addother/messenger?lastId=${lastId || 0}`);
}

function* LoadMessenger(action) {
  try {
    const result = yield call(LoadMessengerAPI, action.lastId);
    yield put({
      type: LOAD_MESSENGER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MESSENGER_FAILURE,
      error: err.response.data,
    });
  }
}

function AddMessengerAPI(data) {
  return axios.post('/addother/messenger', data);
}

function* AddMessenger(action) {
  try {
    const result = yield call(AddMessengerAPI, action.data);
    yield put({
      type: ADD_MESSENGER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_MESSENGER_FAILURE,
      error: err.response.data,
    });
  }
}



function* watchRemvoecountry() {
  yield takeLatest(REMOVE_COUNTRY_REQUEST, RemoveCountry);
}

function* watchAddregion() {
  yield takeLatest(ADD_REGION_REQUEST, AddRegion);
}

function* watchLoadregion() {
  yield takeLatest(LOAD_REGION_REQUEST, LoadRegion);
}

function* watchAddcountry() {
  yield takeLatest(ADD_COUNTRY_REQUEST, AddCountry);
}

function* watchLoadcountry() {
  yield takeLatest(LOAD_COUNTRY_REQUEST, LoadCountry);
}

function* watchLoadmessenger() {
  yield takeLatest(LOAD_MESSENGER_REQUEST, LoadMessenger);
}

function* watchAddmessenger() {
  yield takeLatest(ADD_MESSENGER_REQUEST, AddMessenger);
}

export default function* addotherSaga() {
  yield all([
    fork(watchAddcountry),
    fork(watchLoadcountry),
    fork(watchAddregion),
    fork(watchLoadregion),
    fork(watchRemvoecountry),
    fork(watchLoadmessenger),
    fork(watchAddmessenger),
  ]);
}