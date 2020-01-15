import React from 'react';
import { Picker, StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
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
    from: new Date(),
    to: new Date(),
    status: 0,
    reason: 0,
    fullName: 'Họ Và Tên'
  },
  {
    code: 2,
    from: new Date(),
    to: new Date(),
    status: 3,
    reason: 1,
    fullName: 'Họ Và Tên'
  },
  {
    code: 3,
    from: new Date(),
    to: new Date(),
    status: 0,
    reason: 2,
    fullName: 'Họ Và Tên'
  },
  {
    code: 4,
    from: new Date(),
    to: new Date(),
    status: 1,
    reason: 2,
    fullName: 'Họ Và Tên'
  },
  {
    code: 5,
    from: new Date(),
    to: new Date(),
    status: 2,
    reason: 1,
    fullName: 'Họ Và Tên'
  },
  {
    code: 6,
    from: new Date(),
    to: new Date(),
    status: 3,
    reason: 2,
    fullName: 'Họ Và Tên'
  },
  {
    code: 7,
    from: new Date(),
    to: new Date(),
    status: 2,
    reason: 0,
    fullName: 'Họ Và Tên'
  },
  {
    code: 8,
    from: new Date(),
    to: new Date(),
    status: 1,
    reason: 1,
    fullName: 'Họ Và Tên'
  },
  {
    code: 9,
    from: new Date(),
    to: new Date(),
    status: 0,
    reason: 0,
    fullName: 'Họ Và Tên'
  },
]

export default class ListRequestScreen extends React.Component {
  state = {
    code: '',
    fromDate: null,
    toDate: null,
    status: null,
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
            renderItem={({ item, index, seperators }) => <ListItem key={index} index={index + 1} {...item} />}
          />
        </View>
      </ScreenContainer>
    )
  }
}

const ListItem = ({ index, from, to, reason, status }) => (
  <View style={{ margin: 4, padding: 8, backgroundColor: Colors.secondaryBackground, elevation: 2 }}>
    <BodyText style={[s.w100, s.textCenter, { flexDirection: 'row', fontWeight: 'bold' }]}>{index}</BodyText>
    <View style={{ flexDirection: 'row', }}>
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
        <BodyText style={[s.flexFill, s.textCenter]}>
          {
            reason === 0 ? 'Lý do cá nhân' : reason === 1 ? 'Đi công vụ' : 'Đi công tác'
          }
        </BodyText>
      </View>
      <View style={{ alignItems: 'center', flex: 1 }}>
        <Text style={styles.label}>Trạng thái</Text>
        <BodyText style={[s.flexFill, s.textCenter]}>
          {
            status === 0 ? 'Chờ phê duyệt' : status === 1 ? 'Đã phê duyệt' : status === 2 ? 'Đã từ chối' : 'Đã huỷ'
          }
        </BodyText>
      </View>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
  }
});
