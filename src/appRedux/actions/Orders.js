/*jshint esversion: 6 */

// eslint-disable-next-line 
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  CREATE_ORDER_SUCCESS,
  LIST_ORDERS_SUCCESS,
  ALL_ORDERS_DATA,
  ORDER_ITEMS_DATA,
  SINGLE_ORDER_DATA,
  SINGLE_ORDER_TIMELINE_DATA,
  NEW_ORDER_ID,
  SHOW_MESSAGE,
  FETCH_ORDER_ERROR,
  FETCH_ORDER_START,
  FETCH_ORDER_SUCCESS,
  EDIT_ORDER_SUCCESS,
  ACTIVATE_SINGLE_ORDER
} from "../../constants/ActionTypes";
import axios from 'util/Api';

export const getOrders = (admin=false, s=null, c=null) => {
  // console.log(admin, s, c);
  const route = admin? 'admin/orders' : 'user/orders';
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

export const editOrder = (ref, {note=null, order_desc = null}, admin=false) => {
  const path = admin? 'admin/orders' : 'user/orders';
  const values = {};
  if(note) values.note = note;
  if(order_desc) values.order_desc = order_desc;
  return (dispatch) => {
    dispatch({type: FETCH_ORDER_START});
    axios.put(`${path}/${ref}`, values
    ).then(({data}) => {
      if (data) {
        dispatch({type: FETCH_ORDER_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: 'Order updated successfully'});
        dispatch({type: EDIT_ORDER_SUCCESS, payload: data.order.data});
      } else {
        console.log("payload: data.error", data.error);
        dispatch({type: FETCH_ORDER_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ORDER_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  };
};

export const activateOrder = (ref) => {
  // const route = admin? 'admin/orders/' : 'user/orders/';
  return (dispatch) => {
    dispatch({type: FETCH_ORDER_START});
    axios.post('user/orders/'+ref+'/activate', 
    ).then(({data}) => {
      if (data) {
        // console.log(data);
        dispatch({type: FETCH_ORDER_SUCCESS});
        dispatch({type: ACTIVATE_SINGLE_ORDER});
      } else {
        console.log("payload: data.error", data.error);
        dispatch({type: FETCH_ORDER_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ORDER_ERROR, payload: error.message});
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
        dispatch({type: SINGLE_ORDER_TIMELINE_DATA, payload: data.data.activities});
        dispatch({type: ORDER_ITEMS_DATA, payload: data.data.items});
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
