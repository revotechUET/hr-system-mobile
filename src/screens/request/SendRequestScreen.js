import { subDays, startOfDay, isSameDay } from 'date-fns';
import { ErrorMessage, Formik } from 'formik';
import React from 'react';
import { Picker, StyleSheet, Text, TextInput, View } from 'react-native';
import { Input } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-root-toast';
import { s } from '../../CommonStyles';
import { ErrorText } from '../../components/BodyText';
import DateInput from '../../components/DateInput';
import HrButton from '../../components/HrButton';
import ScreenContainer from '../../components/ScreenContainer';
import Colors from '../../constants/Colors';
import { AppContext } from '../../Contexts';
import ApiService from '../../services/ApiService';
import Utils from '../../Utils';

export default class SendRequestScreen extends React.PureComponent {
  static contextType = AppContext
  state = {
    remainingLeaves: 9 + '',
    reason: 0 + '',
    startTime: null,
    endTime: null,
    notifyList: [],
    description: ``
  }
  minDate = startOfDay(subDays(new Date(), 15));
  validate = async (values) => {
    const errors = {};
    // if (values['startTime'] <= new Date) {
    //   errors['startTime'] = 'Thời gian bắt đầu không hợp lệ';
    // }
    // if (values['endTime'] <= values['startTime']) {
    //   errors['endTime'] = 'Thời gian kết thúc không hợp lệ';
    // }
    if (!values['startTime']) {
      errors.startTime = 'Chọn thời gian bắt đầu';
    } else if (values['startTime'] < this.minDate) {
      errors.startTime = 'Thời gian bắt đầu không hợp lệ';
    }
    if (!values['endTime']) {
      errors.endTime = 'Chọn thời gian kết thúc'
    } else {
      if (values['reason'] == 1 && !isSameDay(values['startTime'], values['endTime'])) {
        errors.endTime = 'Thời gian đi công vụ phải kết thúc trong ngày';
      }
      if (values['endTime'] <= values['startTime']) {
        errors.endTime = 'Thời gian kết thúc không hợp lệ';
      }
    }
    if (!values['description']) {
      errors.description = 'Nhập mô tả';
    }
    return errors;
  }
  onSubmit = async (form, formBag) => {
    try {
      const leave = await ApiService.sendLeaveRequest({ ...form });
      if (leave) {
        Toast.show('Đã gửi yêu cầu nghỉ');
        formBag.resetForm();
      }
    } catch (error) {
      Toast.show('Không thể gửi yêu cầu nghỉ');
    }
  }
  render() {
    const user = this.context.user || {};
    const fullName = user.name
    return (
      <ScreenContainer style={styles.container}>
        <Formik
          enableReinitialize
          initialValues={{ ...this.state }}
          onSubmit={this.onSubmit}
          validate={this.validate}
        >
          {({ values, handleChange, handleSubmit, setFieldValue, setFieldTouched, isSubmitting }) => (
            <View style={{ flex: 1 }}>
              <ScrollView>
                <Input
                  label='Nhân viên'
                  labelStyle={s.label}
                  value={fullName}
                  inputContainerStyle={{ borderBottomWidth: 0 }}
                  disabled
                />
                <Input
                  label='Số ngày phép còn lại'
                  labelStyle={s.label}
                  value={values['remainingLeaves']}
                  inputContainerStyle={{ borderBottomWidth: 0 }}
                  disabled
                />
                <FormGroup label='Lý do nghỉ'>
                  <Picker
                    selectedValue={values['reason']}
                    onValueChange={handleChange('reason')}
                    mode='dropdown'
                    style={{ marginLeft: -8 }}
                    enabled={!isSubmitting}
                  >
                    {Utils.leaveReason.all.map(r => <Picker.Item key={r} label={Utils.leaveReason[r]} value={r} />)}
                  </Picker>
                </FormGroup>
                <DateInput
                  label='Thời gian nghỉ từ'
                  value={values['startTime']}
                  onChange={(event, date) => setFieldValue('startTime', date)}
                  mode='datetime'
                  format='dd/MM/yyyy hh:mm'
                  disabled={isSubmitting}
                  minDate={this.minDate}
                />
                <ErrorMessage name='startTime'>{msg => <ErrorText style={styles.errorMessage}>{msg}</ErrorText>}</ErrorMessage>
                <DateInput
                  label='Thời gian nghỉ đến'
                  value={values['endTime']}
                  onChange={(event, date) => setFieldValue('endTime', date)}
                  mode='datetime'
                  format='dd/MM/yyyy hh:mm'
                  disabled={isSubmitting}
                  minDate={values['startTime'] || this.minDate}
                />
                <ErrorMessage name='endTime'>{msg => <ErrorText style={styles.errorMessage}>{msg}</ErrorText>}</ErrorMessage>
                {/*
                <FormGroup label='Thông báo cho'>
                  <Text>:TODO:</Text>
                </FormGroup>
                */}
                <FormGroup label='Mô tả'>
                  <TextInput
                    multiline
                    numberOfLines={5}
                    value={values['description']}
                    onChangeText={handleChange('description')}
                    underlineColorAndroid={Colors.secondaryText}
                    editable={!isSubmitting}
                  />
                  <ErrorMessage name='description'>{msg => <ErrorText style={styles.errorMessage}>{msg}</ErrorText>}</ErrorMessage>
                </FormGroup>
              </ScrollView>
              <View style={{ flex: 1 }} />
              <HrButton buttonStyle={{ marginTop: 12 }} title='Tạo yêu cầu' onPress={handleSubmit} />
            </View>
          )}
        </Formik>
      </ScreenContainer>
    )
  }
}

const FormGroup = ({ children, label, ...props }) => (
  <View style={{ marginLeft: 10 }}>
    <Text style={s.label}>{label}</Text>
    {children}
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorMessage: {
    marginLeft: 10,
    marginTop: -5,
    marginBottom: 10,
  }
});
