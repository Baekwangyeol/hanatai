import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_COMPANY_REQUEST,
  LOAD_COMPANY_SUCCESS,
  LOAD_COMPANY_FAILURE,
  ADD_COMPANY_REQUEST,
  ADD_COMPANY_SUCCESS,
  ADD_COMPANY_FAILURE,
  ADD_COMPANYOPTION_REQUEST,
  ADD_COMPANYOPTION_SUCCESS,
  ADD_COMPANYOPTION_FAILURE,
} from '../reducers/company';

function LoadCompanyAPI(lastId) {
  return axios.get(`/company?lastId=${lastId || 0}`);
}

function* LoadCompany(action) {
  try {
    const result = yield call(LoadCompanyAPI, action.lastId);
    yield put({
      type: LOAD_COMPANY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_COMPANY_FAILURE,
      error: err.response.data,
    });
  }
}

function AddCompanyAPI(data) {
  return axios.post('/company', data);
}

function* AddCompany(action) {
  try {
    const result = yield call(AddCompanyAPI, action.data);
    yield put({
      type: ADD_COMPANY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMPANY_FAILURE,
      data: err.response.data,
    });
  }
}

function AddCompanyoptionAPI(data) {
  return axios.post(`/company/${data.CompanyId}/option`, data);
}

function* AddCompanyoption(action) {
  try {
    const result = yield call(AddCompanyoptionAPI, action.data);
    yield put({
      type: ADD_COMPANYOPTION_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMPANYOPTION_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchLoadcompany() {
  yield takeLatest(LOAD_COMPANY_REQUEST, LoadCompany);
}

function* watchAddcompany() {
  yield takeLatest(ADD_COMPANY_REQUEST, AddCompany);
}

function* watchAddcompanyoption() {
  yield takeLatest(ADD_COMPANYOPTION_REQUEST, AddCompanyoption);
}

export default function* companySaga() {
  yield all([
    fork(watchLoadcompany),
    fork(watchAddcompany),
    fork(watchAddcompanyoption),
  ]);
}