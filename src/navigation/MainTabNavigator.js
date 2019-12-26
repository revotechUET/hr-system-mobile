import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from '../screens/HomeScreen';
import TabBarIcon from './TabBarIcon';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.path = '';

const createTabFn = Platform.OS === 'ios' ? createBottomTabNavigator : createMaterialTopTabNavigator;
const tabNavigator = createTabFn(
  {
    1: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'Chấm công',
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={
              Platform.OS === 'ios'
                ? `ios-information-circle${focused ? '' : '-outline'}`
                : 'md-information-circle'
            }
          />
        ),
      },
      path: ''
    },
    2: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'Ngày công',
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={
              Platform.OS === 'ios'
                ? `ios-information-circle${focused ? '' : '-outline'}`
                : 'md-information-circle'
            }
          />
        ),
      },
      path: ''
    },
    3: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'Yêu cầu nghỉ',
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={
              Platform.OS === 'ios'
                ? `ios-information-circle${focused ? '' : '-outline'}`
                : 'md-information-circle'
            }
          />
        ),
      },
      path: ''
    },
    4: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'Thông báo',
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={
              Platform.OS === 'ios'
                ? `ios-information-circle${focused ? '' : '-outline'}`
                : 'md-information-circle'
            }
          />
        ),
      },
      path: ''
    },
    5: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'User name',
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={
              Platform.OS === 'ios'
                ? `ios-information-circle${focused ? '' : '-outline'}`
                : 'md-information-circle'
            }
          />
        ),
      },
      path: ''
    },
  },
  {
    tabBarOptions: {
      showIcon: true,
      labelStyle: {
        fontSize: 12
      }
    }
  }
);

tabNavigator.path = '';

export default tabNavigator;
