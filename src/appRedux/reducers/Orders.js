/*jshint esversion: 9 */

import {
  CREATE_ORDER_SUCCESS, 
  LIST_ORDERS_SUCCESS, 
  ALL_ORDERS_DATA, 
  SINGLE_ORDER_DATA, 
  SINGLE_ORDER_TIMELINE_DATA, 
  NEW_ORDER_ID,
  FETCH_ORDER_ERROR,
  FETCH_ORDER_START,
  FETCH_ORDER_SUCCESS,
  EDIT_ORDER_SUCCESS,
  ACTIVATE_SINGLE_ORDER,
} from "../../constants/ActionTypes";

const INIT_STATE = {
  createSuccess: false,
  editSuccess: false,
  listSuccess: false,
  allOrders: [],
  order: null,
  orderLoading: false,
  orderMessage: '',
  orderError: '',
  activities: [],
  newOrder: ''
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case ALL_ORDERS_DATA: {
      return {
        ...state,
        allOrders: action.payload
      };
    }

    case SINGLE_ORDER_DATA: {
      return {
        ...state,
        order: action.payload
      };
    }
    case SINGLE_ORDER_TIMELINE_DATA: {
      return {
        ...state,
        activities: action.payload
      };
    }
    case FETCH_ORDER_ERROR: {
      return {...state, orderLoading: false, orderError: action.payload, orderMessage: ''};
    }

    case FETCH_ORDER_START: {
      return {
        ...state,
        orderLoading: true,
        orderMessage: ''
      };
    }

    case FETCH_ORDER_SUCCESS: {
      return {
        ...state,
        orderLoading: false,
        orderMessage: ''
      };
    }
    case ACTIVATE_SINGLE_ORDER: {
      return {
        ...state,
        order: {
          ...state.order,
          status: 'active'
        }
      };
    }
    case EDIT_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.payload,
        editSuccess: true
      };
    }
    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        createSuccess: action.payload
      };
    }

    case LIST_ORDERS_SUCCESS: {
      return {
        ...state,
        listSuccess: true
      };
    }

    case NEW_ORDER_ID: {
      return {
        ...state,
        newOrder: action.payload
      };
    }

    default:
      return state;
  }
};
