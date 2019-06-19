import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import {
  textStyle,
  ValidationInput,
} from '@src/components/common';
import { EyeOffIconFill } from '@src/assets/icons';
import { PasswordValidator } from '@src/core/validators';
import { ResetPasswordFormData } from './type';

interface ComponentProps {
  /**
   * Will emit changes depending on validation:
   * Will be called with form value if it is valid, otherwise will be called with undefined
   */
  onDataChange: (value: ResetPasswordFormData | undefined) => void;
}

export type ResetPasswordFormProps = ThemedComponentProps & ViewProps & ComponentProps;

interface State {
  newPassword: string | undefined;
  confirmNewPassword: string | undefined;
}

class ResetPasswordFormComponent extends React.Component<ResetPasswordFormProps, State> {

  public state: State = {
    newPassword: undefined,
    confirmNewPassword: undefined,
  };

  public componentDidUpdate(prevProps: ResetPasswordFormProps, prevState: State) {
    const oldFormValid: boolean = this.isValid(prevState);
    const newFormValid: boolean = this.isValid(this.state);

    const isStateChanged: boolean = this.state !== prevState;
    const becomeValid: boolean = !oldFormValid && newFormValid;
    const becomeInvalid: boolean = oldFormValid && !newFormValid;
    const remainValid: boolean = oldFormValid && newFormValid;

    if (becomeValid) {
      this.props.onDataChange(this.state);
    } else if (becomeInvalid) {
      this.props.onDataChange(undefined);
    } else if (isStateChanged && remainValid) {
      this.props.onDataChange(this.state);
    }
  }

  private onPasswordInputTextChange = (newPassword: string): void => {
    this.setState({ newPassword });
  };

  private onConfirmPasswordInputTextChange = (confirmNewPassword: string): void => {
    this.setState({ confirmNewPassword });
  };

  private isValid = (value: ResetPasswordFormData): boolean => {
    const { newPassword, confirmNewPassword } = value;

    return newPassword !== undefined && confirmNewPassword !== undefined;
  };

  public render(): React.ReactNode {
    const { style, themedStyle, ...restProps } = this.props;

    return (
      <View
        style={[themedStyle.container, style]}
        {...restProps}>
        <ValidationInput
          textStyle={textStyle.paragraph}
          placeholder='Password'
          icon={EyeOffIconFill}
          validator={PasswordValidator}
          secureTextEntry={true}
          onChangeText={this.onPasswordInputTextChange}
        />
        <ValidationInput
          textStyle={textStyle.paragraph}
          placeholder='Confirm Password'
          icon={EyeOffIconFill}
          validator={PasswordValidator}
          secureTextEntry={true}
          onChangeText={this.onConfirmPasswordInputTextChange}
        />
      </View>
    );
  }
}

export const ResetPasswordForm = withStyles(ResetPasswordFormComponent, (theme: ThemeType) => ({
  container: {},
}));

