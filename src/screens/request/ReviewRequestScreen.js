import React from 'react';
import { Picker, StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import TouchableItem from 'react-native-tab-view/src/TouchableItem';
import { s } from '../../CommonStyles';
import BodyText from '../../components/BodyText';
import DateInput from '../../components/DateInput';
import HrButton from '../../components/HrButton';
import ScreenContainer from '../../components/ScreenContainer';
import Colors from '../../constants/Colors';
import Utils from '../../Utils';

const _DATA = [
  {
    code: 1,
    name: 'Họ Và Tên',
    from: new Date(),
    to: new Date(),
    reason: 0,
    notifyList: [],
    description: 'mo ta',
    status: 0,
  },
  {
    code: 2,
    name: 'Họ Và Tên',
    from: new Date(),
    to: new Date(),
    status: 3,
    reason: 1,
  },
  {
    code: 3,
    name: 'Họ Và Tên',
    from: new Date(),
    to: new Date(),
    status: 0,
    reason: 2,
  },
  {
    code: 4,
    name: 'Họ Và Tên',
    from: new Date(),
    to: new Date(),
    status: 1,
    reason: 2,
  },
  {
    code: 5,
    name: 'Họ Và Tên',
    from: new Date(),
    to: new Date(),
    status: 2,
    reason: 1,
  },
  {
    code: 6,
    name: 'Họ Và Tên',
    from: new Date(),
    to: new Date(),
    status: 3,
    reason: 2,
  },
  {
    code: 7,
    name: 'Họ Và Tên',
    from: new Date(),
    to: new Date(),
    status: 2,
    reason: 0,
  },
  {
    code: 8,
    name: 'Họ Và Tên',
    from: new Date(),
    to: new Date(),
    status: 1,
    reason: 1,
  },
  {
    code: 9,
    name: 'Họ Và Tên',
    from: new Date(),
    to: new Date(),
    status: 0,
    reason: 0,
  },
]

export default class ListReviewRequestScreen extends React.Component {
  state = {
    code: '',
    fromDate: null,
    toDate: null,
    status: null,
  }
  goToDetail = (item) => {
    this.props.navigation.navigate('ReviewRequestDetail', { id: item.id });
  }
  render() {
    const { code, fromDate, toDate, status } = this.state;
    return (
      <ScreenContainer style={styles.container}>
        <View style={styles.form}>
          <Input
            label='Mã yêu cầu'
            labelStyle={s.label}
            value={code}
            containerStyle={{ marginBottom: 5 }}
          />
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>Trạng thái</Text>
            <Picker
              selectedValue={status}
              onValueChange={(value) => this.setState({ status: value })}
              mode='dropdown'
            >
              <Picker.Item label='Tất cả' value={null} />
              <Picker.Item label='Chưa báo lỗi' value={0} />
              <Picker.Item label='Đang báo lỗi' value='processing' />
              <Picker.Item label='Đã được xử lý' value='done' />
            </Picker>
          </View>
          <DateInput
            label='Thời gian bắt đầu'
            value={fromDate}
            onChange={(event, date) => this.setState({ fromDate: date })}
          />
          <DateInput
            label='Thời gian kết thúc'
            value={toDate}
            onChange={(event, date) => this.setState({ toDate: date })}
          />
          <HrButton title='Tìm kiếm' />
        </View>
        <View style={[s.mt3, s.flexFill]}>
          <FlatList
            data={_DATA}
            keyExtractor={(item, index) => '' + index}
            renderItem={({ item, index, seperators }) => <ListItem key={index} index={index + 1} {...item} onPress={() => this.goToDetail(item)} />}
          />
        </View>
      </ScreenContainer>
    )
  }
}

const ListItem = (props) => {
  const { index, code, name, from, to, reason, status, onPress } = props;
  return (
    <View style={{ margin: 4, backgroundColor: Colors.secondaryBackground, elevation: 2 }}>
      <TouchableItem style={{ padding: 8 }} onPress={onPress}>
        <>
          <View style={{ flexDirection: 'row', }}>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={styles.label}>Mã</Text>
              <BodyText style={[s.flexFill, s.textCenter]}>{code}</BodyText>
            </View>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={styles.label}>Tên nhân viên</Text>
              <BodyText style={[s.flexFill, s.textCenter]}>{name}</BodyText>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={styles.label}>Thời gian bắt đầu</Text>
              <BodyText style={[s.flexFill, s.textCenter]}>{Utils.dateFormat(from, 'dd/MM/yyyy hh:mm')}</BodyText>
            </View>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={styles.label}>Thời gian kết thúc</Text>
              <BodyText style={[s.flexFill, s.textCenter]}>{Utils.dateFormat(to, 'dd/MM/yyyy hh:mm')}</BodyText>
            </View>
          </View>
          <View style={{ flexDirection: 'row', }}>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={styles.label}>Lý do nghỉ</Text>
              <BodyText style={[s.flexFill, s.textCenter]}>{Utils.leaveReason[reason]}</BodyText>
            </View>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={styles.label}>Trạng thái</Text>
              <BodyText style={[s.flexFill, s.textCenter]}>{Utils.leaveStatus[status]}</BodyText>
            </View>
          </View>
        </>
      </TouchableItem>
    </View>
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
