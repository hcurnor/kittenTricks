import {
  ForgotPasswordFormData,
  SignInFormData,
  SignUpFormData,
} from '../containers/auth';
import {
  API_VERBS,
  ApiService,
} from '../core/http/api.service';
import {
  AuthStorageService,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from '@src/core/authStorage/authStorage.service';
import { User } from '@src/core/model';
import {
  ResetPasswordFormData,
  RestorePasswordFormData,
} from '@src/components/auth';

interface AuthApiEndpoints {
  signIn: string;
  signUp: string;
  requestPassword: string;
  restorePassword: string;
  resetPassword: string;
  logout: string;
  refreshToken: string;
  currentUser: string;
}

export const endpoints: AuthApiEndpoints = {
  signIn: '/auth/login',
  signUp: '/auth/sign-up',
  requestPassword: '/auth/request-pass',
  restorePassword: '/auth/restore-pass',
  resetPassword: '/auth/reset-pass',
  logout: '/auth/sign-out',
  refreshToken: '/auth/refresh-token',
  currentUser: '/users/current',
};

export interface AuthApiResponse {
  [key: string]: any;
}

export interface ServerApiResponse {
  access_token?: string;
  expires_in?: number;
  refresh_token?: string;

  [key: string]: any;
}

export class AuthApi {

  public signIn(formData: SignInFormData): Promise<AuthApiResponse> {
    return ApiService.fetchApi(
      endpoints.signIn,
      { email: formData.username, password: formData.password },
      API_VERBS.POST,
      {},
      false,
    )
      .then(this.processToken);
  }

  public signUp(formData: SignUpFormData): Promise<AuthApiResponse> {
    const payload = {
      fullName: formData.username,
      confirmPassword: formData.password,
      email: formData.email,
      password: formData.password,
    };
    return ApiService.fetchApi(
      endpoints.signUp,
      payload,
      API_VERBS.POST,
      {},
      false,
    )
      .then(this.processToken);
  }

  public requestPassword(formData: ForgotPasswordFormData): Promise<{ token: string }> {
    return ApiService.fetchApi(
      endpoints.requestPassword,
      { email: formData.email },
      API_VERBS.POST,
      {},
      false,
    );
  }

  public restorePassword(formData: RestorePasswordFormData, token: string): Promise<AuthApiResponse> {
    const payload = {
      email: formData.email,
      newPassword: formData.password,
      confirmPassword: formData.confirmPassword,
      token: token,
    };
    return ApiService.fetchApi(
      endpoints.restorePassword,
      payload,
      API_VERBS.POST,
      {},
      false,
    )
      .then(this.processToken);
  }

  public resetPassword(formData: ResetPasswordFormData): Promise<AuthApiResponse> {
    const payload = {
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmNewPassword,
    };
    return ApiService.fetchApi(
      endpoints.resetPassword,
      payload,
      API_VERBS.POST,
      {},
      true,
    );
  }

  public logout(): Promise<any> {
    return ApiService.fetchApi(
      endpoints.logout,
      {},
      API_VERBS.POST,
      {},
      false,
    )
      .then(this.clearAuthData);
  }

  private clearAuthData = (): Promise<void[]> => {
    return Promise.all([
      this.clearAccessToken(),
      this.clearRefreshToken(),
      this.clearExpirationDate(),
    ]);
  };

  private clearAccessToken = (): Promise<void> => {
    return AuthStorageService.setToken(ACCESS_TOKEN_KEY, '');
  };

  private clearRefreshToken = (): Promise<void> => {
    return AuthStorageService.setToken(REFRESH_TOKEN_KEY, '');
  };

  private clearExpirationDate = (): Promise<void> => {
    return AuthStorageService.setExpirationDate(0);
  };

  private processToken = (response: { token: ServerApiResponse }): Promise<AuthApiResponse> => {
    return Promise.all([
      this.setToken(ACCESS_TOKEN_KEY, response.token.access_token),
      this.setToken(REFRESH_TOKEN_KEY, response.token.refresh_token),
      this.setExpirationDate(response.token.expires_in),
    ])
      .then(([accessToken]: [string, string, number]) => accessToken)
      .then((token: string) => this.getCurrentUser())
      .then((user: User) => ({
        user: user,
        token: response.token.access_token,
      }));
  };

  private setToken(key: string, token: string): Promise<string> {
    return AuthStorageService.setToken(key, token)
      .then(() => token);
  }

  private setExpirationDate = (date: number): Promise<number> => {
    return AuthStorageService.setExpirationDate(date)
      .then(() => date);
  };

  private getCurrentUser(): Promise<User> {
    return ApiService.fetchApi(
      endpoints.currentUser,
      {},
      API_VERBS.GET,
    );
  }
}
