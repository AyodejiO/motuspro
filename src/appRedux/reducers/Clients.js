/*jshint esversion: 6 */

import {CREATE_CLIENT_SUCCESS, LIST_CLIENT_SUCCESS, ALL_CLIENTS_DATA} from "../../constants/ActionTypes";

const INIT_STATE = {
  createSuccess: false,
  listSuccess: false,
  allClients: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case CREATE_CLIENT_SUCCESS: {
      return {
        ...state,
        createSuccess: action.payload
      }
    }

    case LIST_CLIENT_SUCCESS: {
      return {
        ...state,
        listSuccess: true
      }
    }

    case ALL_CLIENTS_DATA: {
      return {
        ...state,
        allClients: action.payload
      }
    }

    default:
      return state;
  }
}
