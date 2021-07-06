import { all, fork, takeLatest,call, put } from 'redux-saga/effects';
import axios from 'axios';
import { 
    LOAD_OPTION_REQUEST,
    LOAD_OPTION_SUCCESS,
    LOAD_OPTION_FAILURE,
    LOAD_DETAIL_REQUEST,
    LOAD_DETAIL_SUCCESS,
    LOAD_DETAIL_FAILURE,
    ADD_OPTION_REQUEST,
    ADD_OPTION_SUCCESS,
    ADD_OPTION_FAILURE,
    ADD_DETAIL_REQUEST,
    ADD_DETAIL_SUCCESS,
    ADD_DETAIL_FAILURE,
} from '../reducers/option';

function LoadOptionAPI(lastId){
    return axios.get('/option')
}

function* LoadOption(action){
    try{
        const result = yield call(LoadOptionAPI, action.lastId);
        yield put({
            type: LOAD_OPTION_SUCCESS,
            data: result.data,
        })
    } catch (err){
        console.error(err);
        yield put({
            type:LOAD_OPTION_FAILURE,
            error: err.response.data,
        })
    }
}

function LoadDetailAPI(data){
  return axios.get(`/option/${data}/detail`)
}

function* LoadDetail(action){
  try{
      const result = yield call(LoadDetailAPI, action.data);
      yield put({
          type: LOAD_DETAIL_SUCCESS,
          data: result.data,
      })
  } catch (err){
      console.error(err);
      yield put({
          type:LOAD_DETAIL_FAILURE,
          error: err.response.data,
      })
  }
}

function AddOptionAPI(data) {
    return axios.post(`/option`, data);
  }
  
  function* AddOption(action) {
    try {
      const result = yield call(AddOptionAPI, action.data);
      yield put({
        type: ADD_OPTION_SUCCESS,
        data: result.data,
      });
    } catch (err) {
      yield put({
        type: ADD_OPTION_FAILURE,
        error: err.response.data,
      });
    }
  }

  function AddDetailAPI(data) {
    return axios.post(`/option/${data.optionId}/detail`, data);
  }
  
  function* AddDetail(action) {
    try {
      const result = yield call(AddDetailAPI, action.data);
      yield put({
        type: ADD_DETAIL_SUCCESS,
        data: result.data,
      });
    } catch (err) {
      yield put({
        type: ADD_DETAIL_FAILURE,
        error: err.response.data,
      });
    }
  }

function* watchLoadOption() {
    yield takeLatest(LOAD_OPTION_REQUEST, LoadOption);
}

function* watchLoadDetail() {
  yield takeLatest(LOAD_DETAIL_REQUEST, LoadDetail);
}

function* watchAddOption() {
    yield takeLatest(ADD_OPTION_REQUEST, AddOption);
}

function* watchAddDetail() {
  yield takeLatest(ADD_DETAIL_REQUEST, AddDetail);
}


export default function* optionSaga() {
    yield all([
        fork(watchLoadOption),
        fork(watchLoadDetail),
        fork(watchAddOption),
        fork(watchAddDetail),
    ]);
}