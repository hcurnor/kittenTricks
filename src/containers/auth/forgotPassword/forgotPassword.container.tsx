import React from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';
import { ForgotPasswordFormData } from '../type';
import { ForgotPassword } from './forgotPassword.component';
import { AuthService } from '../../../service';
import { GlobalState } from '../../../store';
import {
  resetPassword,
  resetPasswordSuccess,
  resetPasswordFailure,
} from '../../../actions';

interface StateProps {
  loading: boolean;
  reset: () => void;
  resetSuccess: () => void;
  resetFailure: () => void;
}

type ComponentProps = StateProps & NavigationScreenProps;

const mapStateToProps = (state: GlobalState) => ({
  loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch: Function) => ({
  reset: () => dispatch(resetPassword()),
  resetSuccess: () => dispatch(resetPasswordSuccess()),
  resetFailure: () => dispatch(resetPasswordFailure()),
});

@connect(mapStateToProps, mapDispatchToProps)
export class ForgotPasswordContainer extends React.Component<ComponentProps> {

  private service: AuthService = new AuthService();
  private failureMessage: string = 'Something went wrong while Reset Password';

  private onResetPress = (data: ForgotPasswordFormData): void => {
    this.props.reset();
    this.service.resetPassword(data)
      .then(this.navigateToRestorePassword)
      .catch(this.onResetFailure);
  };

  private navigateToRestorePassword = (resetToken: string): void => {
    this.props.resetSuccess();
    this.props.navigation.navigate('Restore Password', {
      resetToken: resetToken,
    });
  };

  private onResetFailure = (): void => {
    Alert.alert(this.failureMessage);
    this.props.resetFailure();
  };

  public render(): React.ReactNode {
    return (
      <ForgotPassword
        loading={this.props.loading}
        onResetPress={this.onResetPress}
      />
    );
  }
}
