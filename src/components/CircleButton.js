import React from 'react';
import { View } from 'react-native';
import TouchableItem from 'react-native-tab-view/src/TouchableItem';

export default function CircleButton({ children, size = 30, containerStyle, buttonStyle, backgroundColor, ...props }) {
  return (
    <View style={[{ borderRadius: 100, backgroundColor }, containerStyle]}>
      <TouchableItem {...props} style={{ borderRadius: 100, overflow: 'visible' }}>
        <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, buttonStyle]}>
          {children}
        </View>
      </TouchableItem>
    </View >
  )
}
