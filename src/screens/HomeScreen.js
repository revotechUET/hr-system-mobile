import React from 'react';
import { View, Text, StyleSheet, StatusBar, Platform } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>HR App</Text>
      {Platform.OS === 'android' && <Text>Status bar height: {StatusBar.currentHeight}px</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
