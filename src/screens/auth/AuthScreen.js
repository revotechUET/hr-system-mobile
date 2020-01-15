import React from 'react';
import { View } from 'react-native';
import GoogleSigninButton from '../../components/GoogleSigninButton';
import ApiService from '../../services/ApiService';
import LoadingScreen from '../LoadingScreen';

export default class AuthScreen extends React.Component {
  state = {
    ready: false,
    loading: false,
  }

  async componentDidMount() {
    const auth = await ApiService.getAuth();
    if (auth) {
      this.props.navigation.navigate('App');
    } else {
      this.setState({ ready: true });
    }
  }

  signInAsync = async () => {
    this.setState({ loading: true })
    const { type } = await ApiService.login();
    this.setState({ loading: false })
    if (type === 'success') {
      this.props.navigation.navigate('App');
    }
  };

  render() {
    const { loading, ready } = this.state;
    if (!ready) {
      return <LoadingScreen />
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <GoogleSigninButton onPress={() => this.signInAsync()} disabled={loading} loading={loading} />
      </View>
    )
  }
}
