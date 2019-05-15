/*jshint esversion: 6 */

import {FETCH_ERROR, FETCH_START, FETCH_STATUS, FETCH_SUCCESS, HIDE_MESSAGE, SHOW_MESSAGE} from "../../constants/ActionTypes";

export const fetchStart = () => {
  return {
    type: FETCH_START
  }
};

export const fetchSuccess = () => {
  return {
    type: FETCH_SUCCESS
  }
};

export const fetchError = (error) => {
  return {
    type: FETCH_ERROR,
    payload: error
  }
};

export const fetchStatus = (val) => {
  return {
    type: FETCH_STATUS,
    payload: val
  }
};

export const showMessage = (message) => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  }
};

export const hideMessage = () => {
  return {
    type: HIDE_MESSAGE
  }
};






