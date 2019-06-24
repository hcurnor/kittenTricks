import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';

export type LoadingComponentProps = ThemedComponentProps & ViewProps;

class LoadingComponent extends React.Component<LoadingComponentProps> {

  public render(): React.ReactNode {
    const { style, themedStyle, ...restProps } = this.props;

    return (
      <View style={[themedStyle.container, style]} {...restProps}>
        <ActivityIndicator
          size='large'
          color={themedStyle.indicator.color}
        />
      </View>
    );
  }
}

export const Loading = withStyles(LoadingComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme['background-basic-color-4'],
    opacity: 0.7,
    zIndex: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    color: theme['color-primary-500'],
  },
}));
