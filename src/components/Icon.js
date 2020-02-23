import { Ionicons } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { IconOutline as AntIconOutline } from "@ant-design/icons-react-native";

export default function Icon(props) {
  switch (props.type) {
    case 'ion':
      return (
        <Ionicons
          {...props}
          size={props.size || 26}
        />
      );
    case 'ant':
      return (
        <AntIconOutline
          {...props}
          size={props.size || 28}
        />
      );
    case 'fa':
    case 'fa5':
    default:
      return (
        <FontAwesomeIcon
          {...props}
          icon={props.name}
          size={props.size || 24}
        />
      );
  }
}

Icon.propTypes = {
  type: PropTypes.oneOf(['fa', 'fa5', 'ion', 'ant']),
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  size: PropTypes.number,
}

