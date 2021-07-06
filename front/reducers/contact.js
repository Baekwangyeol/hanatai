import produce from '../util/produce';

export const initialState = {
  contactPost: [],
  hasmorePosts: true,
  loadContactLoading: false,
  loadContactDone: false,
  loadContactError: null,

  addContactLoading: false,
  addContactDone: false,
  addContactError: null,

  loadAccountLoading: false,
  loadAccountDone: false,
  loadAccountError: null,

  addAccountLoading: false,
  addAccountDone: false,
  addAccountError: null,

  loadTelLoading: false,
  loadTelDone: false,
  loadTelError: null,

  addTelLoading: false,
  addTelDone: false,
  addTelError: null,
};

export const LOAD_CONTACT_REQUEST = 'LOAD_CONTACT_REQUEST';
export const LOAD_CONTACT_SUCCESS = 'LOAD_CONTACT_SUCCESS';
export const LOAD_CONTACT_FAILURE = 'LOAD_CONTACT_FAILURE';

export const ADD_CONTACT_REQUEST = 'ADD_CONTACT_REQUEST';
export const ADD_CONTACT_SUCCESS = 'ADD_CONTACT_SUCCESS';
export const ADD_CONTACT_FAILURE = 'ADD_CONTACT_FAILURE';

export const ADD_ACCOUNT_REQUEST = 'ADD_ACCOUNT_REQUEST';
export const ADD_ACCOUNT_SUCCESS = 'ADD_ACCOUNT_SUCCESS';
export const ADD_ACCOUNT_FAILURE = 'ADD_ACCOUNT_FAILURE';

export const ADD_TEL_REQUEST = 'ADD_TEL_REQUEST';
export const ADD_TEL_SUCCESS = 'ADD_TEL_SUCCESS';
export const ADD_TEL_FAILURE = 'ADD_TEL_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_CONTACT_REQUEST:
      draft.loadContactLoading = true;
      draft.loadContactDone = false;
      draft.loadContactError = null;
      break;
    case LOAD_CONTACT_SUCCESS:
      draft.loadContactLoading = false;
      draft.loadContactDone = true;
      draft.contactPost = draft.contactPost.concat(action.data);
      draft.hasmorePosts = action.data.length === 10;
      break;
    case LOAD_CONTACT_FAILURE:
      draft.loadContactLoading = false;
      draft.loadContactError = action.error;
      break;
    case ADD_CONTACT_REQUEST:
      draft.addContactLoading = true;
      draft.addContactDone = false;
      draft.addContactError = null;
      break;
    case ADD_CONTACT_SUCCESS:
      draft.addContactLoading = false;
      draft.addContactDone = true;
      draft.contactPost.unshift(action.data);
      break;
    case ADD_CONTACT_FAILURE:
      draft.addContactLoading = false;
      draft.addContactError = action.error;
      break;
    case ADD_ACCOUNT_REQUEST:
      draft.addAccountLoading = true;
      draft.addAccountDone = false;
      draft.addAccountError = null;
      break;
    case ADD_ACCOUNT_SUCCESS: {
      const contact = draft.contactPost.find((v) => v.id === action.data.ContactId);
      contact.Accounts.unshift(action.data);
      draft.addAccountLoading = false;
      draft.addAccountDone = true;
      break;
    }
    case ADD_ACCOUNT_FAILURE:
      draft.addAccountLoading = false;
      draft.addAccountError = action.error;
      break;
    case ADD_TEL_REQUEST:
      draft.addTelLoading = true;
      draft.addTelDone = false;
      draft.addTelError = null;
      break;
    case ADD_TEL_SUCCESS: {
      const contact = draft.contactPost.find((v) => v.id === action.data.ContactId);
      contact.Tels.unshift(action.data);
      draft.addTelLoading = false;
      draft.addTelDone = true;
      break;
    }
    case ADD_TEL_FAILURE:
      draft.addTelLoading = false;
      draft.addTelError = action.error;
      break;
    default:
      break;
  }
});

export default reducer;