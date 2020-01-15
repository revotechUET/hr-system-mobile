import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Colors from '../../constants/Colors';
import TabBarLabel from '../../navigation/TabBarLabel';
import ListRequestScreen from './ListRequestScreen';
import ReviewRequestScreen from './ReviewRequestScreen';
import SendRequestScreen from './SendRequestScreen';

export default createMaterialTopTabNavigator(
  {
    SendRequest: {
      screen: SendRequestScreen,
      navigationOptions: {
        tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label='Yêu cầu nghỉ' />,
      }
    },
    ListRequest: {
      screen: ListRequestScreen,
      navigationOptions: {
        tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label='Danh sách yêu cầu nghỉ' />,
      }
    },
    ReviewRequest: {
      screen: ReviewRequestScreen,
      navigationOptions: {
        tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label='Phê duyệt yêu cầu nghỉ' />,
      }
    }
  },
  {
    lazy: true,
    swipeEnabled: false,
    tabBarOptions: {
      style: {
        backgroundColor: Colors.primaryBackground,
      },
      indicatorStyle: { backgroundColor: Colors.primaryColor, opacity: 1 },
    }
  }
)


