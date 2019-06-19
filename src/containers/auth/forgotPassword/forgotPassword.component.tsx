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
import { ForgotPasswordForm } from '@src/components/auth';
import { ForgotPasswordFormData } from '../type';
import {
  Loading,
  LoadingComponentProps,
  ScrollableAvoidKeyboard,
  textStyle,
} from '@src/components/common';

interface ComponentProps {
  loading: boolean;
  onResetPress: (formData: ForgotPasswordFormData) => void;
}

export type ForgotPasswordProps = ThemedComponentProps & ComponentProps;

interface State {
  formData: ForgotPasswordFormData | undefined;
}

class ForgotPasswordComponent extends React.Component<ForgotPasswordProps, State> {

  public state: State = {
    formData: undefined,
  };

  private onFormDataChange = (formData: ForgotPasswordFormData) => {
    this.setState({ formData });
  };

  private onResetPasswordButtonPress = () => {
    this.props.onResetPress(this.state.formData);
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
      <View style={themedStyle.contentContainer}>
        <ForgotPasswordForm
          style={themedStyle.formContainer}
          onDataChange={this.onFormDataChange}
        />
        <Button
          textStyle={textStyle.button}
          size='giant'
          disabled={!this.state.formData}
          onPress={this.onResetPasswordButtonPress}>
          RESET PASSWORD
        </Button>
      </View>
    );
  };

  public render(): React.ReactNode {
    const { themedStyle } = this.props;
    const containerPointerEvents: 'none' | 'auto' = this.getPointerEvents();

    return (
      <ScrollableAvoidKeyboard
        pointerEvents={containerPointerEvents}
        style={themedStyle.container}>
        <View style={themedStyle.headerContainer}>
          <Text
            style={themedStyle.helloLabel}
            category='h1'>
            Forgot Password
          </Text>
          <Text
            style={themedStyle.helloSubLabel}
            category='s1'>
            Enter your email to reset password
          </Text>
        </View>
        {this.renderLoading()}
        {this.renderContent()}
      </ScrollableAvoidKeyboard>
    );
  }
}

export const ForgotPassword = withStyles(ForgotPasswordComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-color-default-1'],
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 24,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
    backgroundColor: theme['color-primary-default'],
  },
  helloLabel: {
    color: 'white',
    ...textStyle.headline,
  },
  helloSubLabel: {
    marginTop: 16,
    color: 'white',
    ...textStyle.subtitle,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
}));
