import React from 'react';
import { Text } from "react-native";
import Colors from '../constants/Colors';

export default function BodyText({ children, size = 16, style, ...props }) {
  return (
    <Text {...props}
      style={[{ fontSize: size, color: Colors.primaryText }, style]}
    >
      {children}
    </Text>
  )
}

export function ErrorText({ children, size = 14, style, ...props }) {
  return (
    <Text {...props}
      style={[{ fontSize: size, color: Colors.errorText }, style]}
    >
      {children}
    </Text>
  )
}
