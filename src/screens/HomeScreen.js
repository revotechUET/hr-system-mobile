import React from 'react';
import { StyleSheet, Text } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';

export default function HomeScreen() {
  return (
    <ScreenContainer style={styles.container}>
      <Text>HR App</Text>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
