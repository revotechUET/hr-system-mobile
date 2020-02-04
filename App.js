import * as Font from 'expo-font';
import React from 'react';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import './bootstrap';
import AppNavigator from './src/navigation/AppNavigator';
import LoadingScreen from './src/screens/LoadingScreen';
import Colors from './src/constants/Colors';


export default class App extends React.Component {
  state = {
    ready: false
  }
  async componentDidMount() {
    await Font.loadAsync(
      'antoutline',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antoutline.ttf')
    );
    this.setState({ ready: true });
  }
  render() {
    const { ready } = this.state;
    if (!ready) return <LoadingScreen />;
    return (
      <SafeAreaProvider>
        <StatusBar barStyle={'dark-content'} backgroundColor={Colors.primaryBackground} />
        <SafeAreaView style={styles.container}>
          <AppNavigator />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: Platform.OS === 'android' && StatusBar.currentHeight || '', // fix notch
    flex: 1,
    backgroundColor: Colors.primaryBackground,
  },
});
