import React from 'react';
import { Platform, StyleSheet, StatusBar } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
    <StatusBar barStyle={'dark-content'} />
      <SafeAreaView style={styles.container}>
        <AppNavigator style={styles.navigator} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'android' && StatusBar.currentHeight || '',
    flex: 1,
    backgroundColor: '#fff',
  },
  navigator: {
    overflow: Platform.OS === 'web' && 'auto' || 'scroll',
  }
});
