import {
  ForgotPasswordFormData,
  SignInFormData,
  SignUpFormData,
} from '../containers/auth';
import {
  API_VERBS,
  ApiService,
} from '../core/http/api.service';
import { AuthStorageService } from '@src/core/authStorage/authStorage.service';
import { User } from '@src/core/model';
import { RestorePasswordFormData } from '@src/components/auth';

interface AuthApiEndpoints {
  signIn: string;
  signUp: string;
  resetPassword: string;
  restorePassword: string;
  logout: string;
  currentUser: string;
}

const endpoints: AuthApiEndpoints = {
  signIn: '/auth/login',
  signUp: '/auth/sign-up',
  resetPassword: '/auth/request-pass',
  restorePassword: '/auth/restore-pass',
  logout: '/auth/sign-out',
  currentUser: '/users/current',
};

export interface AuthApiResponse {
  success: boolean;

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

  public resetPassword(formData: ForgotPasswordFormData): Promise<{ token: string }> {
    return ApiService.fetchApi(
      endpoints.resetPassword,
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

  public logout(): Promise<any> {
    return ApiService.fetchApi(
      endpoints.logout,
      {},
      API_VERBS.POST,
      {},
      false,
    )
      .then(this.resetToken);
  }

  private resetToken = (): Promise<void> => {
    return AuthStorageService.setToken('');
  };

  private processToken = (response: { token: string }): Promise<AuthApiResponse> => {
    return this.setToken(response.token)
      .then((token: string) => {
        if (token) {
          return this.getCurrentUser()
            .then((user: User) => {
              return {
                success: true,
                user: user,
                token: token,
              };
            });
        }
      })
      .catch(() => ({ success: false }));
  };

  private setToken(token: string): Promise<string> {
    return AuthStorageService.setToken(token)
      .then(() => token);
  }

  private getCurrentUser(): Promise<User> {
    return ApiService.fetchApi(
      endpoints.currentUser,
      {},
      API_VERBS.GET,
    );
  }
}
