import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator, View } from "react-native";
import Colors from '../constants/Colors';

export default function LoadingView(props) {
  const { loading, children, ...viewProps } = props;
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.primaryBackground }}>
        <ActivityIndicator size='large' color={Colors.primaryColor} />
      </View>
    )
  }
  return (
    <View {...viewProps}>
      {children}
    </View>
  )
}
LoadingView.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.element,
}
