import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOADS_BOOKING_REQUEST,
  LOADS_BOOKING_SUCCESS,
  LOADS_BOOKING_FAILURE,
  VIEW_MORE_REQUEST,
  VIEW_MORE_SUCCESS,
  VIEW_MORE_FAILURE,
  LOAD_BOOKING_REQUEST,
  LOAD_BOOKING_SUCCESS,
  LOAD_BOOKING_FAILURE,
  ADD_HANACODE_REQUEST,
  ADD_HANACODE_SUCCESS,
  ADD_HANACODE_FAILURE,
  ADD_RESERVECODE_REQUEST,
  ADD_RESERVECODE_SUCCESS,
  ADD_RESERVECODE_FAILURE,
  ADD_PEOPLE_REQUEST,
  ADD_PEOPLE_SUCCESS,
  ADD_PEOPLE_FAILURE,
  ADD_RESERVEROOM_REQUEST,
  ADD_RESERVEROOM_SUCCESS,
  ADD_RESERVEROOM_FAILURE,
  ADD_RESERVEOPTION_REQUEST,
  ADD_RESERVEOPTION_SUCCESS,
  ADD_RESERVEOPTION_FAILURE,
  UPDATE_CODESTATUS_REQUEST,
  UPDATE_CODESTATUS_SUCCESS,
  UPDATE_CODESTATUS_FAILURE,
  LOAD_TODAY_COUNT_REQUEST,
  LOAD_TODAY_COUNT_SUCCESS,
  LOAD_TODAY_COUNT_FAILURE,
  LOAD_CONFIRM_REQUEST,
  LOAD_CONFIRM_SUCCESS,
  LOAD_CONFIRM_FAILURE,
  DELETE_RESERVEROOM_REQUEST,
  DELETE_RESERVEROOM_SUCCESS,
  DELETE_RESERVEROOM_FAILURE,
  UPDATE_COD_REQUEST,
  UPDATE_COD_SUCCESS,
  UPDATE_COD_FAILURE,
  UPDATE_OTHERCODE_REQUEST,
  UPDATE_OTHERCODE_SUCCESS,
  UPDATE_OTHERCODE_FAILURE,
} from '../reducers/booking';


function LoadsBookingAPI(search,start,end,status,lastId) {
  console.log(search);
  if(status === undefined){
    return axios.get(`/booking?lastId=${lastId || 0}`);
  }
  if((end === undefined) && (search === "")){
    return axios.get(`/booking?status=${status || 'all'}&start=${start}`); //에러남
  }
  if(end === undefined){
    return axios.get(`/booking?status=${status || 'all'}&start=${start}&search=${search}`); //실행됨
  }
  if(search === ""){
    return axios.get(`/booking?status=${status || 'all'}&start=${start}&end=${end}`); //에러남
  }
  return axios.get(`/booking?status=${status || 'all'}&start=${start}&end=${end}&search=${search}`); //실행됨
  }
  
  function* LoadsBooking(action) {
    try {
      const result = yield call(LoadsBookingAPI, action.search, action.start, action.end, action.status,action.lastId);
      yield put({
        type: LOADS_BOOKING_SUCCESS,
        data: result.data,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: LOADS_BOOKING_FAILURE,
        error: err.response.data,
      });
    }
  }

  function ViewMoreAPI(search,start,end,status,lastId) {
    if((end === undefined) && (search === "")){
      return axios.get(`/booking?status=${status || 'all'}&start=${start}&lastId=${lastId || 0}`);
    }
    if(end === undefined){
      return axios.get(`/booking?status=${status || 'all'}&start=${start}&search=${search}&lastId=${lastId || 0}`);
    }
    if(search === ""){
      return axios.get(`/booking?status=${status || 'all'}&start=${start}&end=${end}&lastId=${lastId || 0}`);
    }
    return axios.get(`/booking?status=${status || 'all'}&start=${start}&end=${end}&search=${search}&lastId=${lastId || 0}`);
  }
  
  function* ViewMore(action) {
    try {
      const result = yield call(ViewMoreAPI, action.search, action.start, action.end, action.status,action.lastId);
      yield put({
        type: VIEW_MORE_SUCCESS,
        data: result.data,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: VIEW_MORE_FAILURE,
        error: err.response.data,
      });
    }
  }


function AddHanacodeAPI(data) {
    return axios.post('/booking', data);
  }
  
  function* AddHanacode(action) {
    try {
      const result = yield call(AddHanacodeAPI, action.data);
      yield put({
        type: ADD_HANACODE_SUCCESS,
        data: result.data,
      });
    } catch (err) {
      yield put({
        type: ADD_HANACODE_FAILURE,
        error: err.response.data,
      });
    }
  }

  
function LoadBookingAPI(data) {
  return axios.get(`/booking/${data}`);
}

function* LoadBooking(action) {
  try {
    const result = yield call(LoadBookingAPI, action.data);
    yield put({
      type: LOAD_BOOKING_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_BOOKING_FAILURE,
      error: err.response.data,
    });
  }
}

function AddReservecodeAPI(data) {
  return axios.post(`/booking/${data.bookingId}/reservecode`, data);
}

function* AddReservecode(action) {
  try {
    const result = yield call(AddReservecodeAPI, action.data);
    yield put({
      type: ADD_RESERVECODE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_RESERVECODE_FAILURE,
      error: err.response.data,
    });
  }
}

function AddPeopleAPI(data) {
  return axios.post(`/booking/${data.bookingId}/people`, data);
}

function* AddPeople(action) {
  try {
    const result = yield call(AddPeopleAPI, action.data);
    yield put({
      type: ADD_PEOPLE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_PEOPLE_FAILURE,
      error: err.response.data,
    });
  }
}


function AddReserveroomAPI(data) {
  return axios.post(`/booking/${data.peopleId}/reserveroom`, data);
}

function* AddReserveroom(action) {
  try {
    const result = yield call(AddReserveroomAPI, action.data);
    yield put({
      type: ADD_RESERVEROOM_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_RESERVEROOM_FAILURE,
      error: err.response.data,
    });
  }
}


function AddReserveoptionAPI(data) {
  return axios.post(`/booking/${data.peopleId}/option`, data);
}

function* AddReserveoption(action) {
  try {
    const result = yield call(AddReserveoptionAPI, action.data);
    yield put({
      type: ADD_RESERVEOPTION_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_RESERVEOPTION_FAILURE,
      error: err.response.data,
    });
  }
}


function UpdatecodeStatusAPI(data) {
  return axios.patch(`/booking/${data.hanacodeId}/codestatus`, data);
}

function* UpdatecodeStatus(action) {
  try {
    const result = yield call(UpdatecodeStatusAPI, action.data);
    yield put({
      type: UPDATE_CODESTATUS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UPDATE_CODESTATUS_FAILURE,
      error: err.response.data,
    });
  }
}


function LoadTodayCountAPI(data) {
  return axios.get(`/booking/count`, data);
}

function* LoadTodayCount(action) {
  try {
    const result = yield call(LoadTodayCountAPI, action.data);
    yield put({
      type: LOAD_TODAY_COUNT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_TODAY_COUNT_FAILURE,
      error: err.response.data,
    });
  }
}


function LoadConfirmAPI(data) {
  return axios.get(`/booking/confirm`, data);
}

function* LoadConfirm(action) {
  try {
    const result = yield call(LoadConfirmAPI, action.data);
    yield put({
      type: LOAD_CONFIRM_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_CONFIRM_FAILURE,
      error: err.response.data,
    });
  }
}


function DeleteReserveroomAPI(data) {
  return axios.delete(`/booking/${data.roomReserve}/${data.peopleId}/reserveroom`);
}

function* DeleteReserveroom(action) {
  try {
    const result = yield call(DeleteReserveroomAPI, action.data);
    yield put({
      type: DELETE_RESERVEROOM_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: DELETE_RESERVEROOM_FAILURE,
      error: err.response.data,
    });
  }
}

function UpdateCodroomAPI(data) {
  return axios.patch(`/booking/${data.peopleId}/cod`, data);
}

function* UpdateCodroom(action) {
  try {
    const result = yield call(UpdateCodroomAPI, action.data);
    yield put({
      type: UPDATE_COD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UPDATE_COD_FAILURE,
      error: err.response.data,
    });
  }
}

function UpdateOthercoderoomAPI(data) {
  return axios.patch(`/booking/${data.peopleId}/othercode`, data);
}

function* UpdateOthercoderoom(action) {
  try {
    const result = yield call(UpdateOthercoderoomAPI, action.data);
    yield put({
      type: UPDATE_OTHERCODE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UPDATE_OTHERCODE_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddHanacode() {
  yield takeLatest(ADD_HANACODE_REQUEST, AddHanacode);
}

function* watchLoadsBooking() {
    yield takeLatest(LOADS_BOOKING_REQUEST, LoadsBooking);
  }
  
function* watchViewMore() {
  yield takeLatest(VIEW_MORE_REQUEST, ViewMore);
}
  
  function* watchLoadBooking() {
    yield takeLatest(LOAD_BOOKING_REQUEST, LoadBooking);
  }

  function* watchAddReservecode() {
    yield takeLatest(ADD_RESERVECODE_REQUEST, AddReservecode);
  }

  function* watchAddPeople() {
    yield takeLatest(ADD_PEOPLE_REQUEST, AddPeople);
  }

  function* watchAddReserveroom() {
    yield takeLatest(ADD_RESERVEROOM_REQUEST, AddReserveroom);
  }

  function* watchAddReserveoption() {
    yield takeLatest(ADD_RESERVEOPTION_REQUEST, AddReserveoption);
  }

  function* watchUpdatecodeStatus() {
    yield takeLatest(UPDATE_CODESTATUS_REQUEST, UpdatecodeStatus);
  }

  function* watchLoadTodayCount() {
    yield takeLatest(LOAD_TODAY_COUNT_REQUEST, LoadTodayCount);
  }

  function* watchLoadConfirm() {
    yield takeLatest(LOAD_CONFIRM_REQUEST, LoadConfirm);
  }

  function* watchdeleteRerserveroom() {
    yield takeLatest(DELETE_RESERVEROOM_REQUEST, DeleteReserveroom);
  }

  function* watchupdateCodroom() {
    yield takeLatest(UPDATE_COD_REQUEST, UpdateCodroom);
  }


  function* watchupdateOthercode() {
    yield takeLatest(UPDATE_OTHERCODE_REQUEST, UpdateOthercoderoom);
  }

export default function* airplaneSaga() {
  yield all([
    fork(watchLoadsBooking),
    fork(watchViewMore),
    fork(watchAddHanacode),
    fork(watchLoadBooking),
    fork(watchAddReservecode),
    fork(watchAddPeople),
    fork(watchAddReserveroom),
    fork(watchAddReserveoption),
    fork(watchUpdatecodeStatus),
    fork(watchLoadTodayCount),
    fork(watchLoadConfirm),
    fork(watchdeleteRerserveroom),
    fork(watchupdateCodroom),
    fork(watchupdateOthercode),
  ]);
}