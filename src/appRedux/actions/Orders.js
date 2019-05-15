/*jshint esversion: 6 */

// eslint-disable-next-line 
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  INIT_URL,
  CREATE_ORDER_SUCCESS,
  LIST_ORDER_SUCCESS,
  ALL_ORDERS_DATA
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
    axios.get('orders', 
    ).then(({data}) => {
      if (data.data) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: LIST_ORDER_SUCCESS});
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
        dispatch({type: LIST_ORDER_SUCCESS});
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
  return (dispatch) => {
    dispatch({type: CREATE_ORDER_SUCCESS, payload: false});
  };
};

export const addOrder = ({order_name, admin_name, admin_email, admin_phone}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('admin/orders', {
        order_name, admin_name, admin_email, admin_phone
      }
    ).then(({data}) => {
      if (data) {
        dispatch({type: FETCH_SUCCESS});
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
