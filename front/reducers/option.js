import produce from '../util/produce';

export const initialState = {
  optionPost: [],
  detailPost: [],
  loadOptionLoading: false,
  loadOptionDone: false,
  loadOptionError: null,

  loadDetailLoading: false,
  loadDetailDone: false,
  loadDetailError: null,

  addOptionLoading: false,
  addOptionDone: false,
  addOptionError: null,

  addDetailLoading: false,
  addDetailDone: false,
  addDetailError: null,
};

export const LOAD_OPTION_REQUEST = 'LOAD_OPTION_REQUEST';
export const LOAD_OPTION_SUCCESS = 'LOAD_OPTION_SUCCESS';
export const LOAD_OPTION_FAILURE = 'LOAD_OPTION_FAILURE';

export const LOAD_DETAIL_REQUEST = 'LOAD_DETAIL_REQUEST';
export const LOAD_DETAIL_SUCCESS = 'LOAD_DETAIL_SUCCESS';
export const LOAD_DETAIL_FAILURE = 'LOAD_DETAIL_FAILURE';

export const ADD_OPTION_REQUEST = 'ADD_OPTION_REQUEST';
export const ADD_OPTION_SUCCESS = 'ADD_OPTION_SUCCESS';
export const ADD_OPTION_FAILURE = 'ADD_OPTION_FAILURE';

export const ADD_DETAIL_REQUEST = 'ADD_DETAIL_REQUEST';
export const ADD_DETAIL_SUCCESS = 'ADD_DETAIL_SUCCESS';
export const ADD_DETAIL_FAILURE = 'ADD_DETAIL_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_OPTION_REQUEST:
      draft.loadOptionLoading = true;
      draft.loadOptionDone = false;
      draft.loadOptionError = null;
      break;
    case LOAD_OPTION_SUCCESS:
      draft.loadOptionLoading = false;
      draft.loadOptionDone = true;
      draft.optionPost = draft.optionPost.concat(action.data).reverse();
      break;
    case LOAD_OPTION_FAILURE:
      draft.loadOptionLoading = false;
      draft.loadOptionError = action.error;
      break;
    case LOAD_DETAIL_REQUEST:
      draft.loadDetailLoading = true;
      draft.loadDetailDone = false;
      draft.loadDetailError = null;
      break;
    case LOAD_DETAIL_SUCCESS:
      draft.loadDetailLoading = false;
      draft.loadDetailDone = true;
      draft.detailPost = action.data;
      break;
    case LOAD_DETAIL_FAILURE:
      draft.loadDetailLoading = false;
      draft.loadDetailError = action.error;
      break;
    case ADD_OPTION_REQUEST:
      draft.addOptionLoading = true;
      draft.addOptionDone = false;
      draft.addOptionError = null;
      break;
    case ADD_OPTION_SUCCESS:
      draft.addOptionLoading = false;
      draft.addOptionDone = true;
      draft.optionPost.push(action.data);
      break;
    case ADD_OPTION_FAILURE:
      draft.addOptionLoading = false;
      draft.addOptionError = action.error;
      break;
    case ADD_DETAIL_REQUEST:
      draft.addDetailLoading = true;
      draft.addDetailDone = false;
      draft.addDetailError = null;
      break;
    case ADD_DETAIL_SUCCESS:
      const detail = draft.optionPost.find((v) => v.id === action.data.OptionId);
      detail.OptionDetails.push(action.data);
      draft.addDetailLoading = false;
      draft.addDetailDone = true;
      break;
    case ADD_DETAIL_FAILURE:
      draft.addDetailLoading = false;
      draft.addDetailError = action.error;
      break;
    default:
      break;
  }
});

export default reducer;