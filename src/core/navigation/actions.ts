import {
  NavigationActions,
  NavigationNavigateAction,
  NavigationResetAction, StackActions,
} from 'react-navigation';
import { KEY_NAVIGATION_ROOT } from './constants';

export const navigateAction = (route: string): NavigationNavigateAction => {
  return NavigationActions.navigate({
    key: KEY_NAVIGATION_ROOT,
    routeName: route,
  });
};

export const resetAndNavigateAction = (route: string): NavigationResetAction => {
  return StackActions.reset({
    index: 0,
    actions: [navigateAction(route)],
  });
};
