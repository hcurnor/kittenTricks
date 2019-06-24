import {
  ImageStyle,
  StyleProp,
} from 'react-native';
import {
  ComponentsIconAvatar,
  ComponentsIconAvatarDark,
  ComponentsIconBottomNavigation,
  ComponentsIconBottomNavigationDark,
  ComponentsIconButton,
  ComponentsIconButtonDark,
  ComponentsIconButtonGroup,
  ComponentsIconButtonGroupDark,
  ComponentsIconCheckBox,
  ComponentsIconCheckBoxDark,
  ComponentsIconInput,
  ComponentsIconInputDark,
  ComponentsIconList,
  ComponentsIconListDark,
  ComponentsIconOverflowMenu,
  ComponentsIconOverflowMenuDark,
  ComponentsIconPopover,
  ComponentsIconPopoverDark,
  ComponentsIconRadio,
  ComponentsIconRadioDark,
  ComponentsIconTabView,
  ComponentsIconTabViewDark,
  ComponentsIconText,
  ComponentsIconTextDark,
  ComponentsIconToggle,
  ComponentsIconToggleDark,
  ComponentsIconTooltip,
  ComponentsIconTooltipDark,
  ComponentsIconTopNavigation,
  ComponentsIconTopNavigationDark,
} from '@src/assets/icons';
import { ThemeService } from '@src/core/themes';
import { ComponentsContainerData } from './type';

export const routes: ComponentsContainerData[] = [
  {
    title: 'Button',
    icon: (style: StyleProp<ImageStyle>) => {
      return ThemeService.select({
        'Eva Light': ComponentsIconButton(style),
        'Eva Dark': ComponentsIconButtonDark(style),
      });
    },
    route: 'Button',
  },
  {
    title: 'Button Group',
    icon: (style: StyleProp<ImageStyle>) => {
      return ThemeService.select({
        'Eva Light': ComponentsIconButtonGroup(style),
        'Eva Dark': ComponentsIconButtonGroupDark(style),
      });
    },
    route: 'Button Group',
  },
  {
    title: 'Checkbox',
    icon: (style: StyleProp<ImageStyle>) => {
      return ThemeService.select({
        'Eva Light': ComponentsIconCheckBox(style),
        'Eva Dark': ComponentsIconCheckBoxDark(style),
      });
    },
    route: 'CheckBox',
  },
  {
    title: 'Toggle',
    icon: (style: StyleProp<ImageStyle>) => {
      return ThemeService.select({
        'Eva Light': ComponentsIconToggle(style),
        'Eva Dark': ComponentsIconToggleDark(style),
      });
    },
    route: 'Toggle',
  },
  {
    title: 'Radio',
    icon: (style: StyleProp<ImageStyle>) => {
      return ThemeService.select({
        'Eva Light': ComponentsIconRadio(style),
        'Eva Dark': ComponentsIconRadioDark(style),
      });
    },
    route: 'Radio',
  },
  {
    title: 'Input',
    icon: (style: StyleProp<ImageStyle>) => {
      return ThemeService.select({
        'Eva Light': ComponentsIconInput(style),
        'Eva Dark': ComponentsIconInputDark(style),
      });
    },
    route: 'Input',
  },
  {
    title: 'Text',
    icon: (style: StyleProp<ImageStyle>) => {
      return ThemeService.select({
        'Eva Light': ComponentsIconText(style),
        'Eva Dark': ComponentsIconTextDark(style),
      });
    },
    route: 'Text',
  },
  {
    title: 'Avatar',
    icon: (style: StyleProp<ImageStyle>) => {
      return ThemeService.select({
        'Eva Light': ComponentsIconAvatar(style),
        'Eva Dark': ComponentsIconAvatarDark(style),
      });
    },
    route: 'Avatar',
  },
  {
    title: 'Popover',
    icon: (style: StyleProp<ImageStyle>) => {
      return ThemeService.select({
        'Eva Light': ComponentsIconPopover(style),
        'Eva Dark': ComponentsIconPopoverDark(style),
      });
    },
    route: 'Popover',
  },
  {
    title: 'Tooltip',
    icon: (style: StyleProp<ImageStyle>) => {
      return ThemeService.select({
        'Eva Light': ComponentsIconTooltip(style),
        'Eva Dark': ComponentsIconTooltipDark(style),
      });
    },
    route: 'Tooltip',
  },
  {
    title: 'Overflow Menu',
    icon: (style: StyleProp<ImageStyle>) => {
      return ThemeService.select({
        'Eva Light': ComponentsIconOverflowMenu(style),
        'Eva Dark': ComponentsIconOverflowMenuDark(style),
      });
    },
    route: 'Overflow Menu',
  },
  {
    title: 'Tab View',
    icon: (style: StyleProp<ImageStyle>) => {
      return ThemeService.select({
        'Eva Light': ComponentsIconTabView(style),
        'Eva Dark': ComponentsIconTabViewDark(style),
      });
    },
    route: 'Tab View',
  },
  {
    title: 'List',
    icon: (style: StyleProp<ImageStyle>) => {
      return ThemeService.select({
        'Eva Light': ComponentsIconList(style),
        'Eva Dark': ComponentsIconListDark(style),
      });
    },
    route: 'List',
  },
  {
    title: 'Top Navigation',
    icon: (style: StyleProp<ImageStyle>) => {
      return ThemeService.select({
        'Eva Light': ComponentsIconTopNavigation(style),
        'Eva Dark': ComponentsIconTopNavigationDark(style),
      });
    },
    route: 'Top Navigation',
  },
  {
    title: 'Bottom Navigation',
    icon: (style: StyleProp<ImageStyle>) => {
      return ThemeService.select({
        'Eva Light': ComponentsIconBottomNavigation(style),
        'Eva Dark': ComponentsIconBottomNavigationDark(style),
      });
    },
    route: 'Bottom Navigation',
  },
];
