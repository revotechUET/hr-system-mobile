import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import { FlatList, Modal, Picker, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-elements';
import { c, s } from '../CommonStyles';
import BodyText from '../components/BodyText';
import DateInput from '../components/DateInput';
import HrButton from '../components/HrButton';
import ScreenContainer from '../components/ScreenContainer';
import Colors from '../constants/Colors';
import Utils from '../Utils';

const _DATA = [
  {
    id: 1,
    checkIn: new Date(),
    checkOut: new Date(),
    status: 'none',
  },
  {
    id: 2,
    checkIn: new Date(),
    checkOut: new Date(),
    status: 'done',
    reportMsg: 'hihi',
    responseMsg: 'okie',
  },
  {
    id: 3,
    checkIn: new Date(),
    checkOut: new Date(),
    status: 'none',
  },
  {
    id: 4,
    checkIn: new Date(),
    checkOut: new Date(),
    status: 'processing',
  },
  {
    id: 5,
    checkIn: new Date(),
    checkOut: new Date(),
    status: 'none',
  },
  {
    id: 6,
    checkIn: new Date(),
    checkOut: new Date(),
    status: 'none',
  },
  {
    id: 7,
    checkIn: new Date(),
    checkOut: new Date(),
    status: 'none',
  },
  {
    id: 8,
    checkIn: new Date(),
    checkOut: new Date(),
    status: 'none',
  },
  {
    id: 9,
    checkIn: new Date(),
    checkOut: new Date(),
    status: 'none',
  },
  {
    id: 10,
    checkIn: new Date(),
    checkOut: new Date(),
    status: 'none',
  },
  {
    id: 11,
    checkIn: new Date(),
    checkOut: new Date(),
    status: 'none',
  },
]
export default class HistoryScreen extends React.Component {
  state = {
    modalReport: false,
    modalResponse: false,
    fromDate: new Date(),
    toDate: new Date(),
    status: null,
  }
  render() {
    const { fromDate, toDate, status, modalReport, modalResponse } = this.state;
    return (
      <ScreenContainer style={styles.container}>
        <View>
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
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>Trạng thái báo cáo lỗi</Text>
            <Picker
              selectedValue={status}
              onValueChange={(value) => this.setState({ status: value })}
              mode='dropdown'
            >
              <Picker.Item label='Tất cả' value={null} />
              <Picker.Item label='Chưa báo lỗi' value='none' />
              <Picker.Item label='Đang báo lỗi' value='processing' />
              <Picker.Item label='Đã được xử lý' value='done' />
            </Picker>
          </View>
          <HrButton title='Tìm kiếm' />
        </View>
        <View style={[s.mt3, s.flexFill]}>
          <View style={[s.mb1, { flexDirection: 'row' }]}>
            <BodyText style={[s.textCenter, { flexBasis: 30 }]}>STT</BodyText>
            <BodyText style={[s.flexFill, s.textCenter]}>Ngày</BodyText>
            <BodyText style={[s.flexFill, s.textCenter]}>Check in</BodyText>
            <BodyText style={[s.flexFill, s.textCenter]}>Check out</BodyText>
            <BodyText style={[s.textCenter, { flexBasis: 70 }]}>Báo cáo lỗi</BodyText>
          </View>
          <FlatList
            data={_DATA}
            keyExtractor={(item, index) => '' + index}
            renderItem={
              ({ item, index, seperators }) =>
                <ListItem
                  key={index}
                  index={index + 1}
                  openModalReport={() => this.setState({ modalReport: true })}
                  openModalResponse={() => this.setState({ modalResponse: true })}
                  {...item}
                />
            }
          />
        </View>
      </ScreenContainer>
    )
  }
}

const ModalReport = ({ close, visible }) => {
  const [msg, setMsg] = useState('');
  return (
    <Modal
      transparent
      onRequestClose={() => close()}
      visible={visible}
    >
      <BlurView style={styles.modalContainer} tint='light' intensity={100}>
        <View style={styles.modal}>
          <BodyText>Nhập thông tin báo lỗi</BodyText>
          <TextInput
            multiline
            numberOfLines={5}
            value={msg}
            onChangeText={text => setMsg(text)}
            underlineColorAndroid={Colors.secondaryText}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <HrButton
              title='Huỷ'
              titleStyle={{ marginLeft: 20, marginRight: 20 }}
              buttonStyle={{ backgroundColor: Colors.disabledBackground, marginRight: 10 }}
              onPress={() => close()}
            />
            <HrButton title='Gửi' titleStyle={{ marginLeft: 20, marginRight: 20 }} onPress={() => close(msg)} />
          </View>
        </View>
      </BlurView>
    </Modal>
  )
}

const ModalResponse = ({ close, visible, reportMsg, responseMsg }) => (
  <Modal
    transparent
    onRequestClose={close}
    visible={visible}
  >
    <BlurView style={styles.modalContainer} tint='light' intensity={100}>
      <View style={styles.modal}>
        <BodyText>Thông tin báo lỗi</BodyText>
        <BodyText>{reportMsg}</BodyText>
        <BodyText>Thông tin phản hồi</BodyText>
        <BodyText>{responseMsg}</BodyText>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <HrButton
            title='Huỷ'
            titleStyle={{ marginLeft: 20, marginRight: 20 }}
            buttonStyle={{ backgroundColor: Colors.disabledBackground, marginRight: 10 }}
            onPress={close}
          />
        </View>
      </View>
    </BlurView>
  </Modal>
)

const ListItem = ({ index, checkIn, checkOut, status, reportMsg, responseMsg }) => {
  const [modalReport, setModalReport] = useState(false);
  const [modalResponse, setModalResponse] = useState(false);
  const openModalReport = () => {
    setModalReport(true);
  }
  const onCloseModalReport = (msg) => {
    console.log(msg);
    setModalReport(false);
  }
  const openModalResponse = () => {
    setModalResponse(true);
  }
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
      <BodyText style={[s.textCenter, { flexBasis: 30 }]}>{index}</BodyText>
      <BodyText style={[s.flexFill, s.textCenter]}>{Utils.dateFormat(checkIn, 'dd/MM/yyyy')}</BodyText>
      <BodyText style={[s.flexFill, s.textCenter]}>{Utils.dateFormat(checkIn, 'hh:mm')}</BodyText>
      <BodyText style={[s.flexFill, s.textCenter]}>{Utils.dateFormat(checkOut, 'hh:mm')}</BodyText>
      <View style={[s.alignItemsCenter, { flexBasis: 70 }]}>
        <Button
          type='clear'
          iconContainerStyle={{ padding: 0 }}
          icon={
            <FontAwesomeIcon
              icon='flag'
              color={status === 'processing' ? Colors.primaryColor : status === 'done' ? c.SUCCESS : c.DANGER} />
          }
          onPress={status === 'none' ? openModalReport : openModalResponse}
        />
      </View>
      <ModalReport close={onCloseModalReport} visible={modalReport} />
      <ModalResponse close={() => setModalResponse(false)} visible={modalResponse} reportMsg={reportMsg} responseMsg={responseMsg}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: Colors.primaryBackground,
    width: '90%',
    padding: 12,
    elevation: 3
  }
});
