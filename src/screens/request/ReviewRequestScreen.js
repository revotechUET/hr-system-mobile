import React, { useState } from 'react';
import { Modal, Picker, StyleSheet, Text, View } from 'react-native';
import { Input, Divider } from 'react-native-elements';
import { FlatList, TouchableNativeFeedback } from 'react-native-gesture-handler';
import { s } from '../../CommonStyles';
import BodyText from '../../components/BodyText';
import DateInput from '../../components/DateInput';
import HrButton from '../../components/HrButton';
import ScreenContainer from '../../components/ScreenContainer';
import Colors from '../../constants/Colors';
import Utils from '../../Utils';
import Icon from '../../components/Icon';
import CircleButton from '../../components/CircleButton';

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

export default class ReviewRequestScreen extends React.Component {
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

const ModalReview = ({ close, visible, id, name, from, to, reason, status, description }) => (
  <Modal
    transparent
    onRequestClose={close}
    visible={visible}
  >
    <View style={styles.modalContainer}>
      <View style={styles.header}>
        <CircleButton onPress={close}>
          <Icon name='arrow-left' size={18} />
        </CircleButton>
        <BodyText style={{ marginLeft: 10 }}>Yêu cầu nghỉ {id}</BodyText>
      </View>
      <Divider />
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <BodyText style={styles.field}>Nhân viên</BodyText>
          <BodyText style={styles.value}>{name}</BodyText>
        </View>
        <View style={styles.infoRow}>
          <BodyText style={styles.field}>Trạng thái</BodyText>
          <BodyText style={styles.value}>{status === 0 ? 'Chờ phê duyệt' : status === 1 ? 'Đã phê duyệt' : status === 2 ? 'Đã từ chối' : 'Đã huỷ'}</BodyText>
        </View>
        <View style={styles.infoRow}>
          <BodyText style={styles.field}>Lý do nghỉ</BodyText>
          <BodyText style={styles.value}>{reason === 0 ? 'Lý do cá nhân' : reason === 1 ? 'Đi công vụ' : 'Đi công tác'}</BodyText></View>
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
  </Modal>
)

const ListItem = (props) => {
  const { index, code, name, from, to, reason, status } = props;
  const [modalReview, setModalReview] = useState(false);
  return (
    <View style={{ margin: 4, backgroundColor: Colors.secondaryBackground, elevation: 2 }}>
      <TouchableNativeFeedback style={{ padding: 8 }} onPress={() => setModalReview(true)}>
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
            <BodyText style={[s.flexFill, s.textCenter]}>
              {
                reason === '0' ? 'Lý do cá nhân' : reason === '1' ? 'Đi công vụ' : 'Đi công tác'
              }
            </BodyText>
          </View>
          <View style={{ alignItems: 'center', flex: 1 }}>
            <Text style={styles.label}>Trạng thái</Text>
            <BodyText style={[s.flexFill, s.textCenter]}>
              {
                status === 'waiting' ? 'Chờ phê duyệt' : status === 1 ? 'Đã phê duyệt' : status === 2 ? 'Đã từ chối' : 'Đã huỷ'
              }
            </BodyText>
          </View>
        </View>
      </TouchableNativeFeedback>
      {modalReview && <ModalReview visible={modalReview} close={() => setModalReview(false)} {...props} />}
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
