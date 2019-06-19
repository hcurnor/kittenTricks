import React from 'react';
import {
  ButtonProps,
  ImageProps,
  View,
} from 'react-native';
import {
  StyleType,
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import { Button } from '@kitten/ui';
import { SignUpForm2 } from '@src/components/auth';
import { SignUpFormData } from '../type';
import { ProfilePhoto } from '@src/components/social';
import {
  ScrollableAvoidKeyboard,
  textStyle,
  Loading,
  LoadingComponentProps,
} from '@src/components/common';
import { PlusIconFill } from '@src/assets/icons';

interface ComponentProps {
  loading: boolean;
  onSignUpPress: (formData: SignUpFormData) => void;
  onSignInPress: () => void;
  onPhotoPress: () => void;
}

export type SignUpProps = ThemedComponentProps & ComponentProps;

interface State {
  formData: SignUpFormData;
}

class SignUpComponent extends React.Component<SignUpProps, State> {

  public state: State = {
    formData: undefined,
  };

  private onFormDataChange = (formData: SignUpFormData) => {
    this.setState({ formData });
  };

  private onPhotoButtonPress = () => {
    this.props.onPhotoPress();
  };

  private onSignInButtonPress = () => {
    this.props.onSignInPress();
  };

  private onSignUpButtonPress = () => {
    this.props.onSignUpPress(this.state.formData);
  };

  private getPointerEvents = (): 'none' | 'auto' => {
    const { loading } = this.props;

    return loading ? 'none' : 'auto';
  };

  private renderPhotoButtonIcon = (style: StyleType): React.ReactElement<ImageProps> => {
    const { themedStyle } = this.props;

    return PlusIconFill({ ...style, ...themedStyle.photoButtonIcon });
  };

  private renderPhotoButton = (): React.ReactElement<ButtonProps> => {
    const { themedStyle } = this.props;

    return (
      <Button
        style={themedStyle.photoButton}
        activeOpacity={0.95}
        icon={this.renderPhotoButtonIcon}
        onPress={this.onPhotoButtonPress}
      />
    );
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
        <SignUpForm2
          style={themedStyle.formContainer}
          onDataChange={this.onFormDataChange}
        />
        <Button
          style={themedStyle.signUpButton}
          textStyle={textStyle.button}
          size='giant'
          disabled={!this.state.formData}
          onPress={this.onSignUpButtonPress}>
          SIGN UP
        </Button>
        <Button
          style={themedStyle.signInButton}
          textStyle={themedStyle.signInText}
          appearance='ghost'
          activeOpacity={0.75}
          onPress={this.onSignInButtonPress}>
          Already have an account? Sign In
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
        <View style={themedStyle.headerContainer}>
          <ProfilePhoto
            style={themedStyle.photo}
            resizeMode='center'
            source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/person.png' }}
            button={this.renderPhotoButton}
          />
        </View>
        {this.renderLoading()}
        {this.renderContent()}
      </ScrollableAvoidKeyboard>
    );
  }
}

export const SignUp = withStyles(SignUpComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
    backgroundColor: ['background-basic-color-1'],
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
  photo: {
    width: 116,
    height: 116,
    borderRadius: 58,
    alignSelf: 'center',
    backgroundColor: theme['background-basic-color-1'],
    tintColor: theme['color-primary-default'],
  },
  photoButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    transform: [{ translateY: 80 }],
    borderColor: theme['border-basic-color-2'],
    backgroundColor: theme['background-basic-color-2'],
  },
  photoButtonIcon: {
    width: 24,
    height: 24,
    tintColor: theme['color-primary-default'],
  },
  signUpButton: {
    marginHorizontal: 16,
  },
  signInButton: {
    marginVertical: 12,
  },
  signInText: {
    color: theme['text-hint-color'],
    ...textStyle.subtitle,
  },
}));

