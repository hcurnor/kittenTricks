import {
  ThemeEnum,
  User,
} from '@src/core/model';

export interface ActionValueType {
  type: string;
}

export interface ToggleThemeActionValueType extends ActionValueType {
  payload: ThemeEnum;
}

export interface AuthActionValueType extends ActionValueType {
  user?: User;
}

export const TOGGLE_THEME: string = 'TOGGLE_THEME';

export const SIGN_IN: string = 'SIGN_IN';
export const SIGN_IN_SUCCESS: string = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE: string = 'SIGN_IN_FAILURE';
export const SIGN_UP: string = 'SIGN_UP';
export const SIGN_UP_SUCCESS: string = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE: string = 'SIGN_UP_Failure';
export const REQUEST_PASSWORD: string = 'RESET_PASSWORD';
export const REQUEST_PASSWORD_SUCCESS: string = 'RESET_PASSWORD_SUCCESS';
export const REQUEST_PASSWORD_FAILURE: string = 'RESET_PASSWORD_FAILURE';
export const RESTORE_PASSWORD: string = 'RESTORE_PASSWORD';
export const RESTORE_PASSWORD_SUCCESS: string = 'RESTORE_PASSWORD_SUCCESS';
export const RESTORE_PASSWORD_FAILURE: string = 'RESTORE_PASSWORD_FAILURE';
export const LOGOUT: string = 'LOGOUT';
export const LOGOUT_SUCCESS: string = 'LOGOUT_SUCCESS';
