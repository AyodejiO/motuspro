/*jshint esversion: 9 */

import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  USER_TOKEN_SET,
  SIGNOUT_USER_SUCCESS,
  USER_EXPIRATION_SET
} from "../../constants/ActionTypes";
import axios from 'util/Api';
import * as jwt_decode from "jwt-decode";

export default function requestMiddleware() {
    return ({ dispatch, getState }) => next => (action) => {
      const { type } = action;
      const { token } = getState().auth;
      // console.log("token", token);
      if (!type || token === null) {
        return next(action);
      }
      if(type === "@@router/LOCATION_CHANGE") {   
        const {exp} = jwt_decode(token);
        // console.log("exp", exp);
        // console.log("cat", Math.floor(new Date().valueOf() / 1000));
        if(exp < Math.floor(new Date().valueOf() / 1000)) {
          // console.log("expired");
          dispatch({type: FETCH_START});
          axios.post('auth/refresh')
          .then(({data}) => {
            console.log("userRefresh: ", data);
            if (data.result) {
              localStorage.setItem("token", JSON.stringify(data.token.access_token));
              localStorage.setItem("expires_in", JSON.stringify(data.token.expires_in));
              axios.defaults.headers.common['access-token'] = "Bearer " + data.token.access_token;
              dispatch({type: FETCH_SUCCESS});
              dispatch({type: USER_TOKEN_SET, payload: data.token.access_token});
              dispatch({type: USER_EXPIRATION_SET, payload: data.token.expires_in});
              return next(action);
            } else {
              dispatch({type: FETCH_ERROR, payload: data.error});
              axios.post('auth/logout')
              .then(() => {
                localStorage.removeItem("token");
                dispatch({type: FETCH_SUCCESS});
                dispatch({type: SIGNOUT_USER_SUCCESS});
                return next(action);
              }).catch(function (error) {
                dispatch({type: FETCH_ERROR, payload: error.message});
                console.log("Error****:", error.message);
                return next(action);
              });
            }
          }).catch(function (error) {
            console.log("Error****:", error.message);
            localStorage.removeItem("token");
            dispatch({type: FETCH_SUCCESS});
            dispatch({type: SIGNOUT_USER_SUCCESS});
          });
        }
      }  
    };
  }