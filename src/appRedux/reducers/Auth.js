/*jshint esversion: 9 */

import {
  INIT_URL, 
  SIGNOUT_USER_SUCCESS, 
  USER_DATA, 
  USER_TOKEN_SET, USER_EXPIRATION_SET, USER_PASSWORD_CHANGED} from "../../constants/ActionTypes";

const INIT_STATE = {
  token: JSON.parse(localStorage.getItem('token')),
  initURL: '',
  passwdChanged: false,
  authUser: null,
  // authUser: {},
  expires_in: JSON.parse(localStorage.getItem('expires_in')),
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {


    case INIT_URL: {
      return {...state, initURL: action.payload};
    }

    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        token: null,
        authUser: null,
        initURL: ''
      }
    }

    case USER_DATA: {
      return {
        ...state,
        authUser: action.payload,
      };
    }

    case USER_TOKEN_SET: {
      return {
        ...state,
        token: action.payload,
      };
    }

    case USER_EXPIRATION_SET: {
      return {
        ...state,
        expires_in: action.payload,
      };
    }

    case USER_PASSWORD_CHANGED: {
      return {
        ...state,
        passwdChanged: action.payload,
      };
    }

    default:
      return state;
  }
};
