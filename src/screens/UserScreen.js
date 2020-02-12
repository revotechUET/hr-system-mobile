import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import ScreenContainer from '../components/ScreenContainer';
import Colors from '../constants/Colors';
import ApiService from '../services/ApiService';
import { AuthContext } from '../Contexts';

export default class UserScreen extends React.Component {
  static contextType = AuthContext;
  signOut = async () => {
    Alert.alert('Xác nhận', 'Bạn chắc chắn muốn đăng xuất?', [
      {
        text: 'Không',
        style: 'default',
        onPress: async () => {
        }
      },
      {
        text: 'Đăng xuất',
        style: 'destructive',
        onPress: async () => {
          await ApiService.logout();
          this.context.logout()
        }
      }
    ], {
      cancelable: true
    })
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
    margin: 0,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
});
