import React from 'react';
import { Button } from "react-native-elements";
import Colors from "../constants/Colors";

export default ({ buttonStyle, ...props }) => (
  <Button
    {...props}
    buttonStyle={[
      {
        backgroundColor: props.type !== 'clear' && Colors.primaryColor || null,
      },
      buttonStyle
    ]}
    delayLongPress={300}
  />
)
