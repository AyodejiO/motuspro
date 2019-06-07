/*jshint esversion: 6 */

import {CREATE_CAT_SUCCESS, LIST_CATS_SUCCESS, ALL_CATS_DATA, SINGLE_CAT_DATA, NEW_CAT_ID} from "../../constants/ActionTypes";

const INIT_STATE = {
  createSuccess: false,
  listSuccess: false,
  cats: [],
  order: null,
  newOrder: ''
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case ALL_CATS_DATA: {
      return {
        ...state,
        cats: action.payload
      }
    }

    case SINGLE_CAT_DATA: {
      return {
        ...state,
        order: action.payload
      }
    }
    case CREATE_CAT_SUCCESS: {
      return {
        ...state,
        createSuccess: action.payload
      }
    }

    case LIST_CATS_SUCCESS: {
      return {
        ...state,
        listSuccess: true
      }
    }

    case NEW_CAT_ID: {
      return {
        ...state,
        newOrder: action.payload
      }
    }

    default:
      return state;
  }
}
