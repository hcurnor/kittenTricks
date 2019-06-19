import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import {
  ThemeType,
  withStyles,
  ThemedComponentProps,
} from '@kitten/theme';
import { Text } from '@kitten/ui';
import {
  Loading,
  LoadingComponentProps,
  textStyle,
} from '@src/components/common';

interface ComponentProps {
  loading: boolean;
  onEditProfilePress: () => void;
  onChangePasswordPress: () => void;
  onLogoutPress: () => void;
}

export type SettingsProps = ThemedComponentProps & ComponentProps;

class AppSettingsComponent extends React.Component<SettingsProps> {

  private onEditProfilePress = () => {
    this.props.onEditProfilePress();
  };

  private onChangePasswordPress = () => {
    this.props.onChangePasswordPress();
  };

  private onLogoutPress = () => {
    this.props.onLogoutPress();
  };

  private renderLoading = (): React.ReactElement<LoadingComponentProps> | null => {
    const { loading } = this.props;

    return loading ? (
      <Loading/>
    ) : null;
  };

  private renderContent = (): React.ReactNode => {
    const { themedStyle } = this.props;

    return (
      <React.Fragment>
        <Section
          style={themedStyle.section}
          onPress={this.onEditProfilePress}>
          <Text
            style={themedStyle.sectionText}
            category='s2'>
            Edit Profile
          </Text>
        </Section>
        <Section
          style={themedStyle.section}
          onPress={this.onChangePasswordPress}>
          <Text
            style={themedStyle.sectionText}
            category='s2'>
            Change Password
          </Text>
        </Section>
        <Section
          style={[themedStyle.section, themedStyle.soundEnabledSection]}
          onPress={this.onLogoutPress}>
          <Text
            style={themedStyle.sectionText}
            category='s2'>
            Logout
          </Text>
        </Section>
      </React.Fragment>
    );
  };

  public render(): React.ReactNode {
    const { themedStyle } = this.props;

    return (
      <View style={themedStyle.container}>
        {this.renderLoading()}
        {this.renderContent()}
      </View>
    );
  }
}

interface SectionProps extends TouchableOpacityProps {
  children?: React.ReactNode;
}

const Section = (props?: SectionProps): React.ReactElement<TouchableOpacityProps> => {
  return (
    <TouchableOpacity
      activeOpacity={0.65}
      {...props}
    />
  );
};

export const AppSettings = withStyles(AppSettingsComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-basic-color-1'],
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme['border-basic-color-2'],
  },
  notificationSection: {
    paddingTop: 40,
  },
  soundEnabledSection: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 40,
  },
  sectionText: textStyle.subtitle,
}));
