import { all , fork , call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOADS_PARTY_REQUEST,
  LOADS_PARTY_SUCCESS,
  LOADS_PARTY_FAILURE,
  LOAD_PARTY_REQUEST,
  LOAD_PARTY_SUCCESS,
  LOAD_PARTY_FAILURE,
  VIEWMORE_PARTY_REQUEST,
  VIEWMORE_PARTY_SUCCESS,
  VIEWMORE_PARTY_FAILURE,
  ADD_PARTY_REQUEST,
  ADD_PARTY_SUCCESS,
  ADD_PARTY_FAILURE,
  ADD_PARTY_CODE_REQUEST,
  ADD_PARTY_CODE_SUCCESS,
  ADD_PARTY_CODE_FAILURE,
  ADD_GUIDE_REQUEST,
  ADD_GUIDE_SUCCESS,
  ADD_GUIDE_FAILURE,
  ADD_AIRNUMBER_REQUEST,
  ADD_AIRNUMBER_SUCCESS,
  ADD_AIRNUMBER_FAILURE,
} from '../reducers/party';
import { ADD_PARTY_CONFIRM } from '../reducers/booking';

function LoadPartyAPI(data) {
  return axios.get(`/party/${data}`);
}

function* LoadParty(action) {
  try {
    const result = yield call(LoadPartyAPI, action.data);
    yield put({
      type: LOAD_PARTY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_PARTY_FAILURE,
      error: err.response.data,
    });
  }
}


function LoadsPartyAPI(offset,end,start,search) {
  if(start === undefined){
    return axios.get(`/party?offset=${offset || 0}`);
  }
  if((end === undefined) && (search === "")){
    return axios.get(`/party?start=${start}&offset=${offset || 0}`); //에러남
  }
  if(end === undefined){
    return axios.get(`/party?start=${start}&search=${search}&offset=${offset || 0}`); //실행됨
  }
  if(search === ""){
    return axios.get(`/party?start=${start}&end=${end}&offset=${offset || 0}`); //에러남
  }
  return axios.get(`/party?&start=${start}&end=${end}&search=${search}&offset=${offset || 0}`); 
}

function* LoadsParty(action) {
  try {
    const result = yield call(LoadsPartyAPI, action.offset,action.end, action.start,action.search);
    yield put({
      type: LOADS_PARTY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOADS_PARTY_FAILURE,
      error: err.response.data,
    });
  }
}



function ViewMorePartyAPI(offset,end,start,search) {
  if(start === undefined){
    return axios.get(`/party?offset=${offset}`);
  }
  if((end === undefined) && (search === "")){
    return axios.get(`/party?start=${start}&offset=${offset}`); //에러남
  }
  if(end === undefined){
    return axios.get(`/party?start=${start}&search=${search}&offset=${offset}`); //실행됨
  }
  if(search === ""){
    return axios.get(`/party?start=${start}&end=${end}&offset=${offset}`); //에러남
  }
  return axios.get(`/party?&start=${start}&end=${end}&search=${search}&offset=${offset}`); 
}

function* ViewMoreParty(action) {
  try {
    const result = yield call(ViewMorePartyAPI, action.offset,action.end, action.start,action.search);
    yield put({
      type: VIEWMORE_PARTY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: VIEWMORE_PARTY_FAILURE,
      error: err.response.data,
    });
  }
}

function AddpartyAPI(data){
    return axios.post('/party', data)
}
function* Addparty(action) {
    try{
        const result = yield call(AddpartyAPI, action.data);
        yield put({
            type: ADD_PARTY_SUCCESS,
            data: result.data,
        });
    }catch(err){
        yield put({
            type:ADD_PARTY_FAILURE,
            error: err.response.data,
        })
    }
}

function AddpartycodeAPI(data){
  return axios.post(`/party/${data.partyId}/confirm`, data)
}

function* Addpartycode(action) {
  try{
      const result = yield call(AddpartycodeAPI, action.data);
      yield put({
          type: ADD_PARTY_CODE_SUCCESS,
          data: result.data,
      });
      yield put({
        type:ADD_PARTY_CONFIRM,
        data: result.data,
      })
  }catch(err){
      yield put({
          type:ADD_PARTY_CODE_FAILURE,
          error: err.response.data,
      })
  }
}

function AddGuideAPI(data){
  return axios.post(`/party/${data.partyId}/guide`, data)
}

function* AddGuide(action) {
  try{
      const result = yield call(AddGuideAPI, action.data);
      yield put({
          type: ADD_GUIDE_SUCCESS,
          data: result.data,
      });
  }catch(err){
      yield put({
          type: ADD_GUIDE_FAILURE,
          error: err.response.data,
      })
  }
}


function AddAirnumberAPI(data){
  return axios.post(`/party/${data.partyId}/airnumber`, data)
}

function* AddAirnumber(action) {
  try{
      const result = yield call(AddAirnumberAPI, action.data);
      yield put({
          type: ADD_AIRNUMBER_SUCCESS,
          data: result.data,
      });
  }catch(err){
      yield put({
          type:ADD_AIRNUMBER_FAILURE,
          error: err.response.data,
      })
  }
}

function* watchLoadsParty(){
    yield takeLatest(LOADS_PARTY_REQUEST, LoadsParty)
}

function* watchLoadParty(){
  yield takeLatest(LOAD_PARTY_REQUEST, LoadParty)
}

function* watchViewMoreParty(){
  yield takeLatest(VIEWMORE_PARTY_REQUEST, ViewMoreParty)
}

function* watchAddParty(){
  yield takeLatest(ADD_PARTY_REQUEST, Addparty); 
}


function* watchAddPartycode(){
  yield takeLatest(ADD_PARTY_CODE_REQUEST, Addpartycode); 
}

function* watchAddGuide(){
  yield takeLatest(ADD_GUIDE_REQUEST, AddGuide); 
}

function* watchAddAirnumber(){
  yield takeLatest(ADD_AIRNUMBER_REQUEST, AddAirnumber); 
}

export default function* partySaga() {
  yield all([
    fork(watchLoadsParty),
    fork(watchLoadParty),
    fork(watchAddParty),
    fork(watchAddPartycode),
    fork(watchAddGuide),
    fork(watchViewMoreParty),
    fork(watchAddAirnumber),
  ]);
}