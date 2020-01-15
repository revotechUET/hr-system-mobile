import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Colors from '../constants/Colors';
import CheckInScreen from '../screens/CheckInScreen';
import DeviceInfoScreen from '../screens/DeviceInfoScreen';
import HistoryScreen from '../screens/HistoryScreen';
import LoadingScreen from '../screens/LoadingScreen';
import NotificationScreen from '../screens/notification/NotificationScreen';
import RequestScreen from '../screens/request/RequestScreen';
import UserScreen from '../screens/UserScreen';
import { IconWithBadge, TabBarIcon, UserIcon } from './TabBarIcon';
import TabBarLabel from './TabBarLabel';
import { View, Image } from 'react-native';
import ApiService from '../services/ApiService';

class Username extends React.Component {
  state = {
    username: null,
  }

  async componentDidMount() {
    const user = await ApiService.getUser();
    this.setState({ username: user.name });
  }

  render() {
    const { username } = this.state;
    const { focused } = this.props;
    return <TabBarLabel focused={focused} label={username} />
  }
}

const tabNavigator = createMaterialTopTabNavigator(
  {
    CheckIn: {
      screen: CheckInScreen,
      navigationOptions: {
        tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label='Chấm công' />,
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={['far', 'hand-pointer']}
          />
        ),
      },
      path: ''
    },
    History: {
      screen: HistoryScreen,
      navigationOptions: {
        tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label='Ngày công' />,
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={'list-ul'}
          />
        ),
      },
      path: 'history'
    },
    Request: {
      screen: RequestScreen,
      navigationOptions: {
        tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label='Yêu cầu nghỉ' />,
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            type='ant'
            focused={focused}
            name={'file-done'}
          />
        ),
      },
      path: 'request'
    },
    Notification: {
      screen: NotificationScreen,
      navigationOptions: {
        tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label='Thông báo' />,
        tabBarIcon: ({ focused }) => (
          <IconWithBadge
            focused={focused}
            name={['far', 'bell']}
            badgeCount={3}
          />
        ),
      },
      path: 'notification'
    },
    User: {
      screen: UserScreen,
      navigationOptions: {
        tabBarLabel: ({ focused }) => <Username focused={focused} />,
        tabBarIcon: ({ focused }) => {
          return <UserIcon focused={focused} />
        },
      },
      path: 'user'
    },
    DeviceInfo: {
      screen: DeviceInfoScreen,
      navigationOptions: {
        tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label='Device ìno' />,
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            type={'ion'}
            focused={focused}
            name='md-information-circle'
          />
        ),
      },
      path: 'device-info'
    },
  },
  {
    order: [
      'CheckIn',
      'History',
      'Request',
      'Notification',
      'User',
      // 'DeviceInfo',
    ],
    lazy: true,
    lazyPlaceholderComponent: LoadingScreen,
    tabBarOptions: {
      showIcon: true,
      indicatorStyle: { backgroundColor: 'none' },
      style: { backgroundColor: Colors.primaryBackground }
    }
  }
);

export default tabNavigator;
