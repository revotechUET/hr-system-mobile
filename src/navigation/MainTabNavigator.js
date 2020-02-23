import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { AppContext } from '../Contexts';
import CheckInScreen from '../screens/CheckInScreen';
import DeviceInfoScreen from '../screens/DeviceInfoScreen';
import HistoryScreen from '../screens/HistoryScreen';
import LoadingScreen from '../screens/LoadingScreen';
import NotificationDetailScreen from '../screens/notification/NotificationDetailScreen';
import NotificationScreen from '../screens/notification/NotificationScreen';
import RequestDetailScreen from '../screens/request/RequestDetailScreen';
import RequestScreen from '../screens/request/RequestScreen';
import ReviewRequestDetailScreen from '../screens/request/ReviewRequestDetailScreen';
import UserScreen from '../screens/UserScreen';
import { IconWithBadge, TabBarIcon } from './TabBarIcon';
import TabBarLabel from './TabBarLabel';


const NotificationStack = createStackNavigator();
const NotificationStackScreen = () => {
  return (
    <NotificationStack.Navigator headerMode='screen'>
      <NotificationStack.Screen name='Notification' component={NotificationScreen} options={{ headerShown: false }} />
      <NotificationStack.Screen name='NotificationDetail' component={NotificationDetailScreen}
        options={({ route }) => {
          const { title } = route.params || {};
          return {
            title,
          }
        }}
      />
    </NotificationStack.Navigator>
  )
}

const RequestStack = createStackNavigator();
const RequestStackScreen = () => {
  return (
    <RequestStack.Navigator headerMode='screen'>
      <RequestStack.Screen name='Request' component={RequestScreen} options={{ headerShown: false }} />
      <RequestStack.Screen name='RequestDetail' component={RequestDetailScreen}
        options={{ title: 'Chi tiết yêu cầu nghỉ' }}
      />
      <RequestStack.Screen name='ReviewRequestDetail' component={ReviewRequestDetailScreen}
        options={{ title: 'Phê duyệt yêu cầu nghỉ' }}
      />
    </RequestStack.Navigator>
  )
}

const Tab = createMaterialTopTabNavigator();
export default ({ navigation }) => {
  const authContext = React.useContext(AppContext);
  const user = authContext.user || {};
  return (
    <Tab.Navigator
      lazy lazyPlaceholder={LoadingScreen}
      tabBarPosition='bottom'
      initialLayout={{ width: Dimensions.get('window').width }}
      // tabBar={props => <MyTabBar {...props} />}
      tabBarOptions={{
        showIcon: true,
        indicatorStyle: { backgroundColor: 'transparent' },
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
      <Tab.Screen name='Request' component={RequestStackScreen}
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
      <Tab.Screen name='Notification' component={NotificationStackScreen}
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
