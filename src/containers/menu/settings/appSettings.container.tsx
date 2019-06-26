import React from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';
import { AppSettings } from './appSettings.component';
import { AuthService } from '../../../service';
import { GlobalState } from '../../../store';
import {
  logout,
  logoutSuccess,
} from '../../../actions';
import { resetAndNavigateAction } from '@src/core/navigation';

interface StateProps {
  loading: boolean;
  logout: () => void;
  logoutSuccess: () => void;
}

const mapStateToProps = (state: GlobalState) => ({
  loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch: Function) => ({
  logout: () => dispatch(logout()),
  logoutSuccess: () => dispatch(logoutSuccess()),
});

type ComponentProps = NavigationScreenProps & StateProps;

@connect(mapStateToProps, mapDispatchToProps)
export class AppSettingsContainer extends React.Component<ComponentProps> {

  private service: AuthService = new AuthService();
  private navigationKey: string = 'AppSettingsContainer';

  private onEditProfilePress = (): void => {
    this.props.navigation.navigate({
      key: this.navigationKey,
      routeName: 'Profile Settings',
    });
  };

  private onChangePasswordPress = (): void => {
    this.props.navigation.navigate({
      key: this.navigationKey,
      routeName: 'Reset Password',
    });
  };

  private onLogoutPress = (): void => {
    this.props.logout();
    this.service.logout()
      .then(this.onLogout);
  };

  private onLogout = (): void => {
    this.props.logoutSuccess();
    this.props.navigation.dispatch(resetAndNavigateAction('App Auth'));
  };

  public render(): React.ReactNode {
    return (
      <AppSettings
        loading={this.props.loading}
        onEditProfilePress={this.onEditProfilePress}
        onChangePasswordPress={this.onChangePasswordPress}
        onLogoutPress={this.onLogoutPress}
      />
    );
  }
}
