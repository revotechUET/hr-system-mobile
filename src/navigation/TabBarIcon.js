import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import { Platform } from 'react-native';

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={props.size || 26}
      style={props.style || { marginBottom: -3 }}
      color={
        Platform.OS === 'ios'
          ? props.focused ? Colors.tabIconSelected : Colors.tabIconDefault
          : '#fff'
      }
    />
  );
}
