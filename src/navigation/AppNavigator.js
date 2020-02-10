import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AuthScreen from '../screens/auth/AuthScreen';
import NotificationDetailScreen from '../screens/notification/NotificationDetailScreen';
import RequestDetailScreen from '../screens/request/RequestDetailScreen';
import MainTabNavigator from './MainTabNavigator';
import LoadingScreen from '../screens/LoadingScreen';
import ApiService from '../services/ApiService';
import { AuthContext } from '../Contexts';

const Stack = createStackNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator headerMode='screen'>
      <Stack.Screen name='Main' component={MainTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name='NotificationDetail' component={NotificationDetailScreen}
        options={({ route }) => {
          const { title } = route.params || {};
          return {
            title,
          }
        }}
      />
      <Stack.Screen name='RequestDetail' component={RequestDetailScreen}
        options={({ route }) => {
          const { title } = route.params || {};
          return {
            title,
          }
        }}
      />
    </Stack.Navigator>
  )
}

export default function AppNavigator() {
  const [state, dispatch] = React.useReducer(
    (prevState, { type, ...action }) => {
      switch (type) {
        case 'LOADING':
          return {
            ...prevState,
            isLoading: typeof action.isLoading === 'boolean' ? action.isLoading : true,
          }
        case 'RESTORE_AUTH':
          return {
            ...prevState,
            isLoading: false,
            auth: action.auth,
            user: action.user,
          }
        case 'LOGIN':
          return {
            ...prevState,
            isLoading: false,
            isLogout: false,
            auth: action.auth,
            user: action.user,
          }
        case 'LOGOUT':
          return {
            ...prevState,
            isLoading: false,
            isLogout: true,
            auth: null,
            user: null,
          }
      }
    },
    {
      isLoading: true,
      isLogout: false,
      auth: null,
      user: null,
    }
  );

  React.useEffect(() => {
    (async () => {
      const auth = await ApiService.getCachedAuthAsync();
      const user = auth && await ApiService.getUser();
      const userInfo = auth && await ApiService.userInfo();
      dispatch({ type: 'RESTORE_AUTH', auth, user: { ...user, ...userInfo } });
    })();
  }, []);
  const authContextValue = {
    auth: state.auth,
    user: state.user,
    login: async ({ auth, user }) => {
      dispatch({ type: 'LOADING' });
      const userInfo = await ApiService.userInfo();
      dispatch({ type: 'LOGIN', auth, user: { ...user, ...userInfo } });
    },
    logout: () => dispatch({ type: 'LOGOUT' })
  }
  return (
    <AuthContext.Provider value={authContextValue}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Auth' headerMode='none'>
          {
            state.isLoading
              ? <Stack.Screen name='Loading' component={LoadingScreen} options={{ animationEnabled: false }} />
              : state.auth
                ? <Stack.Screen name='App' component={AppStack} />
                : <Stack.Screen name='Auth' component={AuthScreen} options={{ animationTypeForReplace: state.isLogout ? 'pop' : 'push' }} />
          }
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
