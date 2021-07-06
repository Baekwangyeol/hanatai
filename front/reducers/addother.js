import produce from '../util/produce';

export const initialState = {
  countryPost: [],
  hasmoreCountry: true,
  loadCountrysLoading: false,
  loadCountrysDone: false,
  loadCountrysError: null,

  addCountryLoading: false,
  addCountryDone: false,
  addCountryError: null,

  removeCountryLoading: false,
  removeCountryDone: false,
  removeCountryError: null,

  regionPost: [],
  hasmoreRegion: true,
  loadRegionLoading: false,
  loadRegionDone: false,
  loadRegionError: null,

  addRegionLoading: false,
  addRegionDone: false,
  addRegionError: null,

  messengerPost: [],
  hasmoreMessenger: true,
  loadMessengerLoading: false,
  loadMessengerDone: false,
  loadMessengerError: null,

  addMessengerLoading: false,
  addMessengerDone: false,
  addMessengerError: null,

};

export const LOAD_COUNTRY_REQUEST = 'LOAD_COUNTRY_REQUEST';
export const LOAD_COUNTRY_SUCCESS = 'LOAD_COUNTRY_SUCCESS';
export const LOAD_COUNTRY_FAILURE = 'LOAD_COUNTRY_FAILURE';

export const ADD_COUNTRY_REQUEST = 'ADD_COUNTRY_REQUEST';
export const ADD_COUNTRY_SUCCESS = 'ADD_COUNTRY_SUCCESS';
export const ADD_COUNTRY_FAILURE = 'ADD_COUNTRY_FAILURE';

export const REMOVE_COUNTRY_REQUEST = 'REMOVE_COUNTRY_REQUEST';
export const REMOVE_COUNTRY_SUCCESS = 'REMOVE_COUNTRY_SUCCESS';
export const REMOVE_COUNTRY_FAILURE = 'REMOVE_COUNTRY_FAILURE';

export const LOAD_REGION_REQUEST = 'LOAD_REGION_REQUEST';
export const LOAD_REGION_SUCCESS = 'LOAD_REGION_SUCCESS';
export const LOAD_REGION_FAILURE = 'LOAD_REGION_FAILURE';

export const ADD_REGION_REQUEST = 'ADD_REGION_REQUEST';
export const ADD_REGION_SUCCESS = 'ADD_REGION_SUCCESS';
export const ADD_REGION_FAILURE = 'ADD_REGION_FAILURE';

export const LOAD_MESSENGER_REQUEST = 'LOAD_MESSENGER_REQUEST';
export const LOAD_MESSENGER_SUCCESS = 'LOAD_MESSENGER_SUCCESS';
export const LOAD_MESSENGER_FAILURE = 'LOAD_MESSENGER_FAILURE';

export const ADD_MESSENGER_REQUEST = 'ADD_MESSENGER_REQUEST';
export const ADD_MESSENGER_SUCCESS = 'ADD_MESSENGER_SUCCESS';
export const ADD_MESSENGER_FAILURE = 'ADD_MESSENGER_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_COUNTRY_REQUEST:
      draft.loadCountrysLoading = true;
      draft.loadCountrysDone = false;
      draft.loadCountrysError = null;
      break;
    case LOAD_COUNTRY_SUCCESS:
      draft.loadCountrysLoading = false;
      draft.loadCountrysDone = true;
      draft.countryPost = draft.countryPost.concat(action.data);
      draft.hasmoreCountry = action.data.length === 10;
      break;
    case LOAD_COUNTRY_FAILURE:
      draft.loadCountrysLoading = false;
      draft.loadCountrysError = action.error;
      break;
    case ADD_COUNTRY_REQUEST:
      draft.addCountryLoading = true;
      draft.addCountryDone = false;
      draft.addCountryError = null;
      break;
    case ADD_COUNTRY_SUCCESS:
      draft.addCountryLoading = false;
      draft.addCountryDone = true;
      draft.countryPost.unshift(action.data);
      break;
    case ADD_COUNTRY_FAILURE:
      draft.addCountryLoading = false;
      draft.addCountryError = action.error;
      break;
    case REMOVE_COUNTRY_REQUEST:
      draft.removeCountryLoading = true;
      draft.removeCountryDone = false;
      draft.removeCountryError = null;
      break;
    case REMOVE_COUNTRY_SUCCESS:
      draft.removeCountryLoading = false;
      draft.removeCountryDone = true;
      draft.countryPost = draft.countryPost.filter((v) => v.id !== action.data.CountryId);
      break;
    case REMOVE_COUNTRY_FAILURE:
      draft.removeCountryLoading = false;
      draft.removeCountryError = action.error;
      break;
    case LOAD_REGION_REQUEST:
      draft.loadRegionLoading = true;
      draft.loadRegionDone = false;
      draft.loadRegionError = null;
      break;
    case LOAD_REGION_SUCCESS:
      draft.loadRegionLoading = false;
      draft.loadRegionDone = true;
      draft.regionPost = draft.regionPost.concat(action.data);
      draft.hasmoreRegion = action.data.length === 10;
      break;
    case LOAD_REGION_FAILURE:
      draft.loadRegionLoading = false;
      draft.loadRegionError = action.error;
      break;
    case ADD_REGION_REQUEST:
      draft.addRegionLoading = true;
      draft.addRegionDone = false;
      draft.addRegionError = null;
      break;
    case ADD_REGION_SUCCESS:
      draft.addRegionLoading = false;
      draft.addRegionDone = true;
      draft.regionPost.unshift(action.data);
      break;
    case ADD_REGION_FAILURE:
      draft.addRegionLoading = false;
      draft.addRegionError = action.error;
      break;
    case LOAD_MESSENGER_REQUEST:
      draft.loadMessengerLoading = true;
      draft.loadMessengerDone = false;
      draft.loadMessengerError = null;
      break;
    case LOAD_MESSENGER_SUCCESS:
      draft.loadMessengerLoading = false;
      draft.loadMessengerDone = true;
      draft.messengerPost = draft.messengerPost.concat(action.data);
      draft.hasmoreMessenger = action.data.length === 10;
      break;
    case LOAD_MESSENGER_FAILURE:
      draft.loadMessengerLoading = false;
      draft.loadMessengerError = action.error;
      break;
    case ADD_MESSENGER_REQUEST:
      draft.addMessengerLoading = true;
      draft.addMessengerDone = false;
      draft.addMessengerError = null;
      break;
    case ADD_MESSENGER_SUCCESS:
      draft.addMessengerLoading = false;
      draft.addMessengerDone = true;
      draft.messengerPost.unshift(action.data);
      break;
    case ADD_MESSENGER_FAILURE:
      draft.addMessengerLoading = false;
      draft.addMessengerError = action.error;
      break;
    default:
      break;
  }
});

export default reducer;