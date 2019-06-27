import React from 'react';
import {
  ButtonProps,
  View,
} from 'react-native';
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
  ProfileSetting,
  ProfilePhoto,
} from '@src/components/social';
import { CameraIconFill } from '@src/assets/icons';
import { User } from '@src/core/model';
import {
  ContainerView,
  textStyle,
} from '@src/components/common';
import { profile1 } from '@src/core/data/profile';

interface ComponentProps {
  profile: User;
  onUploadPhotoButtonPress: () => void;
  onButtonPress: () => void;
}

export type ProfileSettingsProps = ThemedComponentProps & ComponentProps;

class ProfileSettingsComponent extends React.Component<ProfileSettingsProps> {

  private onButtonPress = () => {
    this.props.onButtonPress();
  };

  private onPhotoButtonPress = () => {
    this.props.onUploadPhotoButtonPress();
  };

  private renderPhotoButton = (): React.ReactElement<ButtonProps> => {
    const { themedStyle } = this.props;

    return (
      <Button
        style={themedStyle.photoButton}
        size='small'
        activeOpacity={0.95}
        icon={CameraIconFill}
        onPress={this.onPhotoButtonPress}
      />
    );
  };

  private renderContent = (): React.ReactNode => {
    const { themedStyle, profile } = this.props;
    const city: string = profile.address ? profile.address.city : '';
    const street: string = profile.address ? profile.address.street : '';

    return (
      <React.Fragment>
        <View style={themedStyle.photoSection}>
          <ProfilePhoto
            style={themedStyle.photo}
            source={profile1.photo.imageSource}
            button={this.renderPhotoButton}
          />
          <View style={themedStyle.nameSection}>
            <ProfileSetting
              style={[themedStyle.profileSetting, themedStyle.nameParameter]}
              value={profile.firstName}
            />
            <ProfileSetting
              style={[themedStyle.profileSetting, themedStyle.nameParameter, themedStyle.lastNameParameter]}
              value={profile.lastName}
            />
          </View>
        </View>
        <View style={themedStyle.descriptionSection}>
          <Text
            style={themedStyle.description}
            appearance='hint'
            category='s1'>
            {profile1.about}
          </Text>
        </View>
        <View style={themedStyle.infoSection}>
          <ProfileSetting
            style={themedStyle.profileSetting}
            hint='Email'
            value={profile.email}
          />
          <ProfileSetting
            style={themedStyle.profileSetting}
            hint='Age'
            value={`${profile.age}`}
          />
          <ProfileSetting
            style={themedStyle.profileSetting}
            hint='City'
            value={city}
          />
          <ProfileSetting
            style={themedStyle.profileSetting}
            hint='Street'
            value={street}
          />
        </View>
        <Button
          style={themedStyle.button}
          textStyle={textStyle.button}
          size='large'
          onPress={this.onButtonPress}>
          DONE
        </Button>
      </React.Fragment>
    );
  };

  public render(): React.ReactNode {
    const { themedStyle } = this.props;

    return (
      <ContainerView style={themedStyle.container}>
        {this.renderContent()}
      </ContainerView>
    );
  }
}

export const ProfileSettings = withStyles(ProfileSettingsComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-basic-color-2'],
  },
  photoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    backgroundColor: theme['background-basic-color-1'],
  },
  nameSection: {
    flex: 1,
    marginLeft: 32,
  },
  descriptionSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: theme['background-basic-color-1'],
  },
  infoSection: {
    marginTop: 24,
    backgroundColor: theme['background-basic-color-1'],
  },
  profileSetting: {
    borderBottomWidth: 1,
    borderBottomColor: theme['border-basic-color-2'],
  },
  nameParameter: {
    paddingHorizontal: 0,
    paddingVertical: 8,
  },
  lastNameParameter: {
    marginVertical: 16,
  },
  description: {
    marginTop: 24,
    ...textStyle.paragraph,
  },
  photo: {
    width: 76,
    height: 76,
  },
  photoButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    transform: [{ translateY: 48 }],
    borderColor: theme['border-basic-color-4'],
    backgroundColor: theme['background-basic-color-4'],
  },
  button: {
    marginHorizontal: 24,
    marginVertical: 24,
  },
}));
