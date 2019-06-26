import {
  NavigationActions,
  NavigationNavigateAction,
  NavigationResetAction, StackActions,
} from 'react-navigation';

export const navigateAction = (route: string): NavigationNavigateAction => {
  return NavigationActions.navigate({
    key: '@kitten-tricks/root',
    routeName: route,
  });
};

export const resetAndNavigateAction = (route: string): NavigationResetAction => {
  return StackActions.reset({
    index: 0,
    actions: [navigateAction(route)],
  });
};
