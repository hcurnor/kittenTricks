import React from 'react';
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
import { connect } from 'react-redux';

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

  private onSignUpSuccess = (response: { success: boolean, user?: User }): void => {
    if (response.success) {
      this.props.signUpSuccess(response.user);
      this.props.navigation.navigate('Home');
    }
  };

  private onSignUpFailure = (error: any): void => {
    Alert.alert(this.failureMessage);
    this.props.signUpFailure();
  };

  private onSignInPress = (): void => {
    this.props.navigation.navigate('Sign In');
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
