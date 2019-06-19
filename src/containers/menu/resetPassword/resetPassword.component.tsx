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
  ResetPasswordForm,
  ResetPasswordFormData,
} from '@src/components/auth';
import {
  Loading,
  LoadingComponentProps,
  ScrollableAvoidKeyboard,
  textStyle,
} from '@src/components/common';

interface ComponentProps {
  loading: boolean;
  onResetPasswordPress: (formData: ResetPasswordFormData) => void;
}

export type ResetPasswordProps = ThemedComponentProps & ComponentProps;

interface State {
  formData: ResetPasswordFormData | undefined;
}

class ResetPasswordComponent extends React.Component<ResetPasswordProps> {

  public state: State = {
    formData: undefined,
  };

  private onResetPasswordButtonPress = () => {
    this.props.onResetPasswordPress(this.state.formData);
  };

  private onFormDataChange = (formData: ResetPasswordFormData) => {
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
        <ResetPasswordForm
          style={themedStyle.formContainer}
          onDataChange={this.onFormDataChange}
        />
        <Button
          style={themedStyle.resetButton}
          textStyle={textStyle.button}
          size='giant'
          disabled={!this.state.formData}
          onPress={this.onResetPasswordButtonPress}>
          RESET PASSWORD
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
            Reset Password
          </Text>
          <Text
            style={themedStyle.resetLabel}
            category='s1'>
            Enter data to reset your password
          </Text>
        </View>
        {this.renderLoading()}
        {this.renderContent()}
      </ScrollableAvoidKeyboard>
    );
  }
}

export const ResetPassword = withStyles(ResetPasswordComponent, (theme: ThemeType) => {
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
    resetLabel: {
      marginTop: 16,
      color: 'white',
      ...textStyle.subtitle,
    },
    resetButton: {
      marginHorizontal: 16,
      marginBottom: 24,
    },
  });
});

