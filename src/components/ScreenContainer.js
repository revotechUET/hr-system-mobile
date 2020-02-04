import React from 'react';
import { KeyboardAvoidingView, Platform, View } from "react-native";
import Colors from '../constants/Colors';
import LoadingScreen from '../screens/LoadingScreen';

export default function ScreenContainer({ children, padding = 15, style, loading = false, ...props }) {
  if (loading) return <LoadingScreen />;
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : null}>
      <View style={[{ padding, backgroundColor: Colors.primaryBackground }, style]}>
        {children}
      </View>
    </KeyboardAvoidingView>
  )
}
