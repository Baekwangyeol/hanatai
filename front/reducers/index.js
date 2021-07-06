import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from './user';
import post from './post';
import airplane from './airplane';
import hotel from './hotel';
import addother from './addother';
import company from './company';
import contact from './contact';
import booking from './booking';
import option from './option';
import party from './party';
import bus from './bus';

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE', action);
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        user,
        post,
        airplane,
        hotel,
        addother,
        company,
        contact,
        booking,
        option,
        party,
        bus,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;