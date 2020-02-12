import React, { useContext, useState, useEffect, useCallback } from 'react';
import { PixelRatio, StyleSheet, View, ActivityIndicator } from 'react-native';
import BodyText from '../components/BodyText';
import CircleButton from '../components/CircleButton';
import ScreenContainer from '../components/ScreenContainer';
import Colors from '../constants/Colors';
import { AuthContext } from '../Contexts';
import ApiService from '../services/ApiService';
import LoadingScreen from './LoadingScreen';

export default function CheckInScreen() {
  const cancellable = ApiService.useCancellable();
  const context = useContext(AuthContext);
  const user = context.user || {};
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const update = useCallback(async () => {
    try {
      const { status } = await cancellable(ApiService.checkingStatus());
      console.log('checking status', status);
      setStatus(status);
    } catch (error) {
    }
  })
  const checkIn = useCallback(async () => {
    try {
      setLoading(true);
      const res = await cancellable(ApiService.checkIn());
      console.log(res);
      await update();
      setLoading(false);
    } catch (error) {
    }
  }, [])
  const checkOut = useCallback(async () => {
    try {
      setLoading(true);
      await cancellable(ApiService.checkOut());
      await update();
      setLoading(false);
    } catch (error) {
    }
  }, [])
  useEffect(() => {
    update();
  }, [])
  return (
    <ScreenContainer style={styles.container} loading={status === null}>
      <BodyText>Chúc bạn ngày mới vui vẻ</BodyText>
      {
        loading ?
          <CircleButton
            disabled
            size={70 * PixelRatio.get()}
            containerStyle={styles.buttonContainer}
          >
            <ActivityIndicator color={Colors.primaryColor} size='large'/>
          </CircleButton>
          : status === 0 ?
            <CircleButton
              size={70 * PixelRatio.get()}
              backgroundColor={Colors.primaryColor}
              containerStyle={styles.buttonContainer}
              onPress={checkIn}
            >
              <BodyText style={styles.buttonText}>Check in</BodyText>
            </CircleButton>
            : status === 1 ?
              <CircleButton
                size={70 * PixelRatio.get()}
                backgroundColor='#FF9800'
                containerStyle={styles.buttonContainer}
                onPress={checkOut}
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
                <BodyText style={[styles.buttonText]}>Đã check out</BodyText>
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
