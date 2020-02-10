import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import Colors from '../constants/Colors';
import { AuthContext } from '../Contexts';
import CheckInScreen from '../screens/CheckInScreen';
import DeviceInfoScreen from '../screens/DeviceInfoScreen';
import HistoryScreen from '../screens/HistoryScreen';
import LoadingScreen from '../screens/LoadingScreen';
import NotificationScreen from '../screens/notification/NotificationScreen';
import RequestScreen from '../screens/request/RequestScreen';
import UserScreen from '../screens/UserScreen';
import { IconWithBadge, TabBarIcon } from './TabBarIcon';
import TabBarLabel from './TabBarLabel';

const Tab = createMaterialTopTabNavigator();

export default () => {
  const authContext = React.useContext(AuthContext);
  const user = authContext.user || {};
  return (
    <Tab.Navigator
      lazy lazyPlaceholder={LoadingScreen}
      tabBarPosition='bottom'
      initialLayout={{ width: Dimensions.get('window').width }}
      tabBarOptions={{
        showIcon: true,
        indicatorStyle: { backgroundColor: Colors.primaryColor },
        // style: { backgroundColor: Colors.primaryBackground },
      }}
    >
{/*
      <Tab.Screen name='DeviceInfo' component={DeviceInfoScreen}
        options={{
          tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label='Device Info' />,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              type={'ion'}
              focused={focused}
              name='md-information-circle'
            />
          ),
        }}
      />
 */}
      <Tab.Screen name='CheckIn' component={CheckInScreen}
        options={{
          tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label='Chấm công' />,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name={['far', 'hand-pointer']}
            />
          ),
        }}
      />
      <Tab.Screen name='History' component={HistoryScreen}
        options={{
          tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label='Ngày công' />,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name={'list-ul'}
            />
          ),
        }}
      />
      <Tab.Screen name='Request' component={RequestScreen}
        options={{
          tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label='Yêu cầu nghỉ' />,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              type='ant'
              focused={focused}
              name={'file-done'}
            />
          ),
        }}
      />
      <Tab.Screen name='Notification' component={NotificationScreen}
        options={{
          tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label='Thông báo' />,
          tabBarIcon: ({ focused }) => (
            <IconWithBadge
              focused={focused}
              name={['far', 'bell']}
              badgeCount={3}
            />
          ),
        }}
      />
      <Tab.Screen name='User' component={UserScreen}
        options={{
          tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label={user.name} />,
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ margin: -4, width: 32, height: 32, borderRadius: 100, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={{ uri: user.photoUrl }}
                  style={{ width: 30, height: 30, borderRadius: 100 }}
                />
              </View>
            )
          },
        }}
      />
    </Tab.Navigator>
  )
}
