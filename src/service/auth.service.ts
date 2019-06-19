import {
  SignInFormData,
  SignUpFormData,
  ForgotPasswordFormData,
} from '../containers/auth';
import { AuthApi } from '../api';
import { AuthApiResponse } from '../api/auth.api';
import { User } from '../core/model';
import {
  RestorePasswordFormData,
  ResetPasswordFormData,
} from '@src/components/auth';

export class AuthService {

  private api: AuthApi;

  constructor() {
    this.api = new AuthApi();
  }

  public signIn(formData: SignInFormData): Promise<AuthApiResponse & { user?: User }> {
    return this.api.signIn(formData);
  }

  public signUp(formData: SignUpFormData): Promise<AuthApiResponse & { user?: User }> {
    return this.api.signUp(formData);
  }

  public requestPassword(formData: ForgotPasswordFormData): Promise<string> {
    return this.api.requestPassword(formData)
      .then((data: { token: string }) => data.token);
  }

  public restorePassword(formData: RestorePasswordFormData,
                         token: string): Promise<AuthApiResponse & { user?: User }> {

    return this.api.restorePassword(formData, token);
  }

  public resetPassword(formData: ResetPasswordFormData): Promise<AuthApiResponse> {
    return this.api.resetPassword(formData);
  }

  public logout(): Promise<any> {
    return this.api.logout();
  }
}
