import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { AuthStorageService } from '../../../core/authStorage/authStorage.service';

type ComponentProps = NavigationScreenProps;

export class AuthLoadingContainer extends React.Component<ComponentProps> {

  constructor(props: ComponentProps) {
    super(props);
    this.bootstrap();
  }

  private checkToken = (token: string): boolean => {
    return token && token.length !== 0;
  };

  private bootstrap = (): void => {
    AuthStorageService.getToken()
      .then(this.navigate)
      .catch(this.navigateToAuth);
  };

  private navigate = (token: string): void => {
    if (this.checkToken(token)) {
      this.navigateToApp();
    } else {
      this.navigateToAuth();
    }
  };

  private navigateToApp = (): void => {
    this.props.navigation.navigate('Home');
  };

  private navigateToAuth = (): void => {
    this.props.navigation.navigate('App Auth');
  };

  public render(): React.ReactNode {
    return null;
  }
}
