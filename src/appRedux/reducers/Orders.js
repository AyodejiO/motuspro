/*jshint esversion: 6 */

import {CREATE_ORDER_SUCCESS, LIST_ORDER_SUCCESS, ALL_ORDERS_DATA, NEW_ORDER_ID} from "../../constants/ActionTypes";

const INIT_STATE = {
  createSuccess: false,
  listSuccess: false,
  allOrders: [],
  newOrder: ''
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case ALL_ORDERS_DATA: {
      return {
        ...state,
        allOrders: action.payload
      }
    }
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

    case NEW_ORDER_ID: {
      return {
        ...state,
        newOrder: action.payload
      }
    }

    default:
      return state;
  }
}
