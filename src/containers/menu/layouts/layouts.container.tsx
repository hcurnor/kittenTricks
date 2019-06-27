import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { Layouts } from './layouts.component';
import { LayoutsContainerData } from './type';
import { routes } from './routes';
import { User } from '@src/core/model';
import { Alert } from 'react-native';
import { UserService } from '../../../service';
import { GlobalState } from '../../../store';
import { getUserProfile } from '../../../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state: GlobalState) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch: Function) => ({
  setUserProfile: (user?: User) => dispatch(getUserProfile(user)),
});

interface StateProps {
  user: User;
  setUserProfile: (user?: User) => void;
}

type ComponentProps = NavigationScreenProps & StateProps;

@connect(mapStateToProps, mapDispatchToProps)
export class LayoutsContainer extends React.Component<ComponentProps> {

  public componentWillMount(): void {
    this.setCurrentUser();
  }

  private data: LayoutsContainerData[] = routes;
  private navigationKey: string = 'LayoutsContainer';
  private failureMessage: string = 'Something went wrong while getting Profile Info';
  private userService: UserService = new UserService();

  private setCurrentUser = (): void => {
    if (!this.props.user) {
      this.userService.getCurrentUser()
        .then(this.onGetCurrentUserSuccess)
        .catch(this.onGetCurrentUserError);
    }
  };

  private onGetCurrentUserSuccess = (user: User): void => {
    this.props.setUserProfile(user);
  };

  private onGetCurrentUserError = (): void => {
    Alert.alert(this.failureMessage);
  };

  private onItemSelect = (index: number) => {
    const { [index]: selectedItem } = this.data;

    this.props.navigation.navigate({
      key: this.navigationKey,
      routeName: selectedItem.route,
    });
  };

  public render(): React.ReactNode {
    return (
      <Layouts
        data={this.data}
        onItemSelect={this.onItemSelect}
      />
    );
  }
}
