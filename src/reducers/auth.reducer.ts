import {
  AuthActionValueType,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  REQUEST_PASSWORD,
  REQUEST_PASSWORD_SUCCESS,
  REQUEST_PASSWORD_FAILURE,
  RESTORE_PASSWORD,
  RESTORE_PASSWORD_SUCCESS,
  RESTORE_PASSWORD_FAILURE,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  LOGOUT,
  LOGOUT_SUCCESS,
} from '../actions';
import { AuthState } from './type';

const initialState: AuthState = {
  loading: false,
  user: null,
};

export const auth = (state: AuthState = initialState,
                     action: AuthActionValueType): AuthState => {

  if (!action) {
    return state;
  }

  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        loading: true,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user,
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case SIGN_UP:
      return {
        ...state,
        loading: true,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case REQUEST_PASSWORD:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case REQUEST_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case RESTORE_PASSWORD:
      return {
        ...state,
        loading: true,
      };
    case RESTORE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user,
      };
    case RESTORE_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        loading: true,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
