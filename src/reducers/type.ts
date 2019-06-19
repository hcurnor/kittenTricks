import { User } from '@src/core/model';

export interface AuthState {
  loading: boolean;
  user: User | null;
}
