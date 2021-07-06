import { all , fork , call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_BUS_REQUEST,
  LOAD_BUS_SUCCESS,
  LOAD_BUS_FAILURE,
  ADD_BUS_REQUEST,
  ADD_BUS_SUCCESS,
  ADD_BUS_FAILURE,
} from '../reducers/bus';

function LoadBusAPI(lastId) {
  return axios.get(`/bus?lastId=${lastId || 0}`);
}

function* LoadBus(action) {
  try {
    const result = yield call(LoadBusAPI, action.lastId);
    yield put({
      type: LOAD_BUS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_BUS_FAILURE,
      error: err.response.data,
    });
  }
}

function AddBusAPI(data){
    return axios.post('/bus', data)
}
function* AddBus(action) {
    try{
        const result = yield call(AddBusAPI, action.data);
        yield put({
            type: ADD_BUS_SUCCESS,
            data: result.data,
        });
    }catch(err){
        yield put({
            type:ADD_BUS_FAILURE,
            error: err.response.data,
        })
    }
}


function* watchLoadBus(){
    yield takeLatest(LOAD_BUS_REQUEST, LoadBus)
}

function* watchAddBus(){
  yield takeLatest(ADD_BUS_REQUEST, AddBus); 
}


export default function* busSaga() {
  yield all([
    fork(watchLoadBus),
    fork(watchAddBus),
  ]);
}