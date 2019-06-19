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
import { SignInForm2 } from '@src/components/auth';
import { SignInFormData } from '../type';
import {
  Loading,
  LoadingComponentProps,
  ScrollableAvoidKeyboard,
  textStyle,
} from '@src/components/common';

interface ComponentProps {
  loading: boolean;
  onSignInPress: (formData: SignInFormData) => void;
  onSignUpPress: () => void;
  onForgotPasswordPress: () => void;
}

export type SignInProps = ThemedComponentProps & ComponentProps;

interface State {
  formData: SignInFormData | undefined;
}

class SignInComponent extends React.Component<SignInProps> {

  public state: State = {
    formData: undefined,
  };

  private onSignInButtonPress = () => {
    this.props.onSignInPress(this.state.formData);
  };

  private onSignUpButtonPress = () => {
    this.props.onSignUpPress();
  };

  private onForgotPasswordButtonPress = () => {
    this.props.onForgotPasswordPress();
  };

  private onFormDataChange = (formData: SignInFormData) => {
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
        <SignInForm2
          style={themedStyle.formContainer}
          onForgotPasswordPress={this.onForgotPasswordButtonPress}
          onDataChange={this.onFormDataChange}
        />
        <Button
          style={themedStyle.signInButton}
          textStyle={textStyle.button}
          size='giant'
          disabled={!this.state.formData}
          onPress={this.onSignInButtonPress}>
          SIGN IN
        </Button>
        <Button
          style={themedStyle.signUpButton}
          textStyle={themedStyle.signUpText}
          appearance='ghost'
          activeOpacity={0.75}
          onPress={this.onSignUpButtonPress}>
          Don't have an account? Create
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
            Hello
          </Text>
          <Text
            style={themedStyle.signInLabel}
            category='s1'>
            Sign in to your account
          </Text>
        </View>
        {this.renderLoading()}
        {this.renderContent()}
      </ScrollableAvoidKeyboard>
    );
  }
}

export const SignIn = withStyles(SignInComponent, (theme: ThemeType) => {
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
    signInLabel: {
      marginTop: 16,
      color: 'white',
      ...textStyle.subtitle,
    },
    signInButton: {
      marginHorizontal: 16,
    },
    signUpButton: {
      marginVertical: 12,
    },
    signUpText: {
      color: theme['text-color-hint'],
      ...textStyle.subtitle,
    },
  });
});

