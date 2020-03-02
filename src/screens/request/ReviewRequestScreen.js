import React, { useCallback, useEffect, useReducer } from 'react';
import { Picker, StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import TouchableItem from 'react-native-tab-view/src/TouchableItem';
import { s } from '../../CommonStyles';
import BodyText from '../../components/BodyText';
import CollapsiblePanel from '../../components/CollapsiblePanel';
import DateInput from '../../components/DateInput';
import HrButton from '../../components/HrButton';
import LoadingView from '../../components/LoadingView';
import ScreenContainer from '../../components/ScreenContainer';
import Colors from '../../constants/Colors';
import ApiService from '../../services/ApiService';
import Utils from '../../Utils';

export default function ListReviewRequestScreen({ navigation }) {
  const [state, setState] = useReducer((prevState, newState) => ({ ...prevState, ...newState }), {
    id: '',
    startTime: null,
    endTime: null,
    status: null,
    list: null,
    loading: false,
  })
  const { id, startTime, endTime, status, list, loading } = state;
  const cancellable = ApiService.useCancellable();
  const update = useCallback(async () => {
    try {
      setState({ loading: true });
      const list = await cancellable(ApiService.listLeaveRequest({ id, startTime, endTime, status }));
      setState({ list, loading: false });
    } catch (error) {
      setState({ loading: false });
    }
  }, [id, startTime, endTime, status]);
  const goToDetail = useCallback((item) => {
    navigation.navigate('ReviewRequestDetail', { id: item.id });
  }, []);
  useEffect(() => {
    update();
  }, []);
  return (
    <ScreenContainer style={styles.container}>
      <CollapsiblePanel collapsibleStyle={styles.form}>
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
            onValueChange={(value) => setState({ status: value })}
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
          value={startTime}
          onChange={(event, date) => setState({ startTime: date })}
        />
        <DateInput
          label='Thời gian kết thúc'
          value={endTime}
          onChange={(event, date) => setState({ endTime: date })}
        />
        <HrButton title='Tìm kiếm' onPress={update} />
      </CollapsiblePanel>
      <LoadingView style={[s.mt3, s.flexFill]} loading={loading}>
        <FlatList
          data={list}
          keyExtractor={(item, index) => '' + index}
          renderItem={({ item, index, seperators }) => <ListItem key={index} index={index + 1} {...item} onPress={() => goToDetail(item)} />}
        />
      </LoadingView>
    </ScreenContainer>
  )
}

const ListItem = (props) => {
  const { index, id, name, from, to, reason, status, onPress } = props;
  return (
    <View style={{ margin: 4, backgroundColor: Colors.secondaryBackground, elevation: 2 }}>
      <TouchableItem style={{ padding: 8 }} onPress={onPress}>
        <>
          <View style={{ flexDirection: 'row', }}>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={styles.label}>Mã</Text>
              <BodyText style={[s.flexFill, s.textCenter]}>{id}</BodyText>
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
