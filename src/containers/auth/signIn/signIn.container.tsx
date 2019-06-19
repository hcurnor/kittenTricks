import React from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { SignIn } from './signIn.component';
import { SignInFormData } from '../type';
import { AuthService } from '../../../service';
import {
  signIn,
  signInSuccess,
  singInFailure,
} from '../../../actions';
import { GlobalState } from '../../../store';
import { User } from '../../../core/model';

interface StateProps {
  loading: boolean;
  signIn: () => void;
  signInSuccess: (user: User) => void;
  signInFailure: () => void;
}

type ComponentProps = StateProps & NavigationScreenProps;

const mapStateToProps = (state: GlobalState) => ({
  loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch: Function) => ({
  signIn: () => dispatch(signIn()),
  signInSuccess: (user: User) => dispatch(signInSuccess(user)),
  signInFailure: () => dispatch(singInFailure()),
});

@connect(mapStateToProps, mapDispatchToProps)
export class SignInContainer extends React.Component<ComponentProps> {

  private service: AuthService = new AuthService();
  private failureMessage: string = 'Something went wrong while Sign In...';

  private onSignInPress = (data: SignInFormData): void => {
    this.props.signIn();
    this.service.signIn(data)
      .then(this.onSingInSuccess)
      .catch(this.onSignInFailure);
  };

  private onSingInSuccess = (response: { success: boolean, user?: User }): void => {
    if (response.success) {
      this.props.signInSuccess(response.user);
      this.props.navigation.navigate('Home');
    }
  };

  private onSignInFailure = (error: any): void => {
    Alert.alert(this.failureMessage);
    this.props.signInFailure();
  };

  private onSignUpPress = (): void => {
    this.props.navigation.navigate('Sign Up');
  };

  private onForgotPasswordPress = (): void => {
    this.props.navigation.navigate('Forgot Password');
  };

  public render(): React.ReactNode {
    return (
      <SignIn
        loading={this.props.loading}
        onSignInPress={this.onSignInPress}
        onSignUpPress={this.onSignUpPress}
        onForgotPasswordPress={this.onForgotPasswordPress}
      />
    );
  }
}
