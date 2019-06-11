/*jshint esversion: 6 */

import {
  CREATE_ORDER_SUCCESS, 
  LIST_ORDERS_SUCCESS, 
  ALL_ORDERS_DATA, 
  SINGLE_ORDER_DATA, 
  SINGLE_ORDER_TIMELINE_DATA, 
  ACTIVATE_SINGLE_ORDER, 
  NEW_ORDER_ID,
  FETCH_ACTIVATING_ERROR,
  FETCH_ACTIVATING_START,
  FETCH_ACTIVATING_SUCCESS
} from "../../constants/ActionTypes";

const INIT_STATE = {
  createSuccess: false,
  listSuccess: false,
  activating: false,
  activatingError: [],
  activatingMsg: '',
  allOrders: [],
  order: null,
  activities: [],
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

    case SINGLE_ORDER_DATA: {
      return {
        ...state,
        order: action.payload
      }
    }
    case SINGLE_ORDER_TIMELINE_DATA: {
      return {
        ...state,
        activities: action.payload
      }
    }
    case FETCH_ACTIVATING_ERROR: {
      return {...state, activating: false, activatingError: action.payload, activatingMsg: ''};
    }

    case FETCH_ACTIVATING_START: {
      return {
        ...state,
        activating: true,
        activatingMsg: ''
      }
    }

    case FETCH_ACTIVATING_SUCCESS: {
      return {
        ...state,
        activating: false,
        activatingMsg: ''
      }
    }
    case ACTIVATE_SINGLE_ORDER: {
      return {
        ...state,
        order: {
          ...state.order,
          status: 'active'
        }
      }
    }
    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        createSuccess: action.payload
      }
    }

    case LIST_ORDERS_SUCCESS: {
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
