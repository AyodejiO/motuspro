/*jshint esversion: 9 */

// eslint-disable-next-line 
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  CREATE_BID_CANCEL,
  CREATE_BID_MODAL,
  CREATE_BID_SUCCESS,
  EDIT_BID_SUCCESS,
  LIST_BIDS_SUCCESS,
  ALL_BIDS_DATA,
  SHOW_MESSAGE,
  FETCH_BID_ERROR,
  FETCH_BID_START,
  FETCH_BID_SUCCESS,
  SINGLE_BID_DATA
} from "../../constants/ActionTypes";
import axios from 'util/Api';

export const addItemForm = () => {
  return {
    type: CREATE_BID_SUCCESS,
    payload: false
  };
};
export const editItemForm = () => {
  return {
    type: EDIT_BID_SUCCESS,
    payload: false
  };
};

export const addBidModal = (item) => {
  return {
    type: CREATE_BID_MODAL,
    payload: item
  };
};
export const cancelBidModal = (item) => {
  return {
    type: CREATE_BID_CANCEL,
    payload: item
  };
};

export const addBid = (item_id, {unit_cost, duration, additional_details}) => {
  return (dispatch) => {
    dispatch({type: FETCH_BID_START});
    axios.post(`user/bids`, {duration, additional_details, item_id, unit_cost})
    .then(({data}) => {
      console.log(data);
      if (data) {
        dispatch({type: FETCH_BID_SUCCESS});
        dispatch({type: CREATE_BID_SUCCESS, payload: item_id});
        dispatch({type: SHOW_MESSAGE, payload: 'Bid submitted successfully'});
      } else {
        console.log("payload: data.error", data.error);
        dispatch({type: FETCH_BID_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_BID_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  };
};


export const getBids = (admin=false, s=null, c=null) => {
  // console.log(admin, s, c);
  const route = admin? 'admin/items' : 'user/items';
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(route, {
      headers: {'X-Requested-With': 'XMLHttpRequest'},
      params: {
        s,
        c,
      }
    }
    ).then(({data}) => {
      if (data.data) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: LIST_BIDS_SUCCESS});
        dispatch({type: ALL_BIDS_DATA, payload: data.data});
      } else {
        console.log("payload: data.error", data.error);
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  };
};