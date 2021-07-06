import produce from '../util/produce';

export const initialState = {
  partyPost: [],
  singleParty: null,
  hasmorePosts: true,
  loadsPartyLoading: false,
  loadsPartyDone: false,
  loadsPartyError: null,

  loadPartyLoading: false,
  loadPartyDone: false,
  loadPartyError: null,

  viewMorePartyLoading: false,
  viewMorePartyDone: false,
  viewMorePartyError: null,

  addPartyLoading: false,
  addPartyDone: false,
  addPartyError: null,

  addPartyCodeLoading: false,
  addPartyCodeDone: false,
  addPartyCodeError: null,

  addGuideLoading: false,
  addGuideDone: false,
  addGuideError: null,

  addAirnumberLoading: false,
  addAirnumberDone: false,
  addAirnumberError: null,
};

export const LOADS_PARTY_REQUEST = 'LOADS_PARTY_REQUEST';
export const LOADS_PARTY_SUCCESS = 'LOADS_PARTY_SUCCESS';
export const LOADS_PARTY_FAILURE = 'LOADS_PARTY_FAILURE';

export const LOAD_PARTY_REQUEST = 'LOAD_PARTY_REQUEST';
export const LOAD_PARTY_SUCCESS = 'LOAD_PARTY_SUCCESS';
export const LOAD_PARTY_FAILURE = 'LOAD_PARTY_FAILURE';

export const VIEWMORE_PARTY_REQUEST = 'VIEWMORE_PARTY_REQUEST';
export const VIEWMORE_PARTY_SUCCESS = 'VIEWMORE_PARTY_SUCCESS';
export const VIEWMORE_PARTY_FAILURE = 'VIEWMORE_PARTY_FAILURE';

export const ADD_PARTY_REQUEST = 'ADD_PARTY_REQUEST';
export const ADD_PARTY_SUCCESS = 'ADD_PARTY_SUCCESS';
export const ADD_PARTY_FAILURE = 'ADD_PARTY_FAILURE';

export const ADD_PARTY_CODE_REQUEST = 'ADD_PARTY_CODE_REQUEST';
export const ADD_PARTY_CODE_SUCCESS = 'ADD_PARTY_CODE_SUCCESS';
export const ADD_PARTY_CODE_FAILURE = 'ADD_PARTY_CODE_FAILURE';

export const ADD_GUIDE_REQUEST = 'ADD_GUIDE_REQUEST';
export const ADD_GUIDE_SUCCESS = 'ADD_GUIDE_SUCCESS';
export const ADD_GUIDE_FAILURE = 'ADD_GUIDE_FAILURE';

export const ADD_AIRNUMBER_REQUEST = 'ADD_AIRNUMBER_REQUEST';
export const ADD_AIRNUMBER_SUCCESS = 'ADD_AIRNUMBER_SUCCESS';
export const ADD_AIRNUMBER_FAILURE = 'ADD_AIRNUMBER_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOADS_PARTY_REQUEST:
      draft.loadsPartyLoading = true;
      draft.loadsPartyDone = false;
      draft.loadsPartyError = null;
      break;
    case LOADS_PARTY_SUCCESS:
      draft.loadsPartyLoading = false;
      draft.loadsPartyDone = true;
      draft.partyPost = action.data;
      draft.hasmorePosts = action.data.length === 10;
      break;
    case LOADS_PARTY_FAILURE:
      draft.loadsPartyLoading = false;
      draft.loadsPartyError = action.error;
      break;
    case LOAD_PARTY_REQUEST:
      draft.loadsPartyLoading = true;
      draft.loadsPartyDone = false;
      draft.loadsPartyError = null;
      break;
    case LOAD_PARTY_SUCCESS:
      draft.loadPartyLoading = false;
      draft.loadPartyDone = true;
      draft.singleParty = action.data;
      break;
    case LOAD_PARTY_FAILURE:
      draft.loadPartyLoading = false;
      draft.loadPartyError = action.error;
      break;
    case VIEWMORE_PARTY_REQUEST:
      draft.loadPartyLoading = true;
      draft.loadPartyDone = false;
      draft.loadPartyError = null;
      break;
    case VIEWMORE_PARTY_SUCCESS:
      draft.viewMorePartyLoading = false;
      draft.veiwMorePartyDone = true;
      draft.partyPost = draft.partyPost.concat(action.data);
      draft.hasmorePosts = action.data.length === 10;
      break;
    case VIEWMORE_PARTY_FAILURE:
      draft.viewMorePartyLoading = false;
      draft.viewMorePartyError = action.error;
      break;
    case ADD_PARTY_REQUEST:
      draft.addPartyLoading = true;
      draft.addPartyDone = false;
      draft.addPartyError = null;
      break;
    case ADD_PARTY_SUCCESS:
      draft.addPartyLoading = false;
      draft.addPartyDone = true;
      draft.partyPost.unshift(action.data);
      break;
    case ADD_PARTY_FAILURE:
      draft.addPartyLoading = false;
      draft.addPartyError = action.error;
      break;
    case ADD_PARTY_CODE_REQUEST:
      draft.addPartyCodeLoading = true;
      draft.addPartyCodeDone = false;
      draft.addPartyCodeError = null;
      break;
    case ADD_PARTY_CODE_SUCCESS:
      draft.addPartyCodeLoading = false;
      draft.addPartyCodeDone = true;
      const party = draft.partyPost.find((v) => v.id === action.data[0].PartyId);
      console.log(party);
      party.Hanacodes = party.Hanacodes.concat(action.data);
      break;
    case ADD_PARTY_CODE_FAILURE:
      draft.addPartyCodeLoading = false;
      draft.addPartyCodeError = action.error;
      break;
    case ADD_GUIDE_REQUEST:
      draft.addGuideLoading = true;
      draft.addGuideDone = false;
      draft.addGuideError = null;
      break;
    case ADD_GUIDE_SUCCESS:{
      draft.addGuideLoading = false;
      draft.addGuideDone = true;
      const partyInfo = draft.partyPost.find((v) => v.id === action.data.PartyId);
      partyInfo.User = action.data.exUser;
      partyInfo.UserId = action.data.guide;
      break;
    }
    case ADD_GUIDE_FAILURE:
      draft.addGuideLoading = false;
      draft.addGuideError = action.error;
      break;
    case ADD_AIRNUMBER_REQUEST:
      draft.addAirnumberLoading = true;
      draft.addAirnumberDone = false;
      draft.addAirnumberError = null;
      break;
    case ADD_AIRNUMBER_SUCCESS:{
      draft.addAirnumberLoading = false;
      draft.addAirnumberDone = true;
      const partyInfo = draft.partyPost.find((v) => v.id === action.data.PartyId);
      partyInfo.airnumber = action.data.airnumbercheck;
      break;
    }
    case ADD_AIRNUMBER_FAILURE:
      draft.addAirnumberLoading = false;
      draft.addAirnumberError = action.error;
      break;
    default:
      break;
  }
});

export default reducer;