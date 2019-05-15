/*jshint esversion: 6 */

// eslint-disable-next-line 
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  INIT_URL,
  CREATE_USER_SUCCESS,
  LIST_USER_SUCCESS,
  ALL_USERS_DATA
} from "../../constants/ActionTypes";
import axios from 'util/Api';

export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url
  };
};

export const getAdminUsers = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('admin/admins', 
    ).then(({data}) => {
      if (data.data) {
        // console.log(data)
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: LIST_USER_SUCCESS});
        dispatch({type: ALL_USERS_DATA, payload: data.data});
      } else {
        console.log("payload: data.error", data.error);
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  }
};

export const getUsers = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('admin/users', 
    ).then(({data}) => {
      if (data.data) {
        // console.log(data)
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: LIST_USER_SUCCESS});
        dispatch({type: ALL_USERS_DATA, payload: data.data});
      } else {
        console.log("payload: data.error", data.error);
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  }
};

export const addAdminUser = ({name, email, phone}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('admin/admins', {
        name, email, phone
      }
    ).then(({data}) => {
      if (data) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: CREATE_USER_SUCCESS});
        // dispatch({type: USER_TOKEN_SET, payload: data.token.access_token});
        // dispatch({type: USER_DATA, payload: data.user});
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

// export const userSignIn = ({email, password}) => {
//   return (dispatch) => {
//     dispatch({type: FETCH_START});
//     axios.post('auth/login', {
//         email: email,
//         password: password,
//       }
//     ).then(({data}) => {
//       console.log("userSignIn: ", data);
//       if (data.result) {
//         localStorage.setItem("token", JSON.stringify(data.token.access_token));
//         axios.defaults.headers.common['access-token'] = "Bearer " + data.token.access_token;
//         dispatch({type: FETCH_SUCCESS});
//         dispatch({type: USER_TOKEN_SET, payload: data.token.access_token});
//       } else {
//         dispatch({type: FETCH_ERROR, payload: data.error});
//       }
//     }).catch(function (error) {
//       dispatch({type: FETCH_ERROR, payload: error.message});
//       console.log("Error****:", error.message);
//     });
//   }
// };

// export const getUser = () => {
//   return (dispatch) => {
//     dispatch({type: FETCH_START});
//     axios.post('auth/me',
//     ).then(({data}) => {
//       console.log("userSignIn: ", data);
//       if (data) {
//         dispatch({type: FETCH_SUCCESS});
//         dispatch({type: USER_DATA, payload: data});
//       } else {
//         dispatch({type: FETCH_ERROR, payload: data.error});
//       }
//     }).catch(function (error) {
//       dispatch({type: FETCH_ERROR, payload: error.message});
//       console.log("Error****:", error.message);
//     });
//   }
// };