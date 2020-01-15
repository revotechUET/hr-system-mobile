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

export class UserIcon extends React.Component {
  state = {
    uri: null
  }

  async componentDidMount() {
    const user = await ApiService.getUser();
    this.setState({ uri: user.photoUrl });
  }

  render() {
    const { uri } = this.state;
    const { focused } = this.props;
    return (
      <View style={{ margin: -4, width: 32, height: 32, borderRadius: 100, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={{ uri }}
          style={{ width: 30, height: 30, borderRadius: 100 }}
        />
      </View>
    )
  }
}
