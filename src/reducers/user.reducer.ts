import {
  GET_USER_PROFILE,
  UserActionValueType,
} from '../actions';
import { UserState } from './type';

const initialState: UserState = {
  user: null,
};

export const user = (state: UserState = initialState,
                     action: UserActionValueType): UserState => {

  if (!action) {
    return state;
  }

  switch (action.type) {
    case GET_USER_PROFILE:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }

};
