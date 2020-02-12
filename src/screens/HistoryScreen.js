import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import { FlatList, Modal, Picker, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import { c, s } from '../CommonStyles';
import BodyText from '../components/BodyText';
import DateInput from '../components/DateInput';
import HrButton from '../components/HrButton';
import ScreenContainer from '../components/ScreenContainer';
import Colors from '../constants/Colors';
import Utils from '../Utils';
import LoadingScreen from './LoadingScreen';
import ApiService from '../services/ApiService';
import Toast from 'react-native-root-toast';

function getFirstDayOfMonth() {
  const now = new Date();
  now.setDate(1);
  now.setHours(0, 0, 0, 0);
  return now;
}
export default class HistoryScreen extends React.Component {
  state = {
    modalReport: false,
    modalResponse: false,
    fromDate: getFirstDayOfMonth(),
    toDate: null,
    reportStatus: null,
    list: [],
    loading: true,
  }
  componentDidMount() {
    this.update();
  }
  update = async () => {
    this.setState({ loading: true });
    const { fromDate, toDate, reportStatus } = this.state;
    const list = await ApiService.listCheckIn({ fromDate, toDate, reportStatus }) || [];
    console.log(list);

    this.setState({ list, loading: false });
  }
  render() {
    const { fromDate, toDate, reportStatus, modalReport, modalResponse, loading, list } = this.state;
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
              selectedValue={reportStatus}
              onValueChange={(value) => this.setState({ reportStatus: value })}
              mode='dropdown'
            >
              <Picker.Item label='Tất cả' value={null} />
              <Picker.Item label='Chưa báo lỗi' value='none' />
              <Picker.Item label='Đang báo lỗi' value='reported' />
              <Picker.Item label='Đã được xử lý' value='done' />
            </Picker>
          </View>
          <HrButton title='Tìm kiếm' onPress={this.update} />
        </View>
        {
          loading
            ? <LoadingScreen />
            : list.length
              ? <View style={[s.mt3, s.flexFill]}>
                <FlatList
                  data={list}
                  keyExtractor={(item, index) => '' + item.id}
                  ListHeaderComponent={() =>
                    <View style={[s.mb3, { flexDirection: 'row' }]}>
                      <BodyText style={[s.textCenter, { flexBasis: 30 }]}>STT</BodyText>
                      <BodyText style={[s.flexFill, s.textCenter]}>Ngày</BodyText>
                      <BodyText style={[s.flexFill, s.textCenter]}>Check in</BodyText>
                      <BodyText style={[s.flexFill, s.textCenter]}>Check out</BodyText>
                      <BodyText style={[s.textCenter, { flexBasis: 70 }]}>Báo cáo lỗi</BodyText>
                    </View>
                  }
                  ItemSeparatorComponent={Divider}
                  renderItem={
                    ({ item, index, separators }) =>
                      <ListItem
                        key={item.id}
                        index={index + 1}
                        openModalReport={() => this.setState({ modalReport: true })}
                        openModalResponse={() => this.setState({ modalResponse: true })}
                        last={index === list.length - 1}
                        separators={separators}
                        update={this.update}
                        {...item}
                      />
                  }
                />
              </View>
              : <BodyText style={{ textAlign: 'center', marginTop: 20 }} >Không tìm thấy ngày công</BodyText>
        }
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
            <HrButton title='Gửi' titleStyle={{ marginLeft: 20, marginRight: 20 }} disabled={!msg} onPress={() => close(msg)} />
          </View>
        </View>
      </BlurView>
    </Modal>
  )
}

const ModalResponse = ({ close, visible, reportContent, responseContent }) => (
  <Modal
    transparent
    onRequestClose={close}
    visible={visible}
  >
    <BlurView style={styles.modalContainer} tint='light' intensity={100}>
      <View style={styles.modal}>
        <BodyText style={{ fontWeight: 'bold' }}>Thông tin báo lỗi</BodyText>
        <BodyText>{reportContent}</BodyText>
        {!!responseContent &&
          <>
            <BodyText style={[{ fontWeight: 'bold' }, s.mt3]}>Thông tin phản hồi</BodyText>
            <BodyText>{responseContent}</BodyText>
          </>
        }
        <View style={[{ flexDirection: 'row', justifyContent: 'center' }, s.mt3]}>
          <HrButton
            title='Đóng'
            titleStyle={{ marginLeft: 20, marginRight: 20 }}
            buttonStyle={{ backgroundColor: Colors.disabledBackground, marginRight: 10 }}
            onPress={close}
          />
        </View>
      </View>
    </BlurView>
  </Modal>
)

const ListItem = ({ index, id, date, checkinTime, checkoutTime, reportStatus, reportContent, responseContent, update }) => {
  const [modalReport, setModalReport] = useState(false);
  const [modalResponse, setModalResponse] = useState(false);
  const openModalReport = () => {
    setModalReport(true);
  }
  const onCloseModalReport = async (msg) => {
    setModalReport(false);
    if (!msg) return;
    const ok = await ApiService.reportCheckin({ id, reportContent: msg });
    if (ok) {
      Toast.show('Đã gửi báo cáo', { position: 0 });
      update();
    } else {
      Toast.show('Không thể gửi báo cáo', { position: 0 });
    }
  }
  const openModalResponse = () => {
    setModalResponse(true);
  }
  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 5 }}>
        <BodyText style={[s.textCenter, { flexBasis: 30 }]}>{index}</BodyText>
        <BodyText style={[s.flexFill, s.textCenter]}>{Utils.dateFormat(new Date(date), 'dd/MM/yyyy')}</BodyText>
        <BodyText style={[s.flexFill, s.textCenter]}>{Utils.dateFormat(new Date(checkinTime), 'hh:mm')}</BodyText>
        <BodyText style={[s.flexFill, s.textCenter]}>{checkoutTime ? Utils.dateFormat(new Date(checkoutTime), 'hh:mm') : ''}</BodyText>
        <View style={[s.alignItemsCenter, { flexBasis: 70 }]}>
          <Button
            type='clear'
            iconContainerStyle={{ padding: 0 }}
            icon={
              <FontAwesomeIcon
                icon='flag'
                color={reportStatus === 'reported' ? Colors.primaryColor : reportStatus === 'done' ? c.SUCCESS : c.DANGER} />
            }
            onPress={reportStatus === 'none' ? openModalReport : openModalResponse}
          />
        </View>
        <ModalReport close={onCloseModalReport} visible={modalReport} />
        <ModalResponse close={() => setModalResponse(false)} visible={modalResponse} reportContent={reportContent} responseContent={responseContent} />
      </View>
    </>
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
    elevation: 3,
  }
});
