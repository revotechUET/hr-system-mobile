import DateFormat from 'date-format';

export default class Utils {
  static dateFormat = (date, format = 'dd/MM/yyyy') => {
    return DateFormat(format, date)
  }
}
