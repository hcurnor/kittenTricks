import React from 'react';
import { connect } from 'react-redux';
import { ImageRequireSource } from 'react-native';
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
});

@connect(mapStateToProps, null)
export class Main extends React.Component<GlobalState> {

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
