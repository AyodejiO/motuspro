/*jshint esversion: 6 */

import {
  CREATE_BID_SUCCESS, 
  LIST_BIDS_SUCCESS, 
  FETCH_BID_ERROR,
  FETCH_BID_START,
  FETCH_BID_SUCCESS,
  EDIT_BID_SUCCESS,
  ALL_BIDS_DATA, 
  SINGLE_BID_DATA, 
  NEW_BID
} from "../../constants/ActionTypes";

const INIT_STATE = {
  createSuccess: false,
  listSuccess: false,
  bids: [],
  bid: '',
  bidLoading: false,
  bidMessage: '',
  bidError: '',
  newItem: null
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case ALL_BIDS_DATA: {
      return {
        ...state,
        bids: action.payload
      }
    }

    case CREATE_BID_SUCCESS: {
      return {
        ...state,
        createSuccess: action.payload
      }
    }

    case FETCH_BID_ERROR: {
      return {...state, bidLoading: false, bidError: action.payload, bidMessage: ''};
    }

    case FETCH_BID_START: {
      return {
        ...state,
        bidLoading: true,
        bidMessage: ''
      }
    }

    case FETCH_BID_SUCCESS: {
      return {
        ...state,
        bidLoading: false,
        bidMessage: ''
      }
    }

    case LIST_BIDS_SUCCESS: {
      return {
        ...state,
        listSuccess: true
      }
    }

    case NEW_BID: {
      return {
        ...state,
        bids: [...state.bids, action.payload]
      }
    }

    case EDIT_BID_SUCCESS: {
      return {
        ...state,
        bids: [
          ...state.bids.map((bid) => {
            // Find the bid with the matching id
            if(bid.id === action.payload.id) {
              // Return a new object
              return action.payload
            }
            return bid;
          })
        ]
      }
      // return {
      //   ...state,
      //   bids: [
      //     ...state.bids, 
      //     [action.payload.id]: action.payload
      //   ]
      // }
    }

    case SINGLE_BID_DATA: {
      return {
        ...state,
        bid: action.payload
      }
    }

    default:
      return state;
  }
}
