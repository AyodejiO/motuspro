/*jshint esversion: 9 */

// eslint-disable-next-line 
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  INIT_URL,
  CREATE_ITEM_SUCCESS,
  EDIT_ITEM_SUCCESS,
  SKIP_ITEM_SUCCESS,
  LIST_ITEMS_SUCCESS,
  ALL_ITEMS_DATA,
  SHOW_MESSAGE,
  FETCH_BID_ERROR,
  FETCH_BID_START,
  FETCH_BID_SUCCESS,
  ALL_BIDS_DATA,
  LIST_BIDS_SUCCESS,
  FETCH_ITEM_ERROR,
  FETCH_ITEM_START,
  FETCH_ITEM_SUCCESS,
  
  // SINGLE_ITEM_DATA,
  NEW_ITEM
} from "../../constants/ActionTypes";
import axios from 'util/Api';

export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url
  };
};

export const addItemForm = () => {
  return {
    type: CREATE_ITEM_SUCCESS,
    payload: false
  };
};
export const editItemForm = () => {
  return {
    type: EDIT_ITEM_SUCCESS,
    payload: false
  };
};

export const addItem = (ref, {description, size, quantity, category, additional_details, attachment}) => {
  return (dispatch) => {
    let data = new FormData();
    data.append('client_ref', ref);
    data.append('size', size);
    data.append('category', category);
    data.append('quantity', quantity);
    data.append('description', description);
    data.append('additional_details', additional_details);
    if(attachment) {
      attachment.map(file => {
        return data.append('attachment[]', file, file.name);
      });
    }
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    };
    dispatch({type: FETCH_ITEM_START});
    axios.post('user/items', data, config)
    .then(({data}) => {
      if (data) {
        dispatch({type: FETCH_ITEM_SUCCESS});
        dispatch({type: NEW_ITEM, payload: data.item});
        dispatch({type: CREATE_ITEM_SUCCESS, payload: true});
      } else {
        console.log("payload: data.error", data.error);
        dispatch({type: FETCH_ITEM_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ITEM_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  };
};

export const editItem = (id, 
  {description=null, size=null, quantity=null, category=null, unit_cost=null, additional_details=null, attachment=null, open=null}, admin=false) => {
  const path = admin? `admin/items/${id}` : `user/items/${id}`;
  return (dispatch) => {
    let data = new FormData();
    if(size) {data.append('size', size);}
    if(open !== null) {data.append('open', open);}
    if(category) {data.append('category', category);}
    if(quantity) {data.append('quantity', quantity);}
    if(unit_cost) {data.append('unit_cost', unit_cost);}
    if(description) {data.append('description', description);}
    if(additional_details) {data.append('additional_details', additional_details);}
    if(attachment) {
      attachment.map(file => {
        return data.append('attachment[]', file, file.name);
      });
    }

    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    };
  
    dispatch({type: FETCH_ITEM_START});
    axios.put(path, data, config)
    .then(({data}) => {
      if (data) {
        dispatch({type: FETCH_ITEM_SUCCESS});
        dispatch({type: EDIT_ITEM_SUCCESS, payload: data.item});
        dispatch({type: SHOW_MESSAGE, payload: 'Item updated successfully'});
      } else {
        console.log("payload: data.error", data.error);
        dispatch({type: FETCH_ITEM_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ITEM_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  };
};

export const getItems = (admin=false, s=null, c=null) => {
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
      if (data) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: LIST_ITEMS_SUCCESS});
        dispatch({type: ALL_ITEMS_DATA, payload: data.items});
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

export const getItemBids = (item_id) => {
  return (dispatch) => {
    dispatch({type: FETCH_BID_START});
    axios.get(`admin/items/${item_id}/bids`, {
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    }
    ).then(({data}) => {
      if (data) {
        dispatch({type: FETCH_BID_SUCCESS});
        dispatch({type: LIST_BIDS_SUCCESS});
        dispatch({type: ALL_BIDS_DATA, payload: data.bids});
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

export const skipItem = (item_id) => {
  return (dispatch) => {
    axios.post(`user/items/${item_id}/skip`)
    .then(({data}) => {
      if (data) {
        dispatch({type: SKIP_ITEM_SUCCESS, payload: item_id});
        dispatch({type: SHOW_MESSAGE, payload: 'Item skipped'});
      } else {
        console.log("payload: data.error", data.error);
        dispatch({type: FETCH_ITEM_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ITEM_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  };
};