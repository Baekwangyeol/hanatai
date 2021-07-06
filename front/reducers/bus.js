import produce from '../util/produce';

export const initialState = {
  busPost: [],
  loadBusLoading: false,
  loadBusDone: false,
  loadBusError: null,

  addBusLoading: false,
  addBusDone: false,
  addBusError: null,
};

export const LOAD_BUS_REQUEST = 'LOAD_BUS_REQUEST';
export const LOAD_BUS_SUCCESS = 'LOAD_BUS_SUCCESS';
export const LOAD_BUS_FAILURE = 'LOAD_BUS_FAILURE';

export const ADD_BUS_REQUEST = 'ADD_BUS_REQUEST';
export const ADD_BUS_SUCCESS = 'ADD_BUS_SUCCESS';
export const ADD_BUS_FAILURE = 'ADD_BUS_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_BUS_REQUEST:
      draft.loadBusLoading = true;
      draft.loadBusDone = false;
      draft.loadBusError = null;
      break;
    case LOAD_BUS_SUCCESS:
      draft.loadBusLoading = false;
      draft.loadBusDone = true;
      draft.busPost = draft.busPost.concat(action.data).reverse();
      break;
    case LOAD_BUS_FAILURE:
      draft.addBusLoading = false;
      draft.addBusError = action.error;
      break;
    case ADD_BUS_REQUEST:
      draft.addBusLoading = true;
      draft.addBusDone = false;
      draft.addBusError = null;
      break;
    case ADD_BUS_SUCCESS:
      draft.addBusLoading = false;
      draft.addBusDone = true;
      draft.busPost.push(action.data);
      break;
    case ADD_BUS_FAILURE:
      draft.addBusLoading = false;
      draft.addBusError = action.error;
      break;
    default:
      break;
  }
});

export default reducer;