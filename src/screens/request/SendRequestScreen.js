import { Formik } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Picker, StyleSheet, Text, TextInput, View } from 'react-native';
import { Input } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { s } from '../../CommonStyles';
import DateInput from '../../components/DateInput';
import HrButton from '../../components/HrButton';
import ScreenContainer from '../../components/ScreenContainer';
import Colors from '../../constants/Colors';

export default class SendRequestScreen extends React.PureComponent {
  state = {
    fullName: 'Ho va ten',
    remainingLeaves: 9 + '',
    reason: 1 + '',
    from: new Date(),
    to: new Date(),
    notifyList: [],
    description: ``
  }
  onSubmit = (values) => {
    console.log(values);
  }
  render() {
    return (
      <ScreenContainer style={styles.container}>
        <Formik
          initialValues={{ ...this.state }}
          onSubmit={this.onSubmit}
        >
          {({ values, handleChange, handleSubmit, setFieldValue, setFieldTouched }) => (
            <View style={{ flex: 1 }}>
              <ScrollView>
                <Input
                  label='Nhân viên'
                  labelStyle={s.label}
                  value={values['fullName']}
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
                  >
                    <Picker.Item label='Lý do cá nhân' value='0' />
                    <Picker.Item label='Đi công vụ' value='1' />
                    <Picker.Item label='Đi công tác' value='2' />
                  </Picker>
                </FormGroup>
                <DateInput
                  label='Thời gian nghỉ từ'
                  value={values['from']}
                  onChange={(event, date) => setFieldValue('from', date)}
                  mode='datetime'
                  format='dd/MM/yyyy hh:mm'
                />
                <DateInput
                  label='Thời gian nghỉ đến'
                  value={values['to']}
                  onChange={(event, date) => setFieldValue('to', date)}
                  mode='datetime'
                  format='dd/MM/yyyy hh:mm'
                />
                <FormGroup label='Thông báo cho'>
                  <Text>TODO:</Text>
                </FormGroup>
                <FormGroup label='Mô tả'>
                  <TextInput
                    multiline
                    numberOfLines={5}
                    value={values['description']}
                    onChangeText={handleChange('description')}
                    underlineColorAndroid={Colors.secondaryText}
                  />
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
  }
});
