import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { Text, View, Platform } from 'react-native';
import { Button } from "react-native-elements";
import Colors from "../constants/Colors";
import Utils from '../Utils';
import Icon from './Icon';

export default class DateInput extends React.Component {
  state = {
    pickDate: false,
    dateValue: null,
  }
  onChangeFirst = (event, date) => {
    const { mode } = this.props;
    this.setState({ pickDate: false });
    if (!date) return;
    if (mode === 'datetime') {
      this.setState({ dateValue: date, pickTime: true })
    } else {
      this.props.onChange && this.props.onChange(event, date);
    }
  }
  onChangeSecond = (event, time) => {
    const { dateValue } = this.state;
    this.setState({ dateValue: null, pickTime: false });
    if (!time) return;
    time.setFullYear(dateValue.getFullYear(), dateValue.getMonth(), dateValue.getDate());
    this.props.onChange && this.props.onChange(event, time);
  }
  render() {
    const { label, value, mode = 'date', format, disabled, minDate, maxDate } = this.props;
    const { pickDate, pickTime, dateValue } = this.state;
    return (
      <View>
        <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>{label}</Text>
        <Button
          type='outline'
          title={value ? Utils.dateFormat(value, format) : ' '}
          containerStyle={{ margin: 10 }}
          buttonStyle={{ borderColor: Colors.primaryText }}
          titleStyle={{ color: Colors.primaryText, flex: 1 }}
          icon={<Icon name={['far', 'calendar-alt']} />}
          onPress={() => this.setState({ pickDate: true })}
          iconRight
          disabled={disabled}
        />
        {
          pickDate
          && <DateTimePicker
            mode={mode}
            value={value || new Date()}
            onChange={this.onChangeFirst}
            minimumDate={minDate}
            maximumDate={maxDate}
          />
        }
        {
          mode === 'datetime' && dateValue && pickTime
          && <DateTimePicker
            mode='time'
            value={dateValue}
            onChange={this.onChangeSecond}
          />
        }
      </View>
    )
  }
}
