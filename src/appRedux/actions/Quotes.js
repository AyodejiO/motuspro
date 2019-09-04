/*jshint esversion: 9 */

// eslint-disable-next-line 
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  CREATE_QUOTE_CANCEL,
  CREATE_QUOTE_MODAL,
  EDIT_QUOTE_CANCEL,
  EDIT_QUOTE_MODAL,
  CREATE_QUOTE_SUCCESS,
  DELETE_QUOTE_SUCCESS,
  EDIT_QUOTE_SUCCESS,
  EDIT_ITEM_SUCCESS,
  LIST_QUOTES_SUCCESS,
  ALL_QUOTES_DATA,
  SINGLE_QUOTE_DATA,
  SHOW_MESSAGE,
  FETCH_QUOTE_ERROR,
  FETCH_QUOTE_START,
  FETCH_QUOTE_SUCCESS,
  // SINGLE_QUOTE_DATA
} from "../../constants/ActionTypes";
import axios from 'util/Api';

export const addItemForm = () => {
  return {
    type: CREATE_QUOTE_SUCCESS,
    payload: false
  };
};
export const editItemForm = () => {
  return {
    type: EDIT_QUOTE_SUCCESS,
    payload: false
  };
};

export const addQuoteModal = (item) => {
  return {
    type: CREATE_QUOTE_MODAL,
    payload: item
  };
};
export const editQuoteModal = (bid) => {
  return {
    type: EDIT_QUOTE_MODAL,
    payload: bid
  };
};
export const cancelQuoteModal = () => {
  return {
    type: CREATE_QUOTE_CANCEL
  };
};
export const cancelEditQuoteModal = () => {
  return {
    type: EDIT_QUOTE_CANCEL
  };
};

export const createQuote = (order_id) => {
  return (dispatch) => {
    dispatch({type: FETCH_QUOTE_START});
    axios.post(`admin/quote`, {order_id})
    .then(({data}) => {
      if (data) {
        dispatch({type: FETCH_QUOTE_SUCCESS});
        dispatch({type: SINGLE_QUOTE_DATA, payload: data.quote});
        dispatch({type: SHOW_MESSAGE, payload: 'Quote generated successfully'});
      } else {
        console.log("payload: data.error", data.error);
        dispatch({type: FETCH_QUOTE_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_QUOTE_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  };
};

export const deleteQuote = (bid_id) => {
  return (dispatch) => {
    axios.delete(`user/bids/${bid_id}`)
    .then(({data}) => {
      if (data) {
        dispatch({type: DELETE_QUOTE_SUCCESS, payload: bid_id});
        dispatch({type: SHOW_MESSAGE, payload: 'Quote deleted'});
      } else {
        console.log("payload: data.error", data.error);
        dispatch({type: FETCH_QUOTE_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_QUOTE_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  };
};

export const editQuote = (bid_id, {unit_cost, duration, additional_details}) => {
  return (dispatch) => {
    dispatch({type: FETCH_QUOTE_START});
    axios.put(`user/bids/${bid_id}`, {duration, additional_details, unit_cost})
    .then(({data}) => {
      if (data) {
        dispatch({type: FETCH_QUOTE_SUCCESS});
        dispatch({type: EDIT_QUOTE_SUCCESS, payload: data.bid});
        dispatch({type: SHOW_MESSAGE, payload: 'Quote edited successfully'});
      } else {
        console.log("payload: data.error", data.error);
        dispatch({type: FETCH_QUOTE_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_QUOTE_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  };
};


export const getQuotes = (admin=false, s=null, c=null) => {
  // console.log(admin, s, c);
  const route = admin? 'admin/bids' : 'user/bids';
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
      if (data) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: LIST_QUOTES_SUCCESS});
        dispatch({type: ALL_QUOTES_DATA, payload: data.bids});
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

export const selectQuote = (item_id, bid_id) => {
  return (dispatch) => {
    axios.post(`admin/items/${item_id}/bids/${bid_id}/select`)
    .then(({data}) => {
      if (data) {
        dispatch({type: FETCH_QUOTE_SUCCESS});
        dispatch({type: EDIT_ITEM_SUCCESS, payload: data.item});
        dispatch({type: SHOW_MESSAGE, payload: 'Quote selected'});
      } else {
        console.log("payload: data.error", data.error);
        dispatch({type: FETCH_QUOTE_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_QUOTE_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  };
};