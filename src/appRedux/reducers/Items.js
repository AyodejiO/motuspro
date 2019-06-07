/*jshint esversion: 6 */

import {
  CREATE_ITEM_SUCCESS, 
  LIST_ITEMS_SUCCESS, 
  FETCH_ITEM_ERROR,
  FETCH_ITEM_START,
  FETCH_ITEM_SUCCESS,
  ALL_ITEMS_DATA, 
  SINGLE_ITEM_DATA, 
  NEW_ITEM
} from "../../constants/ActionTypes";

const INIT_STATE = {
  createSuccess: false,
  listSuccess: false,
  items: [],
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
      }
    }

    case CREATE_ITEM_SUCCESS: {
      return {
        ...state,
        createSuccess: action.payload
      }
    }

    case FETCH_ITEM_ERROR: {
      return {...state, itemLoading: false, itemError: action.payload, itemMessage: ''};
    }

    case FETCH_ITEM_START: {
      return {
        ...state,
        itemLoading: true,
        itemMessage: ''
      }
    }

    case FETCH_ITEM_SUCCESS: {
      return {
        ...state,
        itemLoading: false,
        itemMessage: ''
      }
    }

    case LIST_ITEMS_SUCCESS: {
      return {
        ...state,
        listSuccess: true
      }
    }

    case NEW_ITEM: {
      return {
        ...state,
        items: [...state.items, action.payload]
      }
    }

    case SINGLE_ITEM_DATA: {
      return {
        ...state,
        item: action.payload
      }
    }

    default:
      return state;
  }
}
