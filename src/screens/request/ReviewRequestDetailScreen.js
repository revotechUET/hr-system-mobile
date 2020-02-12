import React from 'react';
import { StyleSheet, View } from 'react-native';
import BodyText from '../../components/BodyText';
import HrButton from '../../components/HrButton';
import ScreenContainer from '../../components/ScreenContainer';
import Colors from '../../constants/Colors';
import Utils from '../../Utils';

export default function ReviewRequestDetailScreen({ navigation, route }) {
  const close = () => {
    navigation.goBack();
  }
  const id = route.params.id;
  const [request, setRequest] = React.useState({});
  React.useEffect(() => {

  });
  const { name, from, to, reason, status, description } = request;
  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <BodyText style={styles.field}>Nhân viên</BodyText>
          <BodyText style={styles.value}>{name}</BodyText>
        </View>
        <View style={styles.infoRow}>
          <BodyText style={styles.field}>Trạng thái</BodyText>
          <BodyText style={styles.value}>{Utils.leaveStatus[status]}</BodyText>
        </View>
        <View style={styles.infoRow}>
          <BodyText style={styles.field}>Lý do nghỉ</BodyText>
          <BodyText style={styles.value}>{Utils.leaveReason[reason]}</BodyText></View>
        <View style={styles.infoRow}>
          <BodyText style={styles.field}>Thời gian nghỉ từ</BodyText>
          <BodyText style={styles.value}>{Utils.dateFormat(from, 'dd/MM/yyyy hh:mm')}</BodyText>
        </View>
        <View style={styles.infoRow}>
          <BodyText style={styles.field}>Thời gian nghỉ đến</BodyText>
          <BodyText style={styles.value}>{Utils.dateFormat(to, 'dd/MM/yyyy hh:mm')}</BodyText>
        </View>
        <View style={styles.infoRow}>
          <BodyText style={styles.field}>Thông báo cho</BodyText>
          <BodyText style={styles.value}></BodyText>
        </View>
        <View style={styles.infoRow}>
          <BodyText style={styles.field}>Mô tả</BodyText>
          <BodyText style={styles.value}>{description}</BodyText>
        </View>
      </View>
      <View style={{ flex: 1 }}></View>
      <View style={{ flexDirection: 'row' }}>
        <HrButton
          title='Từ chối'
          titleStyle={{ marginLeft: 20, marginRight: 20 }}
          buttonStyle={{ backgroundColor: Colors.errorBackground }}
          containerStyle={{ flex: 1, marginRight: 10 }}
          onPress={close}
        />
        <HrButton
          title='Phê duyệt'
          titleStyle={{ marginLeft: 20, marginRight: 20 }}
          buttonStyle={{ backgroundColor: Colors.primaryColor }}
          containerStyle={{ flex: 1 }}
          onPress={close}
        />
      </View>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
  },
  infoRow: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row'
  },
  field: {
    flex: 1,
    maxWidth: '35%',
    fontSize: 16,
    marginRight: 5,
  },
  value: {
    fontSize: 16,
  }
});
