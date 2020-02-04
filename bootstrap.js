import { library } from '@fortawesome/fontawesome-svg-core';
import { faBell, faCalendarAlt, faHandPointer, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft, faFlag, faListUl, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { YellowBox } from 'react-native';

library.add(
  faArrowLeft,
  faBell,
  faCalendarAlt,
  faFlag,
  faHandPointer,
  faListUl,
  faSignOutAlt,
  faUser,
  faUserCircle,
);

YellowBox.ignoreWarnings([
  'Setting a timer',
]);
