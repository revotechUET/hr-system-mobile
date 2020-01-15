import Constants from 'expo-constants';
import React from 'react';
import { Platform, StatusBar, StyleSheet, Text, ScrollView, View, PixelRatio } from 'react-native';
import Colors from '../constants/Colors';

export default function DeviceInfoScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text>Device: {Constants.deviceName}</Text>
        {Platform.OS === 'android' && <Text>Status bar height: {StatusBar.currentHeight}px</Text>}
        <Text>
          Pixel ratio {PixelRatio.get()}
        </Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  }
});
