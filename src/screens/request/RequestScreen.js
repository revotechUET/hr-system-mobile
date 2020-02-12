import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { Dimensions } from 'react-native';
import Colors from '../../constants/Colors';
import { AuthContext } from '../../Contexts';
import TabBarLabel from '../../navigation/TabBarLabel';
import LoadingScreen from '../LoadingScreen';
import ListRequestScreen from './ListRequestScreen';
import ListReviewRequestScreen from './ReviewRequestScreen';
import SendRequestScreen from './SendRequestScreen';

const Tab = createMaterialTopTabNavigator();
export default class RequestNavigator extends React.Component {
  static contextType = AuthContext;
  render() {
    const user = this.context.user || {};
    const role = user.role;
    return (
      <Tab.Navigator lazy lazyPlaceholder={LoadingScreen}
        swipeVelocityImpact={10}
        initialLayout={{ width: Dimensions.get('window').width }}
        tabBarOptions={{
          showIcon: true,
          indicatorStyle: { backgroundColor: Colors.primaryColor },
          // style: { backgroundColor: Colors.primaryBackground },
        }}>
        <Tab.Screen name='SendRequest' component={SendRequestScreen}
          options={{
            tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label='Yêu cầu nghỉ' />
          }}
        />
        <Tab.Screen name='ListRequest' component={ListRequestScreen}
          options={{
            tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label='Danh sách yêu cầu nghỉ' />
          }}
        />
        {role === 'admin' && <Tab.Screen name='ReviewRequest' component={ListReviewRequestScreen}
          options={{
            tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label='Phê duyệt yêu cầu nghỉ' />
          }}
        />}
      </Tab.Navigator>
    )
  }
}
