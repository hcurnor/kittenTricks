import React from 'react';
import { View } from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import {
  Button,
  Text,
} from '@kitten/ui';
import {
  RestorePasswordFormData,
  RestorePasswordForm,
} from '@src/components/auth';
import {
  Loading,
  LoadingComponentProps,
  ScrollableAvoidKeyboard,
  textStyle,
} from '@src/components/common';

interface ComponentProps {
  loading: boolean;
  onRestorePasswordPress: (formData: RestorePasswordFormData) => void;
}

export type RestorePasswordProps = ThemedComponentProps & ComponentProps;

interface State {
  formData: RestorePasswordFormData | undefined;
}

class RestorePasswordComponent extends React.Component<RestorePasswordProps> {

  public state: State = {
    formData: undefined,
  };

  private onForgotPasswordButtonPress = () => {
    this.props.onRestorePasswordPress(this.state.formData);
  };

  private onFormDataChange = (formData: RestorePasswordFormData) => {
    this.setState({ formData });
  };

  private getPointerEvents = (): 'none' | 'auto' => {
    const { loading } = this.props;

    return loading ? 'none' : 'auto';
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
        <RestorePasswordForm
          style={themedStyle.formContainer}
          onDataChange={this.onFormDataChange}
        />
        <Button
          style={themedStyle.restoreButton}
          textStyle={textStyle.button}
          size='giant'
          disabled={!this.state.formData}
          onPress={this.onForgotPasswordButtonPress}>
          RESTORE PASSWORD
        </Button>
      </React.Fragment>
    );
  };

  public render(): React.ReactNode {
    const { themedStyle } = this.props;
    const containerPointerEvents: 'none' | 'auto' = this.getPointerEvents();

    return (
      <ScrollableAvoidKeyboard
        pointerEvents={containerPointerEvents}
        style={themedStyle.container}>
        {this.renderLoading()}
        <View style={themedStyle.headerContainer}>
          <Text
            style={themedStyle.helloLabel}
            category='h1'>
            Restore Password
          </Text>
          <Text
            style={themedStyle.restoreLabel}
            category='s1'>
            Enter data to restore your password
          </Text>
        </View>
        {this.renderLoading()}
        {this.renderContent()}
      </ScrollableAvoidKeyboard>
    );
  }
}

export const RestorePassword = withStyles(RestorePasswordComponent, (theme: ThemeType) => {
  return ({
    container: {
      flex: 1,
      backgroundColor: theme['background-color-default-1'],
    },
    headerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 216,
      backgroundColor: theme['color-primary-default'],
    },
    formContainer: {
      flex: 1,
      marginTop: 32,
      paddingHorizontal: 16,
    },
    helloLabel: {
      color: 'white',
      ...textStyle.headline,
    },
    restoreLabel: {
      marginTop: 16,
      color: 'white',
      ...textStyle.subtitle,
    },
    restoreButton: {
      marginHorizontal: 16,
      marginBottom: 24,
    },
  });
});

