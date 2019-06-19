import {
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
  LOGOUT,
  LOGOUT_SUCCESS,
  AuthActionValueType,
} from './type';
import { User } from '@src/core/model';

export const signIn = (): AuthActionValueType => ({
  type: SIGN_IN,
});

export const signInSuccess = (user: User): AuthActionValueType => ({
  type: SIGN_IN_SUCCESS,
  user: user,
});

export const singInFailure = (): AuthActionValueType => ({
  type: SIGN_IN_FAILURE,
});

export const singUp = (): AuthActionValueType => ({
  type: SIGN_UP,
});

export const singUpSuccess = (user: User): AuthActionValueType => ({
  type: SIGN_UP_SUCCESS,
  user: user,
});

export const singUpFailure = (): AuthActionValueType => ({
  type: SIGN_UP_FAILURE,
});

export const requestPassword = (): AuthActionValueType => ({
  type: REQUEST_PASSWORD,
});

export const requestPasswordSuccess = (): AuthActionValueType => ({
  type: REQUEST_PASSWORD_SUCCESS,
});

export const requestPasswordFailure = (): AuthActionValueType => ({
  type: REQUEST_PASSWORD_FAILURE,
});

export const restorePassword = (): AuthActionValueType => ({
  type: RESTORE_PASSWORD,
});

export const restorePasswordSuccess = (user: User): AuthActionValueType => ({
  type: RESTORE_PASSWORD_SUCCESS,
  user: user,
});

export const restorePasswordFailure = (): AuthActionValueType => ({
  type: RESTORE_PASSWORD_FAILURE,
});

export const logout = (): AuthActionValueType => ({
  type: LOGOUT,
});

export const logoutSuccess = (): AuthActionValueType => ({
  type: LOGOUT_SUCCESS,
});
