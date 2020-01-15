import React from 'react';
import { StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import BodyText from '../components/BodyText';
import CircleButton from '../components/CircleButton';
import ScreenContainer from '../components/ScreenContainer';
import Colors from '../constants/Colors';

export default function CheckInScreen() {
  return (
    <ScreenContainer style={styles.container}>
      <BodyText>Chúc bạn ngày mới vui vẻ</BodyText>
      <CircleButton
        size={180}
        backgroundColor={Colors.primaryColor}
        containerStyle={styles.buttonContainer}
        onPress={() => { }}
      >
        <BodyText style={styles.buttonText}>Check in</BodyText>
      </CircleButton>
      <BodyText style={{ margin: 20 }}>Họ Và Tên</BodyText>
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
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonContainer: {
    margin: 50,
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
  },
  value: {
    fontSize: 16,
  }
});
