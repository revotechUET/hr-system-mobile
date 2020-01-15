import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import NotificationDetailScreen from '../screens/notification/NotificationDetailScreen';
import MainTabNavigator from './MainTabNavigator';
import AuthScreen from '../screens/auth/AuthScreen';

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
      path: 'notification/detail',
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
      headerForceInset: { top: 0 },
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
