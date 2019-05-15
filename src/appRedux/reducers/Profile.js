
/*jshint esversion: 6 */

import {
  EDIT_PROFILE_SUCCESS,
  LIST_PROFILE_SUCCESS,
  ADMIN_PROFILE_DATA,
  USER_PROFILE_DATA
} from "../../constants/ActionTypes";

const INIT_STATE = {
  editSuccess: false,
  listSuccess: false,
  profile: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case EDIT_PROFILE_SUCCESS: {
      return {
        ...state,
        editSuccess: action.payload
      };
    }

    case LIST_PROFILE_SUCCESS: {
      return {
        ...state,
        listSuccess: true
      };
    }

    case ADMIN_PROFILE_DATA: {
      return {
        ...state,
        profile: action.payload
      };
    }

    case USER_PROFILE_DATA: {
      return {
        ...state,
        profile: action.payload
      };
    }

    default:
      return state;
  }
};
