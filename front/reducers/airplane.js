import produce from '../util/produce';

export const initialState = {
  airplanePost: [],
  airnumberPost: [],
  hasmorePosts: true,
  loadAirplanesLoading: false,
  loadAirplanesDone: false,
  loadAirplanesError: null,

  loadAirnumberLoading: false,
  loadAirnumberDone: false,
  loadAirnumberError: null,

  addAirplaneLoading: false,
  addAirplaneDone: false,
  addAirplaneError: null,
  
  addAirplaneNumberLoading: false,
  addAirplaneNumberDone: false,
  addAirplaneNumberError: null,
};

export const LOAD_AIRPLANE_REQUEST = 'LOAD_AIRPLANE_REQUEST';
export const LOAD_AIRPLANE_SUCCESS = 'LOAD_AIRPLANE_SUCCESS';
export const LOAD_AIRPLANE_FAILURE = 'LOAD_AIRPLANE_FAILURE';

export const LOAD_AIRNUMBER_REQUEST = 'LOAD_AIRNUMBER_REQUEST';
export const LOAD_AIRNUMBER_SUCCESS = 'LOAD_AIRNUMBER_SUCCESS';
export const LOAD_AIRNUMBER_FAILURE = 'LOAD_AIRNUMBER_FAILURE';

export const ADD_AIRPLANE_REQUEST = 'ADD_AIRPLANE_REQUEST';
export const ADD_AIRPLANE_SUCCESS = 'ADD_AIRPLANE_SUCCESS';
export const ADD_AIRPLANE_FAILURE = 'ADD_AIRPLANE_FAILURE';

export const ADD_AIRPLANENUMBER_REQUEST = 'ADD_AIRPLANENUMBER_REQUEST';
export const ADD_AIRPLANENUMBER_SUCCESS = 'ADD_AIRPLANENUMBER_SUCCESS';
export const ADD_AIRPLANENUMBER_FAILURE = 'ADD_AIRPLANENUMBER_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_AIRPLANE_REQUEST:
      draft.loadAirplanesLoading = true;
      draft.loadAirplanesDone = false;
      draft.loadAirplanesError = null;
      break;
    case LOAD_AIRPLANE_SUCCESS:
      draft.loadAirplanesLoading = false;
      draft.loadAirplanesDone = true;
      draft.airplanePost = draft.airplanePost.concat(action.data);
      draft.hasmorePosts = action.data.length === 10;
      break;
    case LOAD_AIRPLANE_FAILURE:
      draft.loadAirplanesLoading = false;
      draft.loadAirplanesError = action.error;
      break;
    case LOAD_AIRNUMBER_REQUEST:
      draft.loadAirnumberLoading = true;
      draft.loadAirnumberDone = false;
      draft.loadAirnumberError = null;
      break;
    case LOAD_AIRNUMBER_SUCCESS:
      draft.loadAirnumberLoading = false;
      draft.loadAirnumberDone = true;
      draft.airnumberPost = action.data;
      break;
    case LOAD_AIRNUMBER_FAILURE:
      draft.loadAirnumberLoading = false;
      draft.loadAirnumberError = action.error;
      break;
    case ADD_AIRPLANE_REQUEST:
      draft.addAirplaneLoading = true;
      draft.addAirplaneDone = false;
      draft.addAirplaneError = null;
      break;
    case ADD_AIRPLANE_SUCCESS:
      draft.addAirplaneLoading = false;
      draft.addAirplaneDone = true;
      draft.airplanePost.unshift(action.data);
      break;
    case ADD_AIRPLANE_FAILURE:
      draft.addAirplaneLoading = false;
      draft.addAirplaneError = action.error;
      break;
    case ADD_AIRPLANENUMBER_REQUEST:
      draft.addAirplaneNumberLoading = true;
      draft.addAirplaneNumberDone = false;
      draft.addAirplaneNumberError = null;
      break;
    case ADD_AIRPLANENUMBER_SUCCESS:
      const airplane = draft.airplanePost.find((v) => v.id === action.data.AirplaneId);
      airplane.airnumbers.unshift(action.data);
      draft.addAirplaneNumberLoading = false;
      draft.addAirplaneNumberDone = true;
      break;
    case ADD_AIRPLANENUMBER_FAILURE:
      draft.addAirplaneNumberLoading = false;
      draft.addAirplaneNumberError = action.error;
      break;
    default:
      break;
  }
});

export default reducer;