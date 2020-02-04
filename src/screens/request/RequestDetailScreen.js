import React from 'react';
import Colors from '../../constants/Colors';
import { View, StyleSheet } from 'react-native';
import Utils from '../../Utils';
import BodyText from '../../components/BodyText';
import HrButton from '../../components/HrButton';
import ApiService from '../../services/ApiService';


export default class RequestDetailScreen extends React.Component {
  state = {
    request: null
  }
  constructor(props) {
    super(props)
    console.log(this.props);
  }
  async componentDidMount() {
    const { navigation } = this.props;
    const id = navigation.getParam('id');

    if (!id) {
      navigation.goBack();
    }
    const request = await ApiService.getLeaveRequest();
    this.setState({ request });
  }
  render() {
    const { request: { id, name, from, to, reason, status, description } = {} } = this.state;
    return (
      <View style={styles.modalContainer}>
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    paddingBottom: 10,
    alignItems: 'center',
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
