/*jshint esversion: 9 */

import {
  CREATE_BID_CANCEL,
  CREATE_BID_MODAL,
  CREATE_ITEM_SUCCESS, 
  LIST_ITEMS_SUCCESS, 
  FETCH_ITEM_ERROR,
  FETCH_ITEM_START,
  FETCH_ITEM_SUCCESS,
  EDIT_ITEM_SUCCESS,
  ALL_ITEMS_DATA, 
  ORDER_ITEMS_DATA,
  SINGLE_ITEM_DATA, 
  CREATE_BID_SUCCESS,
  NEW_ITEM
} from "../../constants/ActionTypes";

const INIT_STATE = {
  createSuccess: false,
  listSuccess: false,
  items: [],
  orderItems: [],
  item: '',
  itemLoading: false,
  itemMessage: '',
  itemError: '',
  newItem: null
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case ALL_ITEMS_DATA: {
      return {
        ...state,
        items: action.payload
      };
    }

    case ORDER_ITEMS_DATA: {
      return {
        ...state,
        orderItems: action.payload
      };
    }

    case CREATE_ITEM_SUCCESS: {
      return {
        ...state,
        createSuccess: action.payload
      };
    }

    case FETCH_ITEM_ERROR: {
      return {...state, itemLoading: false, itemError: action.payload, itemMessage: ''};
    }

    case FETCH_ITEM_START: {
      return {
        ...state,
        itemLoading: true,
        itemMessage: ''
      };
    }

    case FETCH_ITEM_SUCCESS: {
      return {
        ...state,
        itemLoading: false,
        itemMessage: ''
      };
    }

    case LIST_ITEMS_SUCCESS: {
      return {
        ...state,
        listSuccess: true
      };
    }

    case NEW_ITEM: {
      return {
        ...state,
        orderItems: [...state.orderItems, action.payload]
      };
    }

    case EDIT_ITEM_SUCCESS: {
      return {
        ...state,
        orderItems: [
          ...state.orderItems.map((item) => {
            // Find the item with the matching id
            if(item.id === action.payload.id) {
              // Return a new object
              return action.payload
            }
            return item;
          })
        ]
      };
    }

    case CREATE_BID_MODAL: {
      return {
        ...state,
        item: action.payload
      };
    }

    case CREATE_BID_CANCEL: {
      return {
        ...state,
        item: null,
      };
    }

    case CREATE_BID_SUCCESS: {
      return {
        ...state,
        item: null,
        items: [...state.items.filter(item => item.id !== action.payload)]
      };
    }

    case SINGLE_ITEM_DATA: {
      return {
        ...state,
        item: action.payload
      };
    }

    default:
      return state;
  }
}
