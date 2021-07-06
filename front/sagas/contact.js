import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_CONTACT_REQUEST,
  LOAD_CONTACT_SUCCESS,
  LOAD_CONTACT_FAILURE,
  ADD_CONTACT_REQUEST,
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_FAILURE,
  ADD_ACCOUNT_REQUEST,
  ADD_ACCOUNT_SUCCESS,
  ADD_ACCOUNT_FAILURE,
  ADD_TEL_REQUEST,
  ADD_TEL_SUCCESS,
  ADD_TEL_FAILURE,
} from '../reducers/contact';

function LoadContactAPI(lastId) {
  return axios.get(`/contact?lastId=${lastId || 0}`);
}

function* LoadContact(action) {
  try {
    const result = yield call(LoadContactAPI, action.lastId);
    yield put({
      type: LOAD_CONTACT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_CONTACT_FAILURE,
      error: err.response.data,
    });
  }
}

function AddContactAPI(data) {
  return axios.post('/contact', data);
}

function* AddContact(action) {
  try {
    const result = yield call(AddContactAPI, action.data);
    yield put({
      type: ADD_CONTACT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_CONTACT_FAILURE,
      data: err.response.data,
    });
  }
}

function AddAccountAPI(data) {
  return axios.post(`/contact/${data.contactId}/account`, data);
}

function* AddAccount(action) {
  try {
    const result = yield call(AddAccountAPI, action.data);
    yield put({
      type: ADD_ACCOUNT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_ACCOUNT_FAILURE,
      error: err.response.data,
    });
  }
}

function AddTelAPI(data) {
  return axios.post(`/contact/${data.contactId}/tel`, data);
}

function* AddTel(action) {
  try {
    const result = yield call(AddTelAPI, action.data);
    yield put({
      type: ADD_TEL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_TEL_FAILURE,
      error: err.response.data,
    });
  }
}


function* watchLoadcontact() {
  yield takeLatest(LOAD_CONTACT_REQUEST, LoadContact);
}

function* watchAddcontact() {
  yield takeLatest(ADD_CONTACT_REQUEST, AddContact);
}

function* watchAddaccount() {
  yield takeLatest(ADD_ACCOUNT_REQUEST, AddAccount);
}

function* watchAddTel() {
  yield takeLatest(ADD_TEL_REQUEST, AddTel);
}

export default function* companySaga() {
  yield all([
    fork(watchLoadcontact),
    fork(watchAddcontact),
    fork(watchAddaccount),
    fork(watchAddTel),
  ]);
}