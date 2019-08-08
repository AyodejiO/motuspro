/*jshint esversion: 9 */

// eslint-disable-next-line 
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  INIT_URL,
  EDIT_PROFILE_SUCCESS,
  LIST_PROFILE_SUCCESS,
  ADMIN_PROFILE_DATA,
  USER_PROFILE_DATA
} from "../../constants/ActionTypes";
import axios from 'util/Api';

export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url
  };
};

export const getAdminProfile = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('user', 
    ).then(({data}) => {
      if (data.data) {
        // console.log(data)
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: LIST_PROFILE_SUCCESS});
        dispatch({type: ADMIN_PROFILE_DATA, payload: data.data});
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

export const getUserProfile = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('user', 
    ).then(({data}) => {
      if (data.data) {
        // console.log(data)
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: LIST_PROFILE_SUCCESS});
        dispatch({type: USER_PROFILE_DATA, payload: data.data});
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

export const editProfileForm = () => {
  return (dispatch) => {
    dispatch({type: EDIT_PROFILE_SUCCESS, payload: false});
  };
};

export const editAdminProfile = ({client_name, admin_name, admin_email, admin_phone}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('admin/clients', {
        client_name, admin_name, admin_email, admin_phone
      }
    ).then(({data}) => {
      if (data) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: EDIT_PROFILE_SUCCESS, payload: true});
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

export const editClientProfile = ({client_name, admin_name, admin_email, admin_phone}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('admin/clients', {
        client_name, admin_name, admin_email, admin_phone
      }
    ).then(({data}) => {
      if (data) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: EDIT_PROFILE_SUCCESS, payload: true});
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

export const editVendorProfile = ({client_name, admin_name, admin_email, admin_phone}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('admin/clients', {
        client_name, admin_name, admin_email, admin_phone
      }
    ).then(({data}) => {
      if (data) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: EDIT_PROFILE_SUCCESS, payload: true});
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
