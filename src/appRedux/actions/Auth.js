/*jshint esversion: 9 */

import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  INIT_URL,
  SHOW_MESSAGE,
  SIGNOUT_USER_SUCCESS,
  USER_DATA,
  USER_TOKEN_SET,
  USER_EXPIRATION_SET,
  USER_PASSWORD_CHANGED
} from "../../constants/ActionTypes";
import axios from 'util/Api';

export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url
  };
};

export const userSignUp = ({email, password, name}) => {
  console.log(email, password);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('auth/register', {
        email: email,
        password: password,
        name: name
      }
    ).then(({data}) => {
      console.log("data:", data);
      if (data.result) {
        localStorage.setItem("token", JSON.stringify(data.token.access_token));
        axios.defaults.headers.common['access-token'] = "Bearer " + data.token.access_token;
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_TOKEN_SET, payload: data.token.access_token});
        dispatch({type: USER_DATA, payload: data.user});
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

export const userSignIn = ({email, password}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('auth/login', {
        email: email,
        password: password,
      }
    ).then(({data}) => {
      // console.log("userSignIn: ", data);
      if (data.result) {
        localStorage.setItem("token", JSON.stringify(data.token.access_token));
        localStorage.setItem("expires_in", JSON.stringify(data.token.expires_in));
        axios.defaults.headers.common['access-token'] = "Bearer " + data.token.access_token;
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_TOKEN_SET, payload: data.token.access_token});
        dispatch({type: USER_EXPIRATION_SET, payload: data.token.expires_in});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  };
};

export const userRefresh = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('auth/refresh')
    .then(({data}) => {
      console.log("userSignIn: ", data);
      // if (data.result) {
      //   localStorage.setItem("token", JSON.stringify(data.token.access_token));
      //   axios.defaults.headers.common['access-token'] = "Bearer " + data.token.access_token;
      //   dispatch({type: FETCH_SUCCESS});
      //   dispatch({type: USER_TOKEN_SET, payload: data.token.access_token});
      // } else {
      //   dispatch({type: FETCH_ERROR, payload: data.error});
      // }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  };
};

export const getUser = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('auth/me',
    ).then(({data}) => {
      if (data) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_DATA, payload: data});
        localStorage.setItem("user", JSON.stringify(data));
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      localStorage.removeItem("token");
      dispatch({type: FETCH_SUCCESS});
      dispatch({type: SIGNOUT_USER_SUCCESS});
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  };
};

export const changeAvatar = ({file, onSuccess}) => {
  return (dispatch) => {
    let data = new FormData();
    // console.log(file);
    dispatch({type: FETCH_START});
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    };
    data.append('avatar', file, file.name);
    axios.post('auth/me/avatar', data, config)
    .then(({data}) => {
      var user = JSON.parse(localStorage.getItem('user'));
      // console.log("user", user);
      user.avatar = data.image;
      dispatch({type: USER_DATA, payload: user});
      // console.log(data);
      onSuccess();
      // if (data.result) {
      //   localStorage.removeItem("token");
      //   dispatch({type: FETCH_SUCCESS});
      //   dispatch({type: SIGNOUT_USER_SUCCESS});
      // } else {
      //   dispatch({type: FETCH_ERROR, payload: data.error});
      // }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  };
};

export const changePasswd = ({old_password, new_password, confirm_password}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('auth/me/password', {
        old_password: old_password,
        new_password: new_password,
        confirm_password: confirm_password
      }
    ).then(({data}) => {
      if (data.message) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_PASSWORD_CHANGED, payload: true});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.response.data});
      dispatch({type: SHOW_MESSAGE, payload: error.response.data.message});
      console.log("Error****:", error);
    });
  };
};

export const editDetails = ({old_password, new_password, confirm_password}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('auth/me/password', {
        old_password: old_password,
        new_password: new_password,
        confirm_password: confirm_password
      }
    ).then(({data}) => {
      if (data.result) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SIGNOUT_USER_SUCCESS});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  };
};

export const userSignOut = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('auth/logout')
    .then(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("expires_in");
      localStorage.removeItem("user");
      dispatch({type: FETCH_SUCCESS});
      dispatch({type: SIGNOUT_USER_SUCCESS});
      dispatch({type: USER_PASSWORD_CHANGED, payload: false});
    }).catch(function (error) {
      localStorage.removeItem("token");
      dispatch({type: FETCH_SUCCESS});
      dispatch({type: SIGNOUT_USER_SUCCESS});
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  };
};
