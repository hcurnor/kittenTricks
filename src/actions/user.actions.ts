import {
  GET_USER_PROFILE,
  UserActionValueType,
} from './type';
import { User } from '@src/core/model';

export const getUserProfile = (user?: User): UserActionValueType => ({
  type: GET_USER_PROFILE,
  user: user ? user : null,
});
