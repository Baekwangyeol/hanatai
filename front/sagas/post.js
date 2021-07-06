import { all , fork , call, put, takeLatest, throttle } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
} from '../reducers/post';

function loadPostsAPI() {
    return axios.get(`/posts`);
}

function* LoadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function addPostAPI(data){
    return axios.post('/post', data)
}
function* AddPost(action) {
    try{
        const result = yield call(addPostAPI, action.data);
        yield put({
            type: ADD_POST_SUCCESS,
            data: result.data,
        });
        yield put({
            type: ADD_POST_TO_ME,
            data: result.data.id
        })
    }catch(err){
        yield put({
            type:ADD_POST_FAILURE,
            error: err.response.data,
        })
    }
}

function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST, AddPost)
}

function* watchLoadPosts(){
  yield throttle(5000, LOAD_POSTS_REQUEST, LoadPosts);  //5초이내 다시 요청안되는것
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchAddPost),
  ]);
}