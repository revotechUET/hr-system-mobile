import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import * as Google from '../services/GoogleAuthService';
import ScreenContainer from '../components/ScreenContainer';
import Colors from '../constants/Colors';
import StorageService from '../services/StorageService';
import ApiService from '../services/ApiService';

export default class UserScreen extends React.Component {
  signOut = async () => {
    await ApiService.logout();
    this.props.navigation.navigate('Auth');
  }
  render() {
    return (
      <ScreenContainer style={styles.container}>
        <ListItem
          title='Hồ sơ'
          titleStyle={{ color: Colors.primaryText }}
          leftIcon={
            <FontAwesomeIcon
              icon='user'
              color={Colors.secondaryText}
            />
          }
          chevron
          bottomDivider
          onPress={() => { }}
        />
        <ListItem
          title='Đăng xuất'
          titleStyle={{ color: Colors.primaryText }}
          leftIcon={
            <FontAwesomeIcon
              icon='sign-out-alt'
              color={Colors.secondaryText}
            />
          }
          chevron
          bottomDivider
          onPress={this.signOut}
        />
      </ScreenContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
    margin: 0,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
});
