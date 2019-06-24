import {
  ImageStyle,
  StyleProp,
} from 'react-native';
import {
  MenuIconAuth,
  MenuIconArticles,
  MenuIconDashboards,
  MenuIconEcommerce,
  MenuIconMessaging,
  MenuIconSocial,
  MenuIconAuthDark,
  MenuIconSocialDark,
  MenuIconArticlesDark,
  MenuIconMessagingDark,
  MenuIconDashboardsDark,
  MenuIconEcommerceDark,
} from '@src/assets/icons';
import { ThemeService } from '@src/core/themes';
import { LayoutsContainerData } from './type';

export const routes: LayoutsContainerData[] = [
  {
    title: 'Auth',
    icon: (style: StyleProp<ImageStyle>) => {
      return ThemeService.select({
        'Eva Light': MenuIconAuth(style),
        'Eva Dark': MenuIconAuthDark(style),
      });
    },
    route: 'Auth',
  },
  {
    title: 'Social',
    icon: (style: StyleProp<ImageStyle>) => {
      return ThemeService.select({
        'Eva Light': MenuIconSocial(style),
        'Eva Dark': MenuIconSocialDark(style),
      });
    },
    route: 'Social',
  },
  {
    title: 'Articles',
    icon: (style: StyleProp<ImageStyle>) => {
      return ThemeService.select({
        'Eva Light': MenuIconArticles(style),
        'Eva Dark': MenuIconArticlesDark(style),
      });
    },
    route: 'Articles',
  },
  {
    title: 'Messaging',
    icon: (style: StyleProp<ImageStyle>) => {
      return ThemeService.select({
        'Eva Light': MenuIconMessaging(style),
        'Eva Dark': MenuIconMessagingDark(style),
      });
    },
    route: 'Messaging',
  },
  {
    title: 'Dashboards',
    icon: (style: StyleProp<ImageStyle>) => {
      return ThemeService.select({
        'Eva Light': MenuIconDashboards(style),
        'Eva Dark': MenuIconDashboardsDark(style),
      });
    },
    route: 'Dashboards',
  },
  {
    title: 'Ecommerce',
    icon: (style: StyleProp<ImageStyle>) => {
      return ThemeService.select({
        'Eva Light': MenuIconEcommerce(style),
        'Eva Dark': MenuIconEcommerceDark(style),
      });
    },
    route: 'Ecommerce',
  },
];
