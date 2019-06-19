import React from 'react';
import { Alert } from 'react-native';
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
  restorePasswordFailure,
} from '../../../actions';

interface StateProps {
  loading: boolean;
  restore: () => void;
  restoreSuccess: (user: User) => void;
  restoreFailure: () => void;
}

type ComponentProps = NavigationScreenProps & StateProps;

const mapStateToProps = (state: GlobalState) => ({
  loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch: Function) => ({
  restore: () => dispatch(restorePassword()),
  restoreSuccess: (user: User) => dispatch(restorePasswordSuccess(user)),
  restoreFailure: () => dispatch(restorePasswordFailure()),
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
  private failureMessage: string = 'Something went wrong while Restore Password...';

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
    this.props.restoreFailure();
    Alert.alert(this.failureMessage);
  };

  public render(): React.ReactNode {
    return (
      <RestorePassword
        loading={this.props.loading}
        onRestorePasswordPress={this.onRestorePassword}
      />
    );
  }
}
