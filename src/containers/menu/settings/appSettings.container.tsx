import React from 'react';
import { connect } from 'react-redux';
import {
  NavigationActions,
  StackActions,
  NavigationScreenProps, NavigationResetAction,
} from 'react-navigation';
import { AppSettings } from './appSettings.component';
import { AuthService } from '../../../service';
import { GlobalState } from '../../../store';
import {
  logout,
  logoutSuccess,
} from '../../../actions';

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

  private onEditProfilePress = (): void => {

  };

  private onChangePasswordPress = (): void => {

  };

  private onLogoutPress = (): void => {
    this.props.logout();
    this.service.logout()
      .then(this.onLogout);
  };

  private onLogout = (): void => {
    this.props.logoutSuccess();

    const resetAction: NavigationResetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'App Auth' })],
    });
    this.props.navigation.dispatch(resetAction);
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
