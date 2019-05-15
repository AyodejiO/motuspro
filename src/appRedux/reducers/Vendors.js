/*jshint esversion: 6 */

import {CREATE_VENDOR_SUCCESS, LIST_VENDOR_SUCCESS, ALL_VENDORS_DATA} from "../../constants/ActionTypes";

const INIT_STATE = {
  createSuccess: false,
  listSuccess: false,
  allVendors: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case CREATE_VENDOR_SUCCESS: {
      return {
        ...state,
        createSuccess: action.payload
      }
    }

    case LIST_VENDOR_SUCCESS: {
      return {
        ...state,
        listSuccess: true
      }
    }

    case ALL_VENDORS_DATA: {
      return {
        ...state,
        allVendors: action.payload
      }
    }

    default:
      return state;
  }
}
