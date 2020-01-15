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
