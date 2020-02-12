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
import ApiService from '../../services/ApiService';
import Utils from '../../Utils';
import LoadingScreen from '../LoadingScreen';

export default class ListRequestScreen extends React.Component {
  state = {
    id: '',
    startTime: null,
    endTime: null,
    status: null,
    list: null,
    loading: false,
  }
  componentDidMount() {
    this.update();
  }
  update = async () => {
    const { id, startTime, endTime, status } = this.state;
    this.setState({ loading: true });
    const list = await ApiService.listUserLeaveRequest({ id, startTime, endTime, status }) || [];
    this.setState({ list, loading: false });
  }
  goToDetail = (item) => {
    this.props.navigation.navigate('RequestDetail', { id: item.id });
  }
  render() {
    const { id, startTime, endTime, status, list, loading } = this.state;
    return (
      <ScreenContainer style={styles.container}>
        <View style={styles.form}>
          <Input
            label='Mã yêu cầu'
            labelStyle={s.label}
            value={id}
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
              {Utils.leaveStatus.all.map(s => <Picker.Item key={s} label={Utils.leaveStatus[s]} value={s} />)}
            </Picker>
          </View>
          <DateInput
            label='Thời gian bắt đầu'
            value={startTime}
            onChange={(event, date) => this.setState({ startTime: date })}
          />
          <DateInput
            label='Thời gian kết thúc'
            value={endTime}
            onChange={(event, date) => this.setState({ endTime: date })}
          />
          <HrButton title='Tìm kiếm' onPress={this.update} />
        </View>
        <View style={[s.mt3, s.flexFill]}>
          {
            loading ? <LoadingScreen />
              : list && list.length
                ? <FlatList
                  data={list}
                  keyExtractor={(item, index) => '' + index}
                  renderItem={({ item, index, seperators }) => <ListItem key={index} index={index + 1} {...item} onPress={() => this.goToDetail(item)} />}
                />
                : <BodyText style={s.textCenter}>Không tìm thấy yêu cầu nghỉ</BodyText>
          }
        </View>
      </ScreenContainer>
    )
  }
}

const ListItem = ({ index, id, startTime, endTime, reason, status, onPress }) => (
  <View style={{ margin: 4, backgroundColor: Colors.secondaryBackground, elevation: 2 }}>
    <TouchableItem style={{ padding: 8 }} onPress={onPress}>
      <>
        {/* <BodyText style={[s.w100, s.textCenter, { flexDirection: 'row', fontWeight: 'bold' }]}>{id}</BodyText> */}
        <View style={{ flexDirection: 'row', }}>
          <View style={{ alignItems: 'center', flex: 1 }}>
            <Text style={styles.label}>Thời gian bắt đầu</Text>
            <BodyText style={[s.flexFill, s.textCenter]}>{Utils.dateFormat(startTime, 'dd/MM/yyyy hh:mm')}</BodyText>
          </View>
          <View style={{ alignItems: 'center', flex: 1 }}>
            <Text style={styles.label}>Thời gian kết thúc</Text>
            <BodyText style={[s.flexFill, s.textCenter]}>{Utils.dateFormat(endTime, 'dd/MM/yyyy hh:mm')}</BodyText>
          </View>
        </View>
        <View style={{ flexDirection: 'row', }}>
          <View style={{ alignItems: 'center', flex: 1 }}>
            <Text style={styles.label}>Lý do nghỉ</Text>
            <BodyText style={[s.flexFill, s.textCenter]}>
              {
                Utils.leaveReason[reason]
              }
            </BodyText>
          </View>
          <View style={{ alignItems: 'center', flex: 1 }}>
            <Text style={styles.label}>Trạng thái</Text>
            <BodyText style={[s.flexFill, s.textCenter]}>
              {
                Utils.leaveStatus[status]
              }
            </BodyText>
          </View>
        </View>
      </>
    </TouchableItem>
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
