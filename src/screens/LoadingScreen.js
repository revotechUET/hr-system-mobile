import React from 'react';
import { ActivityIndicator, View } from "react-native";
import Colors from '../constants/Colors';

export default function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.primaryBackground }}>
      <ActivityIndicator size='large' color={Colors.primaryColor} />
    </View>
  )
}
