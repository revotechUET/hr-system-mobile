import React from 'react';
import { View } from 'react-native';
import GoogleSigninButton from '../../components/GoogleSigninButton';
import { AppContext } from '../../Contexts';
import ApiService from '../../services/ApiService';
import Colors from '../../constants/Colors';

export default class AuthScreen extends React.Component {
  state = {
    loading: false,
  }
  static contextType = AppContext;

  signInAsync = async () => {
    this.setState({ loading: true });
    const { type, auth, user } = await ApiService.login();
    this.setState({ loading: false });
    if (type === 'success') {
      this.context.login({ auth, user });
    }
  };

  render() {
    const { loading } = this.state;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.primaryBackground }}>
        <GoogleSigninButton onPress={() => this.signInAsync()} loading={loading} />
      </View>
    )
  }
}
