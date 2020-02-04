import React from 'react';
import { TouchableNativeFeedback, TouchableOpacity, View, Platform } from 'react-native';

export default function CircleButton({ children, size = 30, containerStyle, buttonStyle, backgroundColor, rippleColor, ...props }) {
  return (
    <View style={[{ borderRadius: 100, backgroundColor }, containerStyle]}>
      {
        Platform.OS === 'android'
          ? <TouchableNativeFeedback {...props} background={TouchableNativeFeedback.Ripple(rippleColor || '#aaa', true)} style={{ borderRadius: 100, overflow: 'visible' }}>
            <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, buttonStyle]}>
              {children}
            </View>
          </TouchableNativeFeedback>
          : <TouchableOpacity {...props} style={{ borderRadius: 100, overflow: 'visible' }}>
            <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, buttonStyle]}>
              {children}
            </View>
          </TouchableOpacity>
      }
    </View >
  )
}
