import React from 'react';
import { connect } from 'react-redux';
import {
  Alert,
  ImageRequireSource,
} from 'react-native';
import { NavigationState } from 'react-navigation';
import { Font } from 'expo';
import { mapping } from '@eva-design/eva';
import { ApplicationProvider } from '@kitten/theme';
import { DynamicStatusBar } from '@src/components/common';
import {
  ApplicationLoader,
  Assets,
} from './core/appLoader/applicationLoader.component';
import { Router } from './core/navigation/routes';
import { trackScreenTransition } from './core/utils/analytics';
import { getCurrentStateName } from '@src/core/navigation/util';
import { themes } from '@src/core/themes';
import { GlobalState } from './store';
import { ThemeEnum, User } from '@src/core/model';
import { getUserProfile } from './actions';
import { UserService } from './service';

const images: ImageRequireSource[] = [
  require('./assets/images/source/image-profile-1.jpg'),
  require('./assets/images/source/image-profile-2.jpg'),
  require('./assets/images/source/image-profile-3.jpg'),
  require('./assets/images/source/image-profile-4.jpg'),
  require('./assets/images/source/image-profile-5.jpg'),
  require('./assets/images/source/image-profile-6.jpg'),
  require('./assets/images/source/image-profile-7.jpg'),
  require('./assets/images/source/image-profile-8.jpg'),
  require('./assets/images/source/image-profile-9.jpg'),
  require('./assets/images/source/image-profile-10.jpg'),
];

const fonts: Font.FontMap = {
  'opensans-semibold': require('./assets/fonts/opensans-semibold.ttf'),
  'opensans-bold': require('./assets/fonts/opensans-bold.ttf'),
  'opensans-extrabold': require('./assets/fonts/opensans-extra-bold.ttf'),
  'opensans-light': require('./assets/fonts/opensans-light.ttf'),
  'opensans-regular': require('./assets/fonts/opensans-regular.ttf'),
};

const assets: Assets = {
  images: images,
  fonts: fonts,
};

const mapStateToProps = (state: GlobalState) => ({
  theme: state.theme,
  user: state.user.user,
});

const mapDispatchToProps = (dispatch: Function) => ({
  setUserProfile: (user?: User) => dispatch(getUserProfile(user)),
});

interface MainComponentProps {
  theme?: ThemeEnum;
  user?: User;
  setUserProfile?: (user: User) => void;
}

@connect(mapStateToProps, mapDispatchToProps)
export class Main extends React.Component<MainComponentProps> {

  public componentWillMount(): void {
    this.setCurrentUser();
  }

  private userService: UserService = new UserService();
  private failureMessage: string = 'Something went wrong while getting Profile Info';

  private setCurrentUser = (): void => {
    if (!this.props.user) {
      this.userService.getCurrentUser()
        .then(this.onGetCurrentUserSuccess)
        .catch(this.onGetCurrentUserError);
    }
  };

  private onGetCurrentUserSuccess = (user: User): void => {
    this.props.setUserProfile(user);
  };

  private onGetCurrentUserError = (): void => {
    Alert.alert(this.failureMessage);
  };

  private onTransitionTrackError = (error: any): void => {
    console.warn('Analytics error: ', error.message);
  };

  private onNavigationStateChange = (prevState: NavigationState, currentState: NavigationState) => {
    const prevStateName: string = getCurrentStateName(prevState);
    const currentStateName: string = getCurrentStateName(currentState);

    if (prevStateName !== currentStateName) {
      trackScreenTransition(currentStateName)
        .catch(this.onTransitionTrackError);
    }
  };

  public render(): React.ReactNode {
    const { theme } = this.props;

    return (
      <ApplicationLoader assets={assets}>
        <ApplicationProvider
          mapping={mapping}
          theme={themes[theme]}>
          <DynamicStatusBar currentTheme={theme}/>
          <Router onNavigationStateChange={this.onNavigationStateChange}/>
        </ApplicationProvider>
      </ApplicationLoader>
    );
  }
}
