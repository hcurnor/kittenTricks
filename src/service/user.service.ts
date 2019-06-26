import {
  UserApi,
  UserApiResponse,
} from '../api/user.api';

export class UserService {

  api: UserApi;

  constructor() {
    this.api = new UserApi();
  }

  public getCurrentUser(): Promise<UserApiResponse> {
    return this.api.getCurrentUser();
  }
}
