import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Toast from 'react-native-root-toast';
import { AuthContext } from '../Contexts';
import AuthScreen from '../screens/auth/AuthScreen';
import LoadingScreen from '../screens/LoadingScreen';
import ApiService from '../services/ApiService';
import MainTabNavigator from './MainTabNavigator';

const Stack = createStackNavigator();
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
      try {
        const auth = await ApiService.getCachedAuthAsync();
        const googleUser = auth && await ApiService.googleUserInfo();
        const userInfo = auth && await ApiService.verifyUser();
        dispatch({ type: 'RESTORE_AUTH', auth, user: { ...googleUser, ...userInfo } });
      } catch (error) {
        Toast.show(error.details[0].errorMessage);
        dispatch({ type: 'RESTORE_AUTH', auth: null });
      }
    })();
  }, []);
  const authContextValue = {
    auth: state.auth,
    user: state.user,
    login: async ({ auth, user }) => {
      try {
        dispatch({ type: 'LOADING' });
        const userInfo = await ApiService.verifyUser();
        dispatch({ type: 'LOGIN', auth, user: { ...user, ...userInfo } });
      } catch (error) {
        Toast.show(error.details[0].errorMessage);
        dispatch({ type: 'LOGIN', auth: null });
      }
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
                ? <Stack.Screen name='App' component={MainTabNavigator} />
                : <Stack.Screen name='Auth' component={AuthScreen} options={{ animationTypeForReplace: state.isLogout ? 'pop' : 'push' }} />
          }
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
