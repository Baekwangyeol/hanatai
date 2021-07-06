import produce from '../util/produce';

export const initialState = {
  hotelPost: [],
  hasmorePosts: true,
  loadHotelsLoading: false,
  loadHotelsDone: false,
  loadHotelsError: null,

  singleHotel: null,
  loadHotelLoading: false,
  loadHotelDone: false,
  loadHotelError: null,

  addHotelLoading: false,
  addHotelDone: false,
  addHotelError: null,

  mainImage: null,
  uploadMainImageLoading: false,
  uploadMainImageDone: false,
  uploadMainImageEroor: null,

  hotelContactLoading: false,
  hotelContactDone: false,
  hotelContactError: null,

  addRoomtypeLoading: false,
  addRoomtypeDone: false,
  addRoomtypeError: null,

  addPriceLoading: false,
  addPriceDone: false,
  addPriceError: null,
};

export const REMOVE_MAINIMAGE = 'REMOVE_MAINIMAGE';

export const LOAD_HOTELS_REQUEST = 'LOAD_HOTELS_REQUEST';
export const LOAD_HOTELS_SUCCESS = 'LOAD_HOTELS_SUCCESS';
export const LOAD_HOTELS_FAILURE = 'LOAD_HOTELS_FAILURE';

export const LOAD_HOTEL_REQUEST = 'LOAD_HOTEL_REQUEST';
export const LOAD_HOTEL_SUCCESS = 'LOAD_HOTEL_SUCCESS';
export const LOAD_HOTEL_FAILURE = 'LOAD_HOTEL_FAILURE';

export const UPLOAD_MAINIMAGE_REQUEST = 'UPLOAD_MAINIMAGE_REQUEST';
export const UPLOAD_MAINIMAGE_SUCCESS = 'UPLOAD_MAINIMAGE_SUCCESS';
export const UPLOAD_MAINIMAGE_FAILURE = 'UPLOAD_MAINIMAGE_FAILURE';

export const ADD_HOTEL_REQUEST = 'ADD_HOTEL_REQUEST';
export const ADD_HOTEL_SUCCESS = 'ADD_HOTEL_SUCCESS';
export const ADD_HOTEL_FAILURE = 'ADD_HOTEL_FAILURE';

export const HOTEL_CONTACT_REQUEST = 'HOTEL_CONTACT_REQUEST';
export const HOTEL_CONTACT_SUCCESS = 'HOTEL_CONTACT_SUCCESS';
export const HOTEL_CONTACT_FAILURE = 'HOTEL_CONTACT_FAILURE';

export const ADD_ROOMTYPE_REQUEST = 'ADD_ROOMTYPE_REQUEST';
export const ADD_ROOMTYPE_SUCCESS = 'ADD_ROOMTYPE_SUCCESS';
export const ADD_ROOMTYPE_FAILURE = 'ADD_ROOMTYPE_FAILURE';

export const ADD_PRICE_REQUEST = 'ADD_PRICE_REQUEST';
export const ADD_PRICE_SUCCESS = 'ADD_PRICE_SUCCESS';
export const ADD_PRICE_FAILURE = 'ADD_PRICE_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case REMOVE_MAINIMAGE:
      draft.mainImage = null;
      break;
    case LOAD_HOTELS_REQUEST:
      draft.loadHotelsLoading = true;
      draft.loadHotelsDone = false;
      draft.loadHotelsError = null;
      break;
    case LOAD_HOTELS_SUCCESS:
      draft.loadHotelsLoading = false;
      draft.loadHotelsDone = true;
      draft.hotelPost = draft.hotelPost.concat(action.data);
      draft.hasmorePosts = action.data.length === 10;
      break;
    case LOAD_HOTELS_FAILURE:
      draft.loadHotelsLoading = false;
      draft.loadHotelsError = action.error;
      break;
    case LOAD_HOTEL_REQUEST:
      draft.loadHotelLoading = true;
      draft.loadHotelDone = false;
      draft.loadHotelError = null;
      break;
    case LOAD_HOTEL_SUCCESS:
      draft.loadHotelLoading = false;
      draft.loadHotelDone = true;
      draft.singleHotel = action.data;
      break;
    case LOAD_HOTEL_FAILURE:
      draft.loadHotelLoading = false;
      draft.loadHotelError = action.error;
      break;
    case UPLOAD_MAINIMAGE_REQUEST:
      draft.uploadMainImageLoading = true;
      draft.uploadMainImageDone = false;
      draft.uploadMainImageError = null;
      break;
    case UPLOAD_MAINIMAGE_SUCCESS:
      draft.mainImage = action.data;
      draft.uploadMainImageLoading = false;
      draft.uploadMainImageDone = true;
      break;
    case UPLOAD_MAINIMAGE_FAILURE:
      draft.uploadMainImageLoading = false;
      draft.uploadMainImageError = action.error;
      break;
    case ADD_HOTEL_REQUEST:
      draft.addHotelLoading = true;
      draft.addHotelDone = false;
      draft.addHotelError = null;
      break;
    case ADD_HOTEL_SUCCESS:
      draft.addHotelLoading = false;
      draft.addHotelDone = action.data;
      draft.mainImage = null;
      break;
    case ADD_HOTEL_FAILURE:
      draft.addHotelLoading = false;
      draft.addHotelError = action.error;
      break;
    case HOTEL_CONTACT_REQUEST:
      draft.hotelContactLoading = true;
      draft.hotelContactDone = false;
      draft.hotelContactError = null;
      break;
    case HOTEL_CONTACT_SUCCESS:
      draft.hotelContactLoading = false;
      draft.hotelContactDone = true;
      draft.singleHotel.HoteltoContact.push({ id: action.data.ContactId });
      break;
    case HOTEL_CONTACT_FAILURE:
      draft.hotelContactLoading = false;
      draft.hotelContactError = action.error;
      break;
    case ADD_ROOMTYPE_REQUEST:
      draft.addRoomtypeLoading = true;
      draft.addRoomtypeDone = false;
      draft.addRoomtypeError = null;
      break;
    case ADD_ROOMTYPE_SUCCESS:
      draft.singleHotel.Roomtypes.push(action.data);
      draft.addRoomtypeLoading = false;
      draft.addRoomtypeDone = true;
      break;
    case ADD_ROOMTYPE_FAILURE:
      draft.addRoomtypeLoading = false;
      draft.addRoomtypeError = action.error;
      break;
    case ADD_PRICE_REQUEST:
      draft.addPriceLoading = true;
      draft.addPriceDone = false;
      draft.addPriceError = null;
      break;
    case ADD_PRICE_SUCCESS:
      const roomtype = draft.singleHotel.Roomtypes.find((v) => v.id === action.data.RoomtypeId);
      roomtype.Roomprices.push(action.data);
      draft.addPriceLoading = false;
      draft.addPriceDone = true;
      break;
    case ADD_PRICE_FAILURE:
      draft.addPriceLoading = false;
      draft.addPriceError = action.error;
      break;
    default:
      break;
  }
});

export default reducer;