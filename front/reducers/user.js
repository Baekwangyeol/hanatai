import produce from '../util/produce';

export const initialState = {
  loginLoading: false, // 로그인시도중
  loginDone: false,
  loginError: null,

  logOutLoading: false, //로그아웃시도중
  logOutDone: false,
  logOutError: null,

  loadGuideLoading: false, //로그아웃시도중
  loadGuideDone: false,
  loadGuideError: null,

  signUpLoading: false, //회원가입시도중
  signUpDone: false,
  signUpError: null,

  me: null,
  userInfo: null,
  guidePost: [],
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUREST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUREST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const LOAD_GUIDE_REQUEST = 'LOAD_GUIDE_REQUREST';
export const LOAD_GUIDE_SUCCESS = 'LOAD_GUIDE_SUCCESS';
export const LOAD_GUIDE_FAILURE = 'LOAD_GUIDE_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUREST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      draft.loginLoading = true;
      draft.loginError = null;
      draft.loginDone = false;
      break;
    case LOG_IN_SUCCESS:
      draft.loginLoading = false;
      draft.loginDone = true;
      draft.me = action.data;
      break;
    case LOG_IN_FAILURE:
      draft.loginLoading = false;
      draft.loginError = action.error;
      break;
    case LOAD_MY_INFO_REQUEST:
      draft.loginLoading = true;
      draft.loginError = null;
      draft.loginDone = false;
      break;
    case LOAD_MY_INFO_SUCCESS:
      draft.loginLoading = false;
      draft.loginDone = true;
      draft.me = action.data;
      break;
    case LOAD_MY_INFO_FAILURE:
      draft.loginLoading = false;
      draft.loginError = action.error;
      break;
    case LOAD_GUIDE_REQUEST:
      draft.loadGuideLoading = true;
      draft.loadGuideError = null;
      draft.loadGuideDone = false;
      break;
    case LOAD_GUIDE_SUCCESS:
      draft.loadGuideLoading = false;
      draft.loadGuideDone = true;
      draft.guidePost = draft.guidePost.concat(action.data);
      break;
    case LOAD_GUIDE_FAILURE:
      draft.loadGuideLoading = false;
      draft.loadGuideError = action.error;
      break;
    case LOG_OUT_REQUEST:
      draft.logOutLoading = true;
      draft.logOutError = null;
      draft.logOutDone = false;
      break;
    case LOG_OUT_SUCCESS:
      draft.logOutLoading = false;
      draft.me = null;
      draft.logOutDone = true;
      break;
    case LOG_OUT_FAILURE:
      draft.logOutLoading = false;
      draft.logOutError = action.error;
      break;
    case SIGN_UP_REQUEST:
      draft.signUpLoading = true;
      draft.signUpError = null;
      draft.signUpDone = false;
      break;
    case SIGN_UP_SUCCESS:
      draft.signUpLoading = false;
      draft.signUpDone = true;
      break;
    case SIGN_UP_FAILURE:
      draft.signUpLoading = false;
      draft.signUpError = action.error;
      break;
    default:
      break;
  }
});
export default reducer;