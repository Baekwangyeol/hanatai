import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_HOTELS_REQUEST,
  LOAD_HOTELS_SUCCESS,
  LOAD_HOTELS_FAILURE,
  LOAD_HOTEL_REQUEST,
  LOAD_HOTEL_SUCCESS,
  LOAD_HOTEL_FAILURE,
  ADD_HOTEL_REQUEST,
  ADD_HOTEL_SUCCESS,
  ADD_HOTEL_FAILURE,
  UPLOAD_MAINIMAGE_REQUEST,
  UPLOAD_MAINIMAGE_SUCCESS,
  UPLOAD_MAINIMAGE_FAILURE,
  HOTEL_CONTACT_REQUEST,
  HOTEL_CONTACT_SUCCESS,
  HOTEL_CONTACT_FAILURE,
  ADD_ROOMTYPE_REQUEST,
  ADD_ROOMTYPE_SUCCESS,
  ADD_ROOMTYPE_FAILURE,
  ADD_PRICE_REQUEST,
  ADD_PRICE_SUCCESS,
  ADD_PRICE_FAILURE,
} from '../reducers/hotel';

function LoadHotelsAPI(lastId) {
  return axios.get('/hotel');
}

function* LoadHotels(action) {
  try {
    const result = yield call(LoadHotelsAPI, action.lastId);
    yield put({
      type: LOAD_HOTELS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_HOTELS_FAILURE,
      error: err.response.data,
    });
  }
}

function uploadMainImageAPI(data) {
  return axios.post('/hotel/image', data); //formdata는 그대로 보내주기
};

function* uploadMainImage(action) {
  try {
    const result = yield call(uploadMainImageAPI, action.data);
    yield put({
      type: UPLOAD_MAINIMAGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UPLOAD_MAINIMAGE_FAILURE,
      error: err.response.data,
    });
  }
}

function LoadHotelAPI(data) {
  return axios.get(`/hotel/${data}`);
}

function* LoadHotel(action) {
  try {
    const result = yield call(LoadHotelAPI, action.data);
    yield put({
      type: LOAD_HOTEL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_HOTEL_FAILURE,
      error: err.response.data,
    });
  }
}

function AddHotelAPI(data) {
  return axios.post('/hotel', data);
}

function* AddHotel(action) {
  try {
    const result = yield call(AddHotelAPI, action.data);
    yield put({
      type: ADD_HOTEL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_HOTEL_FAILURE,
      error: err.response.data,
    });
  }
}

function hotelContactAPI(data) {
  return axios.post(`/hotel/${data.hotelId}/contact`, data); //hotel/1/contact
}
//일부변경 patch

function* hotelContact(action) {
  try {
    const result = yield call(hotelContactAPI, action.data);
    yield put({
      type: HOTEL_CONTACT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: HOTEL_CONTACT_FAILURE,
      error: err.response.data,
    });
  }
}

function AddroomtypeAPI(data) {
  return axios.post(`/hotel/${data.hotelId}/roomtype`, data);
}

function* Addroomtype(action) {
  try {
    const result = yield call(AddroomtypeAPI, action.data);
    yield put({
      type: ADD_ROOMTYPE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_ROOMTYPE_FAILURE,
      error: err.response.data,
    });
  }
}


function AddPriceAPI(data) {
  return axios.post(`/hotel/${data.roomtypeId}/price`, data);
}

function* AddPrice(action) {
  try {
    const result = yield call(AddPriceAPI, action.data);
    yield put({
      type: ADD_PRICE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_PRICE_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddhotel() {
  yield takeLatest(ADD_HOTEL_REQUEST, AddHotel);
}

function* watchLoadhotels() {
  yield takeLatest(LOAD_HOTELS_REQUEST, LoadHotels);
}

function* watchLoadhotel() {
  yield takeLatest(LOAD_HOTEL_REQUEST, LoadHotel);
}

function* watchUploadMainImage() {
  yield takeLatest(UPLOAD_MAINIMAGE_REQUEST, uploadMainImage);
}

function* watchHotelContact() {
  yield takeLatest(HOTEL_CONTACT_REQUEST, hotelContact);
}

function* watchAddRoomtype() {
  yield takeLatest(ADD_ROOMTYPE_REQUEST, Addroomtype);
}

function* watchAddPrice() {
  yield takeLatest(ADD_PRICE_REQUEST, AddPrice);
}

export default function* hotelSaga() {
  yield all([
    fork(watchAddhotel),
    fork(watchLoadhotels),
    fork(watchLoadhotel),
    fork(watchUploadMainImage),
    fork(watchHotelContact),
    fork(watchAddRoomtype),
    fork(watchAddPrice),
  ]);
}