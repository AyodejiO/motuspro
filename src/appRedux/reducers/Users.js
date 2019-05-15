/*jshint esversion: 6 */

import {CREATE_USER_SUCCESS, LIST_USER_SUCCESS, ALL_USERS_DATA} from "../../constants/ActionTypes";

const INIT_STATE = {
  createSuccess: false,
  listSuccess: false,
  allUsers: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case CREATE_USER_SUCCESS: {
      return {
        ...state,
        createSuccess: true
      }
    }

    case LIST_USER_SUCCESS: {
      return {
        ...state,
        listSuccess: true
      }
    }

    case ALL_USERS_DATA: {
      return {
        ...state,
        allUsers: action.payload
      }
    }

    default:
      return state;
  }
}
