/*jshint esversion: 9 */

// eslint-disable-next-line 
import {
  INIT_URL,
  CREATE_ITEM_SUCCESS,
  EDIT_ITEM_SUCCESS,
  LIST_ITEMS_SUCCESS,
  // ALL_ITEMS_DATA,
  SHOW_MESSAGE,
  FETCH_ITEM_ERROR,
  FETCH_ITEM_START,
  FETCH_ITEM_SUCCESS,
  SINGLE_ITEM_DATA,
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
    axios.post('user/orders/'+ref+'/items', data, config)
    .then(({data}) => {
      console.log(data.item);
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

export const editItem = (ref, id, 
  {description=null, size=null, quantity=null, category=null, unit_cost=null, additional_details=null, attachment=null, open=null}, admin=false) => {
  const path = admin? 'admin/orders/' : 'user/orders/';
  const route = path+ref+'/items/'+id;
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
    axios.put(route, data, config)
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