import React from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';
import { RestorePassword } from './restorePassword.component';
import { RestorePasswordFormData } from '@src/components/auth';
import { AuthService } from '../../../service';
import { User } from '@src/core/model';
import { GlobalState } from '../../../store';
import {
  restorePassword,
  restorePasswordSuccess,
} from '../../../actions';

interface StateProps {
  isAuthenticating: boolean;
  restore: () => void;
  restoreSuccess: (user: User) => void;
}

type ComponentProps = NavigationScreenProps & StateProps;

const mapStateToProps = (state: GlobalState) => ({
  isAuthenticating: state.auth.isAuthenticating,
});

const mapDispatchToProps = (dispatch: Function) => ({
  restore: () => dispatch(restorePassword()),
  restoreSuccess: (user: User) => dispatch(restorePasswordSuccess(user)),
});

interface State {
  resetToken: string;
}

@connect(mapStateToProps, mapDispatchToProps)
export class RestorePasswordContainer extends React.Component<ComponentProps, State> {

  public state: State = {
    resetToken: '',
  };

  private service: AuthService = new AuthService();

  public componentWillMount(): void {
    this.setState({
      resetToken: this.props.navigation.getParam('resetToken'),
    });
  }

  public componentWillUnmount(): void {
    this.setState({ resetToken: '' });
  }

  private onRestorePassword = (data: RestorePasswordFormData): void => {
    this.props.restore();
    this.service.restorePassword(data, this.state.resetToken)
      .then(this.onRestorePasswordSuccess)
      .catch(this.onRestorePasswordFailure);
  };

  private onRestorePasswordSuccess = (response: { success: boolean, user?: User }): void => {
    if (response.success) {
      this.props.restoreSuccess(response.user);
      this.props.navigation.navigate('Home');
    }
  };

  private onRestorePasswordFailure = (): void => {
    console.warn('Something went wrong while restore...');
  };

  public render(): React.ReactNode {
    return (
      <RestorePassword
        isAuthenticating={this.props.isAuthenticating}
        onRestorePasswordPress={this.onRestorePassword}
      />
    );
  }
}