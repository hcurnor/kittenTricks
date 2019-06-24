import React from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';
import { ResetPassword } from './resetPassword.component';
import { ResetPasswordFormData } from '@src/components/auth';
import { User } from '@src/core/model';
import { AuthService } from '../../../service';
import { AuthApiResponse } from '../../../api/auth.api';
import { GlobalState } from '../../../store';
import {
  resetPassword,
  resetPasswordSuccess,
  resetPasswordFailure,
} from '../../../actions';
import { resetAndNavigateAction } from '@src/core/navigation';

interface StateProps {
  loading: boolean;
  reset: () => void;
  resetSuccess: () => void;
  resetFailure: () => void;
}

type ComponentProps = NavigationScreenProps & StateProps;

const mapStateToProps = (state: GlobalState) => ({
  loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch: Function) => ({
  reset: () => dispatch(resetPassword()),
  resetSuccess: (user: User) => dispatch(resetPasswordSuccess(user)),
  resetFailure: () => dispatch(resetPasswordFailure()),
});

@connect(mapStateToProps, mapDispatchToProps)
export class ResetPasswordContainer extends React.Component<ComponentProps> {

  private service: AuthService = new AuthService();
  private failureMessage: string = 'Something went wrong while Reset Password';

  private onResetPassword = (data: ResetPasswordFormData): void => {
    this.props.reset();
    this.service.resetPassword(data)
      .then(this.onResetPasswordSuccess)
      .catch(this.onResetPasswordFailure);
  };

  private onResetPasswordSuccess = (response: AuthApiResponse): void => {
    this.props.resetSuccess();
    this.props.navigation.dispatch(resetAndNavigateAction('App Auth'));
  };

  private onResetPasswordFailure = (): void => {
    this.props.resetFailure();
    Alert.alert(this.failureMessage);
  };

  public render(): React.ReactNode {
    return (
      <ResetPassword
        loading={this.props.loading}
        onResetPasswordPress={this.onResetPassword}
      />
    );
  }
}
