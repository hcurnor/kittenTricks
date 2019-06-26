import { User } from '@src/core/model';

export interface AuthState {
  loading: boolean;
  user: User | null;
}

export interface UserState {
  user: User | null;
}
