import { library } from '@fortawesome/fontawesome-svg-core';
import { faBell, faCalendarAlt, faHandPointer, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft, faChevronDown, faChevronUp, faFlag, faListUl, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { YellowBox } from 'react-native';
import 'react-native-gesture-handler';

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
  faChevronDown,
  faChevronUp,
);

YellowBox.ignoreWarnings([
  'Setting a timer',
]);
