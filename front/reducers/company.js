import produce from '../util/produce';

export const initialState = {
  companyPost: [],
  hasmorePosts: true,
  loadCompanyLoading: false,
  loadCompanyDone: false,
  loadCompanyError: null,

  addCompanyLoading: false,
  addCompanyDone: false,
  addCompanyError: null,

  addCompanyOptionLoading: false,
  addCompanyOptionDone: false,
  addCompanyOptionError: null,
};

export const LOAD_COMPANY_REQUEST = 'LOAD_COMPANY_REQUEST';
export const LOAD_COMPANY_SUCCESS = 'LOAD_COMPANY_SUCCESS';
export const LOAD_COMPANY_FAILURE = 'LOAD_COMPANY_FAILURE';

export const ADD_COMPANY_REQUEST = 'ADD_COMPANY_REQUEST';
export const ADD_COMPANY_SUCCESS = 'ADD_COMPANY_SUCCESS';
export const ADD_COMPANY_FAILURE = 'ADD_COMPANY_FAILURE';

export const ADD_COMPANYOPTION_REQUEST = 'ADD_COMPANYOPTION_REQUEST';
export const ADD_COMPANYOPTION_SUCCESS = 'ADD_COMPANYOPTION_SUCCESS';
export const ADD_COMPANYOPTION_FAILURE = 'ADD_COMPANYOPTION_FAILURE';


const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_COMPANY_REQUEST:
      draft.loadCompanyLoading = true;
      draft.loadCompanyDone = false;
      draft.loadCompanyError = null;
      break;
    case LOAD_COMPANY_SUCCESS:
      draft.loadCompanyLoading = false;
      draft.loadCompanyDone = true;
      draft.companyPost = draft.companyPost.concat(action.data);
      draft.hasmorePosts = action.data.length === 10;
      break;
    case LOAD_COMPANY_FAILURE:
      draft.loadCompanyLoading = false;
      draft.loadCompanyError = action.error;
      break;
    case ADD_COMPANY_REQUEST:
      draft.addCompanyLoading = true;
      draft.addCompanyDone = false;
      draft.addCompanyError = null;
      break;
    case ADD_COMPANY_SUCCESS:
      draft.addCompanyLoading = false;
      draft.addCompanyDone = true;
      draft.companyPost.unshift(action.data);
      break;
    case ADD_COMPANY_FAILURE:
      draft.addCompanyLoading = false;
      draft.addCompanyError = action.error;
      break;
    case ADD_COMPANYOPTION_REQUEST:
      draft.addCompanyOptionLoading = true;
      draft.addCompanyOptionDone = false;
      draft.addCompanyOptionError = null;
      break;
    case ADD_COMPANYOPTION_SUCCESS:
      const detail = draft.companyPost.find((v)=> v.id === action.data.company_optiondetail.CompanyId);
      detail.Details.push(action.data);
      draft.addCompanyOptionLoading = false;
      draft.addCompanyOptionDone = true;
      break;
    case ADD_COMPANYOPTION_FAILURE:
      draft.addCompanyOptionLoading = false;
      draft.addCompanyOptionError = action.error;
      break;
    default:
      break;
  }
});

export default reducer;