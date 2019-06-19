import {
  SignInFormData,
  SignUpFormData,
  ForgotPasswordFormData,
} from '../containers/auth';
import { AuthApi } from '../api';
import { AuthApiResponse } from '../api/auth.api';
import { User } from '../core/model';
import { RestorePasswordFormData } from '@src/components/auth';

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

  public resetPassword(formData: ForgotPasswordFormData): Promise<string> {
    return this.api.resetPassword(formData)
      .then((data: { token: string }) => data.token);
  }

  public restorePassword(formData: RestorePasswordFormData,
                         token: string): Promise<AuthApiResponse & { user?: User }> {

    return this.api.restorePassword(formData, token);
  }

  public logout(): Promise<any> {
    return this.api.logout();
  }
}
