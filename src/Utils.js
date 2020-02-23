import DateFormat from 'date-format';

export default class Utils {
  static dateFormat = (date, format = 'dd/MM/yyyy') => {
    if (!date) return null;
    if (typeof date !== 'object') {
      date = new Date(date);
    }
    return DateFormat(format, date)
  }

  static leaveStatus = {
    all: ['waiting', 'approved', 'rejected', 'expired'],
    'waiting': 'Chờ phê duyệt',
    'approved': 'Đã phê duyệt',
    'rejected': 'Đã từ chối',
    'expired': 'Đã huỷ',
  }
  static leaveReason = {
    all: ['0', '1', '2'],
    '0': 'Lý do cá nhân',
    '1': 'Đi công vụ',
    '2': 'Đi công tác',
  }

  static getFirstDayOfMonth() {
    const now = new Date();
    now.setDate(1);
    now.setHours(0, 0, 0, 0);
    return now;
  }
}
