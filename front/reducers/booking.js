import produce from '../util/produce';

export const initialState = {
  bookingPost: [],
  todayBooking: null,
  confirmPost: [],
  hasmorePosts: true,
  loadsBookingLoading: false,
  loadsBookingDone: false,
  loadsBookingError: null,

  viewMoreLoading: false,
  viewMoreDone: false,
  viewMoreError: null,

  singleBooking: null,
  loadBookingLoading: false,
  loadBookingDone: false,
  loadBookingError: null,

  addHanacodeLoading: false,
  addHanacodeDone: false,
  addHanacodeError: null,

  addReservecodeLoading: false,
  addReservecodeDone: false,
  addReservecodeError: null,

  addPeopleLoading: false,
  addPeopleDone: false,
  addPeopleError: null,

  addReserveroomLoading: false,
  addReserveroomDone: false,
  addReserveroomError: null,

  addReserveoptionLoading: false,
  addReserveoptionDone: false,
  addReserveoptionError: null,

  deleteReserveroomLoading: false,
  deleteReserveroomDone: false,
  deleteReserveroomError: null,

  updateCodLoading: false,
  updateCodDone: false,
  updateCodError: null,

  updateOthercodeLoading: false,
  updateOthercodeDone: false,
  updateOthercodeError: null,

  updatecodeStatusLoading: false,
  updatecodeStatusDone: false,
  updatecodeStatusError: null,

  loadTodaycountLoading: false,
  loadTodaycountDone: false,
  loadTodaycountError: null,

  loadConfirmLoading: false,
  loadConfirmDone: false,
  loadConfirmError: null,
};

export const LOADS_BOOKING_REQUEST = 'LOADS_BOOKING_REQUEST';
export const LOADS_BOOKING_SUCCESS = 'LOADS_BOOKING_SUCCESS';
export const LOADS_BOOKING_FAILURE = 'LOADS_BOOKING_FAILURE';

export const VIEW_MORE_REQUEST = 'VIEW_MORE_REQUEST';
export const VIEW_MORE_SUCCESS = 'VIEW_MORE_SUCCESS';
export const VIEW_MORE_FAILURE = 'VIEW_MORE_FAILURE';

export const LOAD_BOOKING_REQUEST = 'LOAD_BOOKING_REQUEST';
export const LOAD_BOOKING_SUCCESS = 'LOAD_BOOKING_SUCCESS';
export const LOAD_BOOKING_FAILURE = 'LOAD_BOOKING_FAILURE';

export const ADD_HANACODE_REQUEST = 'ADD_HANACODE_REQUEST';
export const ADD_HANACODE_SUCCESS = 'ADD_HANACODE_SUCCESS';
export const ADD_HANACODE_FAILURE = 'ADD_HANACODE_FAILURE';

export const ADD_RESERVECODE_REQUEST = 'ADD_RESERVECODE_REQUEST';
export const ADD_RESERVECODE_SUCCESS = 'ADD_RESERVECODE_SUCCESS';
export const ADD_RESERVECODE_FAILURE = 'ADD_RESERVECODE_FAILURE';

export const ADD_PEOPLE_REQUEST = 'ADD_PEOPLE_REQUEST';
export const ADD_PEOPLE_SUCCESS = 'ADD_PEOPLE_SUCCESS';
export const ADD_PEOPLE_FAILURE = 'ADD_PEOPLE_FAILURE';

export const ADD_RESERVEROOM_REQUEST = 'ADD_RESERVEROOM_REQUEST';
export const ADD_RESERVEROOM_SUCCESS = 'ADD_RESERVEROOM_SUCCESS';
export const ADD_RESERVEROOM_FAILURE = 'ADD_RESERVEROOM_FAILURE';

export const DELETE_RESERVEROOM_REQUEST = 'DELETE_RESERVEROOM_REQUEST';
export const DELETE_RESERVEROOM_SUCCESS = 'DELETE_RESERVEROOM_SUCCESS';
export const DELETE_RESERVEROOM_FAILURE = 'DELETE_RESERVEROOM_FAILURE';

export const UPDATE_COD_REQUEST = 'UPDATE_COD_REQUEST';
export const UPDATE_COD_SUCCESS = 'UPDATE_COD_SUCCESS';
export const UPDATE_COD_FAILURE = 'UPDATE_COD_FAILURE';

export const UPDATE_OTHERCODE_REQUEST = 'UPDATE_OTHERCODE_REQUEST';
export const UPDATE_OTHERCODE_SUCCESS = 'UPDATE_OTHERCODE_SUCCESS';
export const UPDATE_OTHERCODE_FAILURE = 'UPDATE_OTHERCODE_FAILURE';

export const ADD_RESERVEOPTION_REQUEST = 'ADD_RESERVEOPTION_REQUEST';
export const ADD_RESERVEOPTION_SUCCESS = 'ADD_RESERVEOPTION_SUCCESS';
export const ADD_RESERVEOPTION_FAILURE = 'ADD_RESERVEOPTION_FAILURE';

export const UPDATE_CODESTATUS_REQUEST = 'UPDATE_CODESTATUS_REQUEST';
export const UPDATE_CODESTATUS_SUCCESS = 'UPDATE_CODESTATUS_SUCCESS';
export const UPDATE_CODESTATUS_FAILURE = 'UPDATE_CODESTATUS_FAILURE';

export const LOAD_TODAY_COUNT_REQUEST = 'LOAD_TODAY_COUNT_REQUEST';
export const LOAD_TODAY_COUNT_SUCCESS = 'LOAD_TODAY_COUNT_SUCCESS';
export const LOAD_TODAY_COUNT_FAILURE = 'LOAD_TODAY_COUNT_FAILURE';

export const LOAD_CONFIRM_REQUEST = 'LOAD_CONFIRM_REQUEST';
export const LOAD_CONFIRM_SUCCESS = 'LOAD_CONFIRM_SUCCESS';
export const LOAD_CONFIRM_FAILURE = 'LOAD_CONFIRM_FAILURE';

export const ADD_PARTY_CONFIRM = 'ADD_PARTY_CONFIRM';  //ADD를했을때 여기서는 그것을빼줘야함

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOADS_BOOKING_REQUEST:
      draft.loadBookingLoading = true;
      draft.loadBookingDone = false;
      draft.loadBookingError = null;
      break;
    case LOADS_BOOKING_SUCCESS:
      draft.loadBookingLoading = false;
      draft.loadBookingDone = true;
      draft.bookingPost = action.data;
      draft.hasmorePosts = action.data.length === 10;
      break;
    case LOADS_BOOKING_FAILURE:
      draft.loadBookingLoading = false;
      draft.loadBookingError = action.error;
      break;
    case VIEW_MORE_REQUEST:
      draft.viewMoreLoading = true;
      draft.viewMoreDone = false;
      draft.viewMoreError = null;
      break;
    case VIEW_MORE_SUCCESS:
      draft.viewMoreLoading = false;
      draft.viewMoreDone = true;
      draft.bookingPost = draft.bookingPost.concat(action.data);
      draft.hasmorePosts = action.data.length === 10;
      break;
    case VIEW_MORE_FAILURE:
      draft.viewMoreLoading = false;
      draft.viewMoreError = action.error;
      break;
    case LOAD_BOOKING_REQUEST:
      draft.loadBookingLoading = true;
      draft.loadBookingDone = false;
      draft.loadBookingError = null;
      break;
    case LOAD_BOOKING_SUCCESS:
      draft.loadBookingLoading = false;
      draft.loadBookingDone = true;
      draft.singleBooking = action.data;
      break;
    case LOAD_BOOKING_FAILURE:
      draft.loadBookingLoading = false;
      draft.loadBookingError = action.error;
      break;
    case ADD_HANACODE_REQUEST:
      draft.addHanacodeLoading = true;
      draft.addHanacodeDone = false;
      draft.addHanacodeError = null;
      break;
    case ADD_HANACODE_SUCCESS:
      draft.addHanacodeLoading = false;
      draft.addHanacodeDone = true;
      draft.bookingPost.unshift(action.data);
      break;
    case ADD_HANACODE_FAILURE:
      draft.addHanacodeLoading = false;
      draft.addHanacodeError = action.error;
      break;
    case ADD_RESERVECODE_REQUEST:
      draft.addReservecodeLoading = true;
      draft.addReservecodeDone = false;
      draft.addReservecodeError = null;
      break;
    case ADD_RESERVECODE_SUCCESS:
      draft.singleBooking.reservecodes.push(action.data);
      draft.addReservecodeLoading = false;
      draft.addReservecodeDone = true;
      break;
    case ADD_RESERVECODE_FAILURE:
      draft.addReservecodeLoading = false;
      draft.addReservecodeError = action.error;
      break;
    case ADD_PEOPLE_REQUEST:
      draft.addPeopleLoading = true;
      draft.addPeopleDone = false;
      draft.addPeopleError = null;
      break;
    case ADD_PEOPLE_SUCCESS:{
      const reservecode = draft.singleBooking.reservecodes.find((v) => v.id === action.data.reservecodeId);
      reservecode.reservePeople.push(action.data);
      draft.addPeopleLoading = false;
      draft.addPeopleDone = true;
      break;
    }
    case ADD_PEOPLE_FAILURE:
      draft.addPeopleLoading = false;
      draft.addPeopleError = action.error;
      break;
    case ADD_RESERVEROOM_REQUEST:
      draft.addReserveroomLoading = true;
      draft.addReserveroomDone = false;
      draft.addReserveroomError = null;
      break;
    case ADD_RESERVEROOM_SUCCESS:{
      const reservecode = draft.singleBooking.reservecodes.find((v) => v.id === action.data.reservecodeId);
      const reserveperson = reservecode.reservePeople.find((v) => v.id === action.data.fullRoomtypereserve.reservePersonId);
      reserveperson.roomtypeReserves.push(action.data.fullRoomtypereserve);
      draft.addReserveroomLoading = false;
      draft.addReserveroomDone = true;
      break;
    }
    case ADD_RESERVEROOM_FAILURE:
      draft.addReserveroomLoading = false;
      draft.addReserveroomError = action.error;
      break;
    case DELETE_RESERVEROOM_REQUEST:
      draft.deleteReserveroomLoading = true;
      draft.deleteReserveroomDone = false;
      draft.deleteReserveroomError = null;
      break;
    case DELETE_RESERVEROOM_SUCCESS:{
      const reservecode = draft.singleBooking.reservecodes.find((v) => v.id === action.data.ReservecodeId);
      const reserveperson = reservecode.reservePeople.find((v) => v.id === action.data.PeopleId);
      reserveperson.roomtypeReserves = reserveperson.roomtypeReserves.filter((v) => v.id !== action.data.RoomtypeReserveId);
      draft.deleteReserveroomLoading = false;
      draft.deleteReserveroomDone = true;
      break;
    }
    case DELETE_RESERVEROOM_FAILURE:
      draft.deleteReserveroomLoading = false;
      draft.deleteReserveroomError = action.error;
      break;
    case UPDATE_COD_REQUEST:
      draft.updateCodLoading = true;
      draft.updateCodDone = false;
      draft.updateCodError = null;
      break;
    case UPDATE_COD_SUCCESS:{
      const reservecode = draft.singleBooking.reservecodes.find((v) => v.id === action.data.ReservecodeId);
      const reserveperson = reservecode.reservePeople.find((v) => v.id === action.data.PeopleId);
      const roomtypereserve = reserveperson.roomtypeReserves.find((v) => v.id === action.data.RoomtypeReserveId);
      roomtypereserve.COD = action.data.COD;
      draft.updateCodLoading = false;
      draft.updateCodDone = true;
      break;
    }
    case UPDATE_COD_FAILURE:
      draft.updateCodLoading = false;
      draft.updateCodError = action.error;
      break;
    case UPDATE_OTHERCODE_REQUEST:
      draft.updateOthercodeLoading = true;
      draft.updateOthercodeDone = false;
      draft.updateOthercodeError = null;
      break;
    case UPDATE_OTHERCODE_SUCCESS:{
      const reservecode = draft.singleBooking.reservecodes.find((v) => v.id === action.data.ReservecodeId);
      const reserveperson = reservecode.reservePeople.find((v) => v.id === action.data.PeopleId);
      const roomtypereserve = reserveperson.roomtypeReserves.find((v) => v.id === action.data.RoomtypeReserveId);
      roomtypereserve.othercode = action.data.othercode;
      draft.updateOthercodeLoading = false;
      draft.updateOthercodeDone = true;
      break;
    }
    case UPDATE_OTHERCODE_FAILURE:
      draft.updateOthercodeLoading = false;
      draft.updateOthercodeError = action.error;
      break;
    case ADD_RESERVEOPTION_REQUEST:
      draft.addReserveoptionLoading = true;
      draft.addReserveoptionDone = false;
      draft.addReserveoptionError = null;
      break;
    case ADD_RESERVEOPTION_SUCCESS:{
      draft.addReserveoptionLoading = false;
      draft.addReserveoptionDone = true;
      const reservecode = draft.singleBooking.reservecodes.find((v) => v.id === action.data.reservecodeId);
      const reserveperson = reservecode.reservePeople.find((v) => v.id === action.data.fullreserveoption.reservePersonId);
      reserveperson.reserveOptions.push(action.data.fullreserveoption);
      break;
    }
    case ADD_RESERVEOPTION_FAILURE:
      draft.addReserveoptionLoading = false;
      draft.addReserveoptionError = action.error;
      break;
    case UPDATE_CODESTATUS_REQUEST:
      draft.updatecodeStatusLoading = true;
      draft.updatecodeStatusDone = false;
      draft.updatecodeStatusError = null;
      break;
    case UPDATE_CODESTATUS_SUCCESS:
      draft.singleBooking.status = action.data.status;
      draft.updatecodeStatusLoading = false;
      draft.updatecodeStatusDone = true;
      break;
    case UPDATE_CODESTATUS_FAILURE:
      draft.updatecodeStatusLoading = false;
      draft.updatecodeStatusError = action.error;
      break;
    case LOAD_TODAY_COUNT_REQUEST:
      draft.loadTodaycountLoading = true;
      draft.loadTodaycountDone = false;
      draft.loadTodaycountError = null;
      break;
    case LOAD_TODAY_COUNT_SUCCESS:
      draft.todayBooking = action.data;
      draft.loadTodaycountLoading = false;
      draft.loadTodaycountDone = true;
      break;
    case LOAD_TODAY_COUNT_FAILURE:
      draft.loadConfirmLoading = false;
      draft.loadConfirmError = action.error;
      break;
    case LOAD_CONFIRM_REQUEST:
      draft.loadConfirmLoading = true;
      draft.loadConfirmDone = false;
      draft.loadConfirmError = null;
      break;
    case LOAD_CONFIRM_SUCCESS:
      draft.confirmPost = draft.confirmPost.concat(action.data);
      draft.loadConfirmLoading = false;
      draft.loadConfirmDone = true;
      break;
    case LOAD_CONFIRM_FAILURE:
      draft.loadConfirmLoading = false;
      draft.loadConfirmError = action.error;
      break;
    case ADD_PARTY_CONFIRM:
      action.data.map((hana)=>  
      draft.confirmPost = draft.confirmPost.filter((v) => v.id !== hana.id)
      )
      break;
    default:
      break;
  }
});

export default reducer;