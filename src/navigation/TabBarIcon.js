import { Ionicons } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import Colors from '../constants/Colors';
import { IconOutline as AntIconOutline } from "@ant-design/icons-react-native";
import { View, Text, Image, ActivityIndicator } from 'react-native';
import ApiService from '../services/ApiService';

export function TabBarIcon(props) {
  switch (props.type) {
    case 'ion':
      return (
        <Ionicons
          name={props.name}
          size={props.size || 26}
          // style={props.style || { marginBottom: -3 }}
          color={props.focused ? Colors.primaryColor : Colors.primaryText}
        />
      );
    case 'ant':
      return (
        <AntIconOutline
          name={props.name}
          size={props.size || 28}
          color={props.focused ? Colors.primaryColor : Colors.primaryText}
        />
      );
    case 'fa':
    case 'fa5':
    default:
      return (
        <FontAwesomeIcon
          icon={props.name}
          size={props.size || 24}
          color={props.focused ? Colors.primaryColor : Colors.primaryText}
        />
      );
  }
}

TabBarIcon.propTypes = {
  type: PropTypes.oneOf(['fa', 'fa5', 'ion', 'ant']),
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
}

export class IconWithBadge extends React.Component {
  render() {
    const { badgeCount, ...props } = this.props;
    return (
      <View>
        <TabBarIcon {...props} />
        {badgeCount > 0 && (
          <View
            style={{
              position: 'absolute',
              right: -6,
              top: -4,
              backgroundColor: 'red',
              borderRadius: 100,
              width: 12,
              height: 12,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: badgeCount > 9 ? 9 : 10,
                fontWeight: 'bold'
              }}
            >
              {
                badgeCount > 9 ? '9+' : badgeCount
              }
            </Text>
          </View>
        )}
      </View>
    );
  }
}
