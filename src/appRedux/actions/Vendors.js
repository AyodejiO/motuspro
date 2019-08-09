/*jshint esversion: 9 */

// eslint-disable-next-line 
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  INIT_URL,
  CREATE_VENDOR_SUCCESS,
  LIST_VENDOR_SUCCESS,
  ALL_VENDORS_DATA
} from "../../constants/ActionTypes";
import axios from 'util/Api';

export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url
  };
};

export const getVendors = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('admin/vendors', 
    ).then(({data}) => {
      if (data.data) {
        // console.log(data)
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: LIST_VENDOR_SUCCESS});
        dispatch({type: ALL_VENDORS_DATA, payload: data.data});
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

export const addVendorForm = () => {
  return (dispatch) => {
    dispatch({type: CREATE_VENDOR_SUCCESS, payload: false});
  };
};
ee
export const addVendor = ({vendor_name, vendor_type, admin_name, admin_email, admin_phone}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('admin/vendors', {
      vendor_name, vendor_type, admin_name, admin_email, admin_phone
      }
    ).then(({data}) => {
      if (data) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: CREATE_VENDOR_SUCCESS, payload: true});
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