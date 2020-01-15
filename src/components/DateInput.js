import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { Text, View, Platform } from 'react-native';
import { Button } from "react-native-elements";
import Colors from "../constants/Colors";
import Utils from '../Utils';
import Icon from './Icon';

export default class DateInput extends React.Component {
  state = {
    isPicking: false,
    dateValue: null,
  }
  onChangeFirst = (event, date) => {
    const { mode } = this.props;
    this.setState({ isPicking: false });
    if (!date) return;
    this.props.onChange && this.props.onChange(event, date);
    if (mode === 'datetime') {
      this.setState({ dateValue: date })
    }
  }
  onChangeSecond = (event, date) => {
    const { dateValue } = this.state;
    this.setState({ isPicking: false, dateValue: null });
    if (!date) return;
    date.setFullYear(dateValue.getFullYear(), dateValue.getMonth(), dateValue.getDate());
    this.props.onChange && this.props.onChange(event, date);
  }
  render() {
    const { label, value, mode = 'date', format } = this.props;
    const { isPicking, dateValue } = this.state;
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
          onPress={() => this.setState({ isPicking: true })}
          iconRight
        />
        {
          isPicking
          && <DateTimePicker
            mode={mode}
            value={value || new Date()}
            onChange={this.onChangeFirst}
          />
        }
        {
          mode === 'datetime' && dateValue
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
