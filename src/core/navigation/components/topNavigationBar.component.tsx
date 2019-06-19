import React from 'react';
import {
  StyleType,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import { ImageProps } from 'react-native';
import {
  TopNavigation,
  TopNavigationAction,
  TopNavigationActionProps,
  TopNavigationProps,
} from '@kitten/ui';
import { textStyle } from '@src/components/common';
import { SafeAreaView } from './safeAreaView.component';

export interface ComponentProps {
  backIcon?: IconProp;
  settingsIcon?: IconProp;
  onBackPress?: () => void;
  onSettingsPress?: () => void;
}

export type TopNavigationBarProps = TopNavigationProps & ComponentProps;

type IconProp = (style: StyleType) => React.ReactElement<ImageProps>;
type ActionElement = React.ReactElement<TopNavigationActionProps>;

class TopNavigationBarComponent extends React.Component<TopNavigationBarProps> {

  private onBackButtonPress = () => {
    if (this.props.onBackPress) {
      this.props.onBackPress();
    }
  };

  private onSettingsButtonPress = (): void => {
    if (this.props.onSettingsPress) {
      this.props.onSettingsPress();
    }
  };

  private renderBackButton = (source: IconProp): ActionElement => {
    return (
      <TopNavigationAction
        icon={source}
        onPress={this.onBackButtonPress}
      />
    );
  };

  private renderSettingsButton = (source: IconProp): ActionElement => {
    return (
      <TopNavigationAction
        icon={source}
        onPress={this.onSettingsButtonPress}
      />
    );
  };

  public render(): React.ReactNode {
    const { themedStyle, title, backIcon, settingsIcon } = this.props;

    const leftControlElement: ActionElement | null = backIcon ?
      this.renderBackButton(backIcon) : null;
    const settingsControl: ActionElement | null = settingsIcon ?
      this.renderSettingsButton(settingsIcon) : null;

    return (
      <SafeAreaView style={themedStyle.safeArea}>
        <TopNavigation
          alignment='center'
          title={title}
          titleStyle={textStyle.subtitle}
          subtitleStyle={textStyle.caption1}
          leftControl={leftControlElement}
          rightControls={[settingsControl]}
        />
      </SafeAreaView>
    );
  }
}

export const TopNavigationBar = withStyles(TopNavigationBarComponent, (theme: ThemeType) => ({
  safeArea: {
    backgroundColor: theme['background-basic-color-1'],
  },
}));
