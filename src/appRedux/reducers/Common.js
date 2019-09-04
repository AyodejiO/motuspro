/*jshint esversion: 9 */

import {
  FETCH_ERROR, 
  FETCH_START, 
  FETCH_STATUS, 
  FETCH_SUCCESS, 
  HIDE_MESSAGE, 
  SHOW_MESSAGE,
  FETCH_BID_ERROR,
  FETCH_ITEM_ERROR,
  FETCH_ORDER_ERROR,
  FETCH_QUOTE_ERROR,
} from '../../constants/ActionTypes';

const INIT_STATE = {
  error: "",
  loading: false,
  message: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_START: {
      return {...state, error: '', message: '', loading: true};
    }
    case FETCH_STATUS: {
      return {...state, error: '', message: '', loading: true};
    }
    case FETCH_SUCCESS: {
      return {...state, error: '', message: '', loading: false};
    }
    case SHOW_MESSAGE: {
      return {...state, error: '', message: action.payload, loading: false};
    }
    case FETCH_ERROR: {
      return {...state, loading: false, error: action.payload, message: ''};
    }
    case FETCH_BID_ERROR: {
      return {...state, loading: false, error: action.payload, message: ''};
    }
    case FETCH_ITEM_ERROR: {
      return {...state, loading: false, error: action.payload, message: ''};
    }
    case FETCH_ORDER_ERROR: {
      return {...state, loading: false, error: action.payload, message: ''};
    }
    case FETCH_QUOTE_ERROR: {
      return {...state, loading: false, error: action.payload, message: ''};
    }
    case HIDE_MESSAGE: {
      return {...state, loading: false, error: '', message: ''};
    }
    default:
      return state;
  }
}
