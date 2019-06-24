import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { SignUp } from './signUp.component';
import { SignUpFormData } from '../type';
import { AuthService } from '../../../service';
import { User } from '@src/core/model';
import { GlobalState } from '@src/store';
import {
  singUp,
  singUpSuccess,
  singUpFailure,
} from '../../../actions';
import {
  resetAndNavigateAction,
  navigateAction,
} from '@src/core/navigation';

interface StateProps {
  loading: boolean;
  signUp: () => void;
  signUpSuccess: (user: User) => void;
  signUpFailure: () => void;
}

type ComponentProps = StateProps & NavigationScreenProps;

const mapStateToProps = (state: GlobalState) => ({
  loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch: Function) => ({
  signUp: () => dispatch(singUp()),
  signUpSuccess: (user: User) => dispatch(singUpSuccess(user)),
  signUpFailure: () => dispatch(singUpFailure()),
});

@connect(mapStateToProps, mapDispatchToProps)
export class SignUpContainer extends React.Component<ComponentProps> {

  private service: AuthService = new AuthService();
  private failureMessage: string = 'Something went wrong while Sign Up...';

  private onSignUpPress = (data: SignUpFormData): void => {
    this.props.signUp();
    this.service.signUp(data)
      .then(this.onSignUpSuccess)
      .catch(this.onSignUpFailure);
  };

  private onSignUpSuccess = (response: { user?: User }): void => {
    this.props.signUpSuccess(response.user);
    this.props.navigation.dispatch(resetAndNavigateAction('Home'));
  };

  private onSignUpFailure = (error: Error): void => {
    Alert.alert(this.failureMessage);
    this.props.signUpFailure();
  };

  private onSignInPress = (): void => {
    this.props.navigation.dispatch(navigateAction('Sign In'));
  };


  private onPhotoPress = (): void => {

  };

  public render(): React.ReactNode {
    return (
      <SignUp
        loading={this.props.loading}
        onSignUpPress={this.onSignUpPress}
        onSignInPress={this.onSignInPress}
        onPhotoPress={this.onPhotoPress}
      />
    );
  }
}
