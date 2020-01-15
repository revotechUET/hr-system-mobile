import React from 'react';
import { View, ScreenRect, Dimensions, KeyboardAvoidingView } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';

export default function ScreenContainer({ children, margin = 15, style, ...props }) {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : null}>
      <View style={{ margin, ...style }}>
        {children}
      </View>
    </KeyboardAvoidingView>
  )
}
