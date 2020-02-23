import React, { useContext, useState, useEffect, useCallback } from 'react';
import { PixelRatio, StyleSheet, View, ActivityIndicator } from 'react-native';
import BodyText from '../components/BodyText';
import CircleButton from '../components/CircleButton';
import ScreenContainer from '../components/ScreenContainer';
import Colors from '../constants/Colors';
import { AppContext } from '../Contexts';
import ApiService from '../services/ApiService';
import LoadingScreen from './LoadingScreen';

export default function CheckInScreen() {
  const cancellable = ApiService.useCancellable();
  const context = useContext(AppContext);
  const user = context.user || {};
  const setting = context.setting || {};
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [points, setPoints] = useState(0);
  const [showCheckin, setShowCheckin] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const userPayroll = await cancellable(ApiService.getPayrollThisMonth());
      if (userPayroll) {
        console.log(userPayroll);
        setPoints(userPayroll.points);
      }
      let show = true;
      const workDay = setting.workDays[new Date().getDay()];
      switch (workDay) {
        case 0:
          show = false;
          break;
        case 1:
          if (new Date() >= new Date(setting.morningEnd)) show = false;
          break;
        case 2:
        case 3:
          if (new Date() >= new Date(setting.afternoonEnd)) show = false;
          break;
      }
      setShowCheckin(show);
      setLoading(false);
    })();
  }, [setting]);
  const update = useCallback(async () => {
    try {
      const { status } = await cancellable(ApiService.checkingStatus());
      console.log('checking status', status);
      setStatus(status);
    } catch (error) {
    }
  }, [cancellable]);
  const checkIn = useCallback(async () => {
    try {
      setLoading(true);
      const res = await cancellable(ApiService.checkIn());
      console.log(res);
      await update();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [cancellable, update])
  const checkOut = useCallback(async () => {
    try {
      setLoading(true);
      await cancellable(ApiService.checkOut());
      await update();
    } finally {
      setLoading(false);
    }
  }, [cancellable, update])
  useEffect(() => {
    update();
  }, [])
  return (
    <ScreenContainer style={styles.container} loading={status === null}>
      <BodyText>{setting.welcomeMessage}</BodyText>
      <View style={{ height: 100 * PixelRatio.get(), justifyContent: 'center' }} >
        {
          loading ?
            <ActivityIndicator color={Colors.primaryColor} size='large' />
            : status === 0 ?
              showCheckin &&
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
      </View>
      {
        user
          ? <>
            <BodyText style={{ margin: 20 }}>{user.name}</BodyText>
            <View style={styles.infoContainer}>
              {
                user.departments && user.departments.length
                  ? user.departments.map((d, idx) => (
                    <View key={d.id} style={[styles.infoRow, { marginTop: 0 }]}>
                      <BodyText style={styles.field}>
                        {idx === 0 ? 'Bộ phận:' : null}
                      </BodyText>
                      <BodyText style={styles.value}>
                        {d.name}
                      </BodyText>
                    </View>
                  )) : <View style={styles.infoRow}>
                    <BodyText style={styles.field}>
                      Bộ phận:
                      </BodyText>
                    <BodyText style={styles.value}>
                      Không có
                    </BodyText>
                  </View>
              }
              <View style={styles.infoRow}>
                <BodyText style={styles.field}>
                  Loại hợp đồng:
                </BodyText>
                <BodyText style={styles.value}>
                  {user.contract ? user.contract.name : 'Không có'}
                </BodyText>
              </View>
              <View style={styles.infoRow}>
                <BodyText style={styles.field}>
                  Số công của tháng:
                  </BodyText>
                <BodyText style={styles.value}>
                  {points}
                </BodyText>
              </View>
              <View style={styles.infoRow}>
                <BodyText style={styles.field}>
                  Số ngày phép còn lại:
                  </BodyText>
                <BodyText style={styles.value}>
                  :TODO:
                  </BodyText>
              </View>
            </View>
          </>
          : <LoadingScreen />
      }
    </ScreenContainer >
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
