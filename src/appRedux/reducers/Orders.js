/*jshint esversion: 6 */

import {CREATE_ORDER_SUCCESS, LIST_ORDER_SUCCESS, ALL_ORDERS_DATA} from "../../constants/ActionTypes";

const INIT_STATE = {
  createSuccess: false,
  listSuccess: false,
  allOrders: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        createSuccess: action.payload
      }
    }

    case LIST_ORDER_SUCCESS: {
      return {
        ...state,
        listSuccess: true
      }
    }

    case ALL_ORDERS_DATA: {
      return {
        ...state,
        allOrders: action.payload
      }
    }

    default:
      return state;
  }
}
