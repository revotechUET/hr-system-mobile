import Constants from 'expo-constants';
import React from 'react';
import { Button, PixelRatio, Platform, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import ApiService from '../services/ApiService';

export default class DeviceInfoScreen extends React.Component {
  state = {
    gasResponse: null,
  }
  test1 = async () => {
  }
  testGAScript = async () => {
    try {
      const res = await ApiService.post('test', { fromDate: new Date(), toDate: null });
      console.log(res);
      this.setState({ gasResponse: res });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { gasResponse } = this.state;
    return (
      <ScreenContainer style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text>Device: {Constants.deviceName}</Text>
          {Platform.OS === 'android' && <Text>Status bar height: {StatusBar.currentHeight}px</Text>}
          <Text>
            Pixel ratio {PixelRatio.get()}
          </Text>
          <View style={{ margin: 5 }} />
          <Button title='Button1' onPress={this.test1} />
          <View style={{ margin: 5 }} />
          <Button title='Test GAScript' onPress={this.testGAScript} />
          {gasResponse && <Text>{JSON.stringify(gasResponse, null, '  ')}</Text>}
        </ScrollView>
      </ScreenContainer>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 12,
  }
});
