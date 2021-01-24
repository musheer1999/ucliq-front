import { TEST_OTP } from "../actions/types";
import { LOGIN_USER } from "../actions/types";
import { SET_CURRENT_USER } from "../actions/types";
import { USER_SETUP } from "../actions/types";
import { SET_CURRENT_ADMIN } from "../actions/types";
import _ from "lodash";

const initialState = {
  isAuthenticated: false,
  user: {},
  isOTPSubmitted: false,
  isOTPRequired: false,
  isSetupRequired: true,
  isDocVerified: false,
  phoneNo: "",
  isAdmin: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TEST_OTP:
      return {
        ...state,
        OTP: action.payload,
        isOTPSubmitted: true,
        isAuthenticated: true,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isDocVerified: action.isDocVerified,
        isOTPSubmitted: !_.isEmpty(action.payload),
        isAuthenticated: !_.isEmpty(action.payload),
        isSetupRequired: action.isSetupRequired,
      };
    case SET_CURRENT_ADMIN:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !_.isEmpty(action.payload),
        isAdmin: !_.isEmpty(action.payload),
      };
    case LOGIN_USER:
      return {
        ...state,
        phoneNo: action.payload.phoneNo,
        isOTPRequired: !_.isEmpty(action.payload),
      };
    case USER_SETUP:
      return {
        ...state,
        isSetupRequired: _.isEmpty(action.payload),
      };
    default:
      return state;
  }
}
