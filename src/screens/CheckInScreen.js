import React from 'react';
import { StyleSheet, View, PixelRatio, Button } from 'react-native';
import BodyText from '../components/BodyText';
import CircleButton from '../components/CircleButton';
import ScreenContainer from '../components/ScreenContainer';
import Colors from '../constants/Colors';
import ApiService from '../services/ApiService';
import LoadingScreen from './LoadingScreen';

export default class CheckInScreen extends React.Component {
  state = {
    status: null,
    user: null,
  }
  componentDidMount() {
    this.update();
  }
  update = async () => {
    const user = await ApiService.getUser();
    const { status } = await ApiService.checkingStatus();
    this.setState({ status, user });
  }
  checkIn = async () => {
    const res = await ApiService.checkIn();
    console.log(res);
    this.update();
  }
  checkOut = async () => {
    await ApiService.checkOut();
    this.update();
  }
  render() {
    const { status, user } = this.state;
    return (
      <ScreenContainer style={styles.container} loading={status === null}>
        <BodyText>Chúc bạn ngày mới vui vẻ</BodyText>
        {
          status === 0 ?
            <CircleButton
              size={70 * PixelRatio.get()}
              backgroundColor={Colors.primaryColor}
              containerStyle={styles.buttonContainer}
              onPress={this.checkIn}
            >
              <BodyText style={styles.buttonText}>Check in</BodyText>
            </CircleButton>
            : status === 1 ?
              <CircleButton
                size={70 * PixelRatio.get()}
                backgroundColor='#FF9800'
                containerStyle={styles.buttonContainer}
                onPress={this.checkOut}
              >
                <BodyText style={styles.buttonText}>Check out</BodyText>
              </CircleButton>
              :
              <CircleButton
                disabled
                size={70 * PixelRatio.get()}
                backgroundColor={Colors.disabledBackground}
                containerStyle={styles.buttonContainer}
              >
                <BodyText style={styles.buttonText}>Check out</BodyText>
              </CircleButton>
        }
        {
          user
            ? <>
              <BodyText style={{ margin: 20 }}>{user.name}</BodyText>
              <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                  <BodyText style={styles.field}>
                    Bộ phận:
                  </BodyText>
                  <BodyText style={styles.value}>
                    Phong phat trien sp
                  </BodyText>
                </View>
                <View style={styles.infoRow}>
                  <BodyText style={styles.field}>
                    Loại hợp đồng:
                  </BodyText>
                  <BodyText style={styles.value}>
                    Hop dong chinh thuc
                  </BodyText>
                </View>
                <View style={styles.infoRow}>
                  <BodyText style={styles.field}>
                    Số công của tháng:
                  </BodyText>
                  <BodyText style={styles.value}>
                    22
                  </BodyText>
                </View>
                <View style={styles.infoRow}>
                  <BodyText style={styles.field}>
                    Số ngày phép còn lại:
                  </BodyText>
                  <BodyText style={styles.value}>
                    09
                  </BodyText>
                </View>
              </View>
            </>
            : <LoadingScreen />
        }
      </ScreenContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20 * PixelRatio.get(),
  },
  button: {
    backgroundColor: Colors.primaryColor,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  infoRow: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row'
  },
  field: {
    flex: 1,
    maxWidth: '45%',
    fontSize: 16,
    marginRight: 5,
  },
  value: {
    fontSize: 16,
  }
});
