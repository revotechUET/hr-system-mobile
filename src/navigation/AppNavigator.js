import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AuthScreen from '../screens/auth/AuthScreen';
import NotificationDetailScreen from '../screens/notification/NotificationDetailScreen';
import RequestDetailScreen from '../screens/request/RequestDetailScreen';
import MainTabNavigator from './MainTabNavigator';
import ApiService from '../services/ApiService';

const AppStack = createStackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
      path: '',
      navigationOptions: {
        headerShown: false,
      }
    },
    NotificationDetail: {
      screen: NotificationDetailScreen,
      path: 'notification/detail/:id',
      navigationOptions: ({ navigation }) => {
        const { title } = navigation.state.params || {};
        return {
          title,
        }
      }
    },
    RequestDetail: {
      screen: RequestDetailScreen,
      path: 'request/detail/:id',
      navigationOptions: ({ navigation }) => {
        const { title } = navigation.state.params || {};
        return {
          title,
        }
      }
    }
  },
  {
    defaultNavigationOptions: {
      safeAreaInsets: Platform.OS === 'ios' ? null : { top: 0 },
    }
  }
);

const AuthStack = createStackNavigator({
  Auth: AuthScreen
}, {
  headerMode: 'none',
})

export default createAppContainer(
  createSwitchNavigator({
    App: {
      screen: AppStack,
      path: ''
    },
    Auth: AuthStack
  }, {
    initialRouteName: 'Auth',
  })
);
