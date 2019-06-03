/*jshint esversion: 6 */

// eslint-disable-next-line 
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  INIT_URL,
  CREATE_ORDER_SUCCESS,
  LIST_ORDERS_SUCCESS,
  ALL_ORDERS_DATA,
  SINGLE_ORDER_DATA,
  NEW_ORDER_ID
} from "../../constants/ActionTypes";
import axios from 'util/Api';

export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url
  };
};

export const getOrders = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('user/orders', 
    ).then(({data}) => {
      if (data.data) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: LIST_ORDERS_SUCCESS});
        dispatch({type: ALL_ORDERS_DATA, payload: data.data});
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

export const getAdminOrders = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('admin/orders', 
    ).then(({data}) => {
      if (data.data) {
        // console.log(data)
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: LIST_ORDERS_SUCCESS});
        dispatch({type: ALL_ORDERS_DATA, payload: data.data});
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

export const addOrderForm = () => {
  return {
    type: CREATE_ORDER_SUCCESS,
    payload: false
  };
};

export const addOrder = ({client_ref, order_desc}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('user/orders', {
        client_ref, order_desc
      }
    ).then(({data}) => {
      console.log(data);
      if (data) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: NEW_ORDER_ID, payload: data.ref});
        dispatch({type: CREATE_ORDER_SUCCESS, payload: true});
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

export const getSingleOrder = (ref, admin=false) => {
  const route = admin? 'admin/orders/' : 'user/orders/';
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(route+ref, 
    ).then(({data}) => {
      if (data) {
        // console.log(data);
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: LIST_ORDERS_SUCCESS});
        dispatch({type: SINGLE_ORDER_DATA, payload: data.data});
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
