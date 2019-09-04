/*jshint esversion: 9 */

import {
  CREATE_QUOTE_SUCCESS, 
  LIST_QUOTES_SUCCESS, 
  ALL_QUOTES_DATA, 
  SINGLE_QUOTE_DATA, 
  FETCH_QUOTE_ERROR,
  FETCH_QUOTE_START,
  FETCH_QUOTE_SUCCESS,
  EDIT_QUOTE_SUCCESS,
} from "../../constants/ActionTypes";

const INIT_STATE = {
  createSuccess: false,
  editSuccess: false,
  listSuccess: false,
  allQuotes: [],
  quote: null,
  quoteLoading: false,
  quoteMessage: '',
  quoteError: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case ALL_QUOTES_DATA: {
      return {
        ...state,
        allQuotes: action.payload
      };
    }

    case SINGLE_QUOTE_DATA: {
      return {
        ...state,
        quote: action.payload
      };
    }
    case FETCH_QUOTE_ERROR: {
      return {...state, quoteLoading: false, quoteError: action.payload, quoteMessage: ''};
    }

    case FETCH_QUOTE_START: {
      return {
        ...state,
        quoteLoading: true,
        quoteMessage: ''
      };
    }

    case FETCH_QUOTE_SUCCESS: {
      return {
        ...state,
        quoteLoading: false,
        quoteMessage: ''
      };
    }
    case EDIT_QUOTE_SUCCESS: {
      return {
        ...state,
        quote: action.payload,
        editSuccess: true
      };
    }
    case CREATE_QUOTE_SUCCESS: {
      return {
        ...state,
        createSuccess: action.payload
      };
    }

    case LIST_QUOTES_SUCCESS: {
      return {
        ...state,
        listSuccess: true
      };
    }

    default:
      return state;
  }
};
