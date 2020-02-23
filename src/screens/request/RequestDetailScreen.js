import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import BodyText from '../../components/BodyText';
import Colors from '../../constants/Colors';
import ApiService from '../../services/ApiService';
import Utils from '../../Utils';
import LoadingScreen from '../LoadingScreen';


export default function RequestDetailScreen({ navigation, route }) {
  const cancellable = ApiService.useCancellable();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getRequest() {
      const { id } = route.params;
      if (!id) {
        navigation.goBack();
      }
      try {
        const request = await cancellable(ApiService.getLeaveRequest({ id }));
        setRequest(request);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    }
    getRequest();
  }, [cancellable, navigation, route.params]);
  if (loading) return <LoadingScreen />;
  const { id, startTime, endTime, reason, status, description } = request || {};
  return (
    <View style={styles.modalContainer}>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <BodyText style={styles.field}>Mã yêu cầu</BodyText>
          <BodyText selectable style={[styles.value, {textTransform: 'uppercase'}]}>{id}</BodyText>
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
          <BodyText style={styles.value}>{Utils.dateFormat(startTime, 'dd/MM/yyyy hh:mm')}</BodyText>
        </View>
        <View style={styles.infoRow}>
          <BodyText style={styles.field}>Thời gian nghỉ đến</BodyText>
          <BodyText style={styles.value}>{Utils.dateFormat(endTime, 'dd/MM/yyyy hh:mm')}</BodyText>
        </View>
        {/*
          <View style={styles.infoRow}>
            <BodyText style={styles.field}>Thông báo cho</BodyText>
            <BodyText style={styles.value}>:TODO:</BodyText>
          </View>
          */}
        {!!description &&
          <View style={styles.infoRow}>
            <BodyText style={styles.field}>Mô tả</BodyText>
            <BodyText style={styles.value}>{description}</BodyText>
          </View>
        }
      </View>
      <View style={{ flex: 1 }}></View>
    </View>
  )
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
    flexDirection: 'row',
  },
  field: {
    flex: 1,
    maxWidth: '35%',
    fontSize: 16,
    marginRight: 5,
  },
  value: {
    maxWidth: '65%',
    fontSize: 16,
  }
});
