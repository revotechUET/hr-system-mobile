import React from 'react';
import { Button } from 'react-native-elements';
import { Image, View } from 'react-native';

const googleButtonColor = '#4285F4';

export default class GoogleSigninButton extends React.Component {
  render() {
    const { loading } = this.props;
    return (
      <Button
        raised
        buttonStyle={{ backgroundColor: googleButtonColor, padding: 1, minWidth: 200 }}
        title='Đăng nhập với Google'
        titleStyle={{ marginLeft: 10, marginRight: 10 }}
        icon={
          <View style={{ padding: 8, backgroundColor: '#fff', borderRadius: 2 }}>
            <Image
              source={require('../../assets/logo-google.png')}
              style={{ width: 26, height: 26, }}
            />
          </View>
        }
        iconContainerStyle={{ backgroundColor: '#fff', margin: 5 }}
        loadingStyle={{ margin: 10, marginTop: 10, marginBottom: 10 }}
        disabled={loading}
        disabledStyle={{ backgroundColor: googleButtonColor }}
        {...this.props}
      />
    )
  }
}
