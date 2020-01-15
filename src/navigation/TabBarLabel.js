import React from 'react';
import { Text } from 'react-native';
import Colors from '../constants/Colors';

export default function TabBarLabel({ label, focused }) {
  return (
    <Text style={{
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      fontSize: 12,
      marginLeft: -10,
      marginRight: -10,
      color: focused ? Colors.primaryColor : Colors.primaryText
    }}>
      {label}
    </Text>
  )
}
