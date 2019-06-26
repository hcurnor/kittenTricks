import {
  API_VERBS,
  ApiService,
} from '../core/http/api.service';
import { User } from '@src/core/model';

interface UserApiEndpoints {
  currentUser: string;
}

const endpoints: UserApiEndpoints = {
  currentUser: '/users/current',
};

export interface UserApiResponse {
  [key: string]: any;
}

export class UserApi {

  public getCurrentUser(): Promise<UserApiResponse> {
    return ApiService.fetchApi(
      endpoints.currentUser,
      {},
      API_VERBS.GET,
    );
  }

}
